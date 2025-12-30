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

// === 5. 画师个人主页 (新) ===
export async function handleArtistProfile(artistName, url, env) {
  // 解码画师名 (比如 %E7%94%BB%E5%B8%88 -> 画师)
  const artist = decodeURIComponent(artistName);
  
  // 1. 获取该画师的“统计信息”和“最新一张图(做背景)”
  // 我们用 created_at 排序取第一条，顺便计算总数
  const metaSql = `
    SELECT 
      COUNT(*) as count, 
      MAX(created_at) as last_update, 
      MAX(file_name) as cover,
      MAX(id) as sample_id  -- 用来分析平台来源
    FROM images 
    WHERE artist = ?
  `;
  const meta = await env.DB.prepare(metaSql).bind(artist).first();

  if (!meta || meta.count === 0) {
    return new Response("Artist not found", { status: 404 });
  }

  // 2. 分析平台来源 (从 ID 结构提取)
  // 假设 ID 格式如: pixiv_12345_p0, yande_12345, mtcacg_12345
  let platform = 'Unknown';
  let platformId = 'N/A';
  let platformIcon = '🎨'; // 默认图标
  let platformUrl = '';

  const id = meta.sample_id || '';
  if (id.startsWith('pixiv_')) {
    platform = 'Pixiv';
    platformIcon = '🅿️'; // 或者用 SVG
    const m = id.match(/pixiv_(\d+)/);
    if(m) {
      platformId = m[1];
      platformUrl = `https://www.pixiv.net/users/${platformId}`; // 注意：这里通常是作品ID，如果是画师ID需要你数据库里有单独存，或者只能跳作品
    }
  } else if (id.startsWith('yande')) {
    platform = 'Yande.re';
    platformIcon = '🍒';
    platformUrl = 'https://yande.re/post';
  } else if (id.startsWith('twitter')) {
    platform = 'Twitter';
    platformIcon = '🐦';
  } else {
    platform = 'Original / Other';
  }

  // 3. 处理分页作品数据 (为了瀑布流)
  // 如果是 AJAX 请求 (format=json)，只返回作品列表
  const format = url.searchParams.get('format');
  if (format === 'json') {
    const page = parseInt(url.searchParams.get('page')) || 1;
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    
    const postsSql = `
      SELECT * FROM images 
      WHERE artist = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    const { results } = await env.DB.prepare(postsSql).bind(artist, pageSize, offset).all();
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 4. 返回完整 HTML 页面
  const { htmlArtistProfile } = await import('./templates.js');
  
  // 格式化时间 (created_at 可能是秒级时间戳)
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
    cover: meta.cover,
    platform,
    platformId,
    platformUrl,
    platformIcon
  }), {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}
