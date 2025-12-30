import { SIDEBAR_HTML, htmlDetail } from './templates.js';

// === 1. API 处理函数 (搜索/随机) ===
export async function handleApiPosts(url, env) {
  const q = url.searchParams.get('q');
  const offset = url.searchParams.get('offset') || 0;

  // 随机图逻辑
  if (q === 'random') {
    const { results } = await env.DB.prepare("SELECT * FROM images ORDER BY RANDOM() LIMIT 1").all();
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' }});
  }

  // 搜索构建逻辑
  let sql;
  let params = [];
  if (q) {
    const keywords = q.replace(/#/g, '').trim().split(/\s+/).filter(k => k.length > 0);
    if (keywords.length > 0) {
      const conditions = keywords.map(() => `(tags LIKE ? OR caption LIKE ?)`).join(' AND ');
      sql = `SELECT * FROM images WHERE ${conditions} ORDER BY created_at DESC LIMIT 20 OFFSET ?`;
      keywords.forEach(k => { params.push(`%${k}%`); params.push(`%${k}%`); });
      params.push(offset);
    } else {
      sql = `SELECT * FROM images ORDER BY created_at DESC LIMIT 20 OFFSET ?`;
      params = [offset];
    }
  } else {
    sql = `SELECT * FROM images ORDER BY created_at DESC LIMIT 20 OFFSET ?`;
    params = [offset];
  }

  try {
    const { results } = await env.DB.prepare(sql).bind(...params).all();
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' }});
  } catch (e) {
    return new Response(JSON.stringify([]), {status: 500});
  }
}

// === 2. 图片代理函数 ===
export async function proxyTelegramImage(fileId, botToken, dlExt = null) {
  try {
    const r1 = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
    const j1 = await r1.json();
    if (!j1.ok) return new Response("404", { status: 404 });

    const r2 = await fetch(`https://api.telegram.org/file/bot${botToken}/${j1.result.file_path}`);
    const h = new Headers(r2.headers);
    h.set("Cache-Control", "public, max-age=31536000, immutable");
    h.set("Access-Control-Allow-Origin", "*");

    if (dlExt) {
        const filename = `${fileId}.${dlExt}`;
        h.set("Content-Disposition", `attachment; filename="${filename}"`);
    }

    return new Response(r2.body, { headers: h });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}

// === 3. 详情页处理函数 ===
export async function handleDetail(id, env) {
   const img = await env.DB.prepare("SELECT id, file_name, origin_id, caption, artist, tags, created_at, width, height, artist FROM images WHERE id = ?").bind(id).first();
   if (!img) return new Response("404", { status: 404 });

   let parentId = img.id;
   const m = img.id.match(/^(.*)_p(\d+)$/);
   if (m) parentId = m[1];

   const { results: siblings } = await env.DB
     .prepare("SELECT * FROM images WHERE id = ? OR id LIKE ? ORDER BY id ASC")
     .bind(parentId, parentId + "_p%")
     .all();

   const { results: randomPosts } = await env.DB
     .prepare("SELECT * FROM images WHERE id != ? ORDER BY RANDOM() LIMIT 6")
     .bind(id)
     .all();

   const items = siblings.sort((a, b) => a.id.localeCompare(b.id));
   const currentIndex = Math.max(0, items.findIndex(x => x.id === img.id));
   const bgUrl = `/image/${img.file_name}`;
   const title = (img.caption || 'Untitled').split('\n')[0];
   const tags = (img.tags || '').trim().split(' ').filter(Boolean);

   const imagesJson = JSON.stringify(items.map(x => ({
     id: x.id,
     file: x.file_name,
     download: `/image/${x.origin_id || x.file_name}?dl=jpg`
   })));

   // 核心变化在这里：直接调用 templates.js 里的函数，而不是自己拼字符串
   const html = htmlDetail({
     title,
     artist: img.artist || '',
     bgUrl,
     imagesJson,
     currentIndex,
     tags,
     randomPosts
   });

   return new Response(html, {
     headers: { "Content-Type": "text/html;charset=UTF-8",'Cache-Control': 'public, max-age=60' }
   });
}

const BG_BLOCK_KEYWORDS = ['R-18','R18','NSFW','Hentai', 
  '性爱','性交','乱伦','裸胸','露点','调教',
  '触手','高潮','喷水','阿黑颜','颜射','后宫','痴汉',
  'NTR','3P','Creampie','Bukkake','Paizuri',
  '乳交', 'Cunnilingus','Fellatio','Masturbation',
  'Ahegao','X-ray','Mind Break','恶堕', 
  'Futa','Tentacle','BDSM','Bondage','Scat','Pregnant','naked','nipples','anus'];

// includeR18 = true  -> 不过滤（里世界）
// includeR18 = false -> 过滤 R18（安全）
export async function handleBgRandom(includeR18, url, env) {
  let sql = "SELECT * FROM images";
  let params = [];

  if (!includeR18) {
    const conditions = BG_BLOCK_KEYWORDS
      .map(() => "(tags NOT LIKE ? AND caption NOT LIKE ?)")
      .join(" AND ");
    sql += ` WHERE ${conditions}`;
    BG_BLOCK_KEYWORDS.forEach(k => {
      params.push(`%${k}%`);
      params.push(`%${k}%`);
    });
  }

  sql += " ORDER BY RANDOM() LIMIT 1";

  const { results } = await env.DB.prepare(sql).bind(...params).all();
  if (!results || results.length === 0) {
     return new Response("Not found", { status: 404 });
  }
 
  const fileId = results[0].file_name;

  // 导航站用：直接输出图片（Content-Type=image/*）
  if (url.searchParams.get('type') === 'image') {
    // 复用现有 Telegram 代理逻辑，强制 dlExt = 'jpg'
    return await proxyTelegramImage(fileId, env.BOT_TOKEN, 'jpg');
  }

  // 默认返回 JSON
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' }
  });
}


// === 4. 画师分类处理函数 (新增) ===
export async function handleArtists(url, env) {
  const format = url.searchParams.get('format');

  // API 模式：返回 JSON 数据供瀑布流加载
  if (format === 'json') {
    const page = parseInt(url.searchParams.get('page')) || 1;
    const pageSize = 50;
    const offset = (page - 1) * pageSize;

    // 子查询：先按 ID 倒序找出每个画师最新的图，再聚合统计
    // 这样能确保取到的 width/height/cover 都是最新那张图的
    const sql = `
      SELECT t.artist, COUNT(*) as count, t.file_name as cover, t.width, t.height
      FROM (
          SELECT * FROM images 
          WHERE artist IS NOT NULL AND artist != ''
          ORDER BY id DESC
      ) t
      GROUP BY t.artist
      ORDER BY count DESC
      LIMIT ? OFFSET ?
    `;

    try {
      const { results } = await env.DB.prepare(sql).bind(pageSize, offset).all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  // 页面模式：返回 HTML 骨架
  const { htmlArtists } = await import('./templates.js');
  return new Response(htmlArtists(), {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}


export async function handleArtistProfile(artistName, url, env) {
  const artist = decodeURIComponent(artistName);

  // 1. 基础统计
  const metaSql = `SELECT COUNT(*) as count, MAX(created_at) as last_update FROM images WHERE artist = ?`;
  const meta = await env.DB.prepare(metaSql).bind(artist).first();

  if (!meta || meta.count === 0) {
    return new Response("Artist not found", { status: 404 });
  }

  // 2. 背景图 (取最新两张)
  const coverSql = `SELECT file_name FROM images WHERE artist = ? ORDER BY created_at DESC LIMIT 2`;
  const { results: covers } = await env.DB.prepare(coverSql).bind(artist).all();
  const cover1 = covers[0]?.file_name;
  const cover2 = covers[1]?.file_name || cover1; 

  // 3. 智能平台分析 (带颜色图标)
  const platformSql = `SELECT id FROM images WHERE artist = ? LIMIT 50`; // 查多一点样本更准
  const { results: sampleIds } = await env.DB.prepare(platformSql).bind(artist).all();
  
  // 统计各平台数量
  let counts = { pixiv: 0, yande: 0, mtc: 0, twitter: 0 };
  sampleIds.forEach(row => {
    if (row.id.startsWith('pixiv_')) counts.pixiv++;
    else if (row.id.startsWith('yande')) counts.yande++;
    else if (row.id.startsWith('mtcacg')) counts.mtc++;
    else if (row.id.startsWith('twitter')) counts.twitter++;
  });

  // 生成 HTML 徽章数组
  let badges = [];
  
  // Pixiv (蓝色)
  if (counts.pixiv > 0) {
    badges.push(`<span class="platform-badge bg-blue-500/20 text-blue-300 border-blue-500/30">🅿️ Pixiv</span>`);
  }
  // Yande.re (红色)
  if (counts.yande > 0) {
    badges.push(`<span class="platform-badge bg-red-500/20 text-red-300 border-red-500/30">🍒 Yande.re</span>`);
  }
  // Twitter (天蓝)
  if (counts.twitter > 0) {
    badges.push(`<span class="platform-badge bg-sky-500/20 text-sky-300 border-sky-500/30">🐦 Twitter</span>`);
  }
  // MtcACG (紫色 - 如果是独占或者没别的平台)
  if (counts.mtc > 0 || badges.length === 0) {
    badges.push(`<span class="platform-badge bg-purple-500/20 text-purple-300 border-purple-500/30">🌟 MtcACG</span>`);
  }

  // 拼成一个字符串
  const platformHtml = badges.join(' ');
  // 纯文字版 (用于统计栏)
  const platformText = Object.keys(counts).filter(k => counts[k] > 0).map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(' / ') || 'MtcACG';

  // 4. AJAX 翻页 (保持不变)
  const format = url.searchParams.get('format');
  if (format === 'json') {
    const page = parseInt(url.searchParams.get('page')) || 1;
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    const postsSql = `SELECT * FROM images WHERE artist = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const { results } = await env.DB.prepare(postsSql).bind(artist, pageSize, offset).all();
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
  }

  // 5. 渲染
  const { htmlArtistProfile } = await import('./templates.js');
  
  let updateTime = '未知';
  if(meta.last_update) {
    const ts = meta.last_update.toString().length === 10 ? meta.last_update * 1000 : meta.last_update;
    const d = new Date(ts);
    updateTime = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }

  return new Response(htmlArtistProfile({
    artist,
    count: meta.count,
    updateTime,
    cover1,
    cover2,
    platformHtml, // 传这个带颜色的 HTML 进去
    platformText  // 传这个纯文字给下面统计栏用
  }), {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}

