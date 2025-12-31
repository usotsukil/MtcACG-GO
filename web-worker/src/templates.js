// ==========================================
// 1. 侧边栏 HTML (必须放在最前面，且必须加 export)
// ==========================================
export const SIDEBAR_HTML = `
<!-- 遮罩层 (修正层级 z-[200]) -->
<div id="sidebar-overlay" onclick="toggleSidebar()" class="fixed inset-0 bg-black/60 z-[200] hidden transition-opacity opacity-0" style="will-change: opacity"></div>

<!-- 侧边栏 (修正层级 z-[201]) -->
<aside id="sidebar" class="fixed top-0 left-0 w-72 h-full bg-[#1a1a1a] border-r border-white/10 z-[201] transform -translate-x-full transition-transform duration-300 ease-out shadow-2xl flex flex-col" style="will-change: transform">
  
  <div class="p-6 border-b border-white/10 flex items-center justify-between">
    <h2 class="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">MtcACG</h2>
    <button onclick="toggleSidebar()" class="text-gray-400 hover:text-white">&times;</button>
  </div>
  
  <nav class="flex-1 p-4 space-y-2">
    <a href="/" class="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition">
      <svg class="w-5 h-5 mr-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 11.5L12 4l9 7.5M5 10.5V20h5v-5h4v5h5v-9.5"/></svg>
      <span>首页</span>
    </a>

    <!-- 画师名人堂 (Sidebar Item) -->
    <a href="/artists" class="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition">
      <svg class="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <span class="bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent font-bold">画师名人堂</span>
    </a>

    <a href="javascript:void(0)" onclick="randomImage(); toggleSidebar();" class="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition">
      <svg class="w-5 h-5 mr-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h4l3 6 3-6h4M4 18h4l3-6 3 6h4"/></svg>
      <span>随机抽图看看0w0</span>
    </a>

    <a href="/r18" class="flex items-center p-3 text-red-300 hover:bg-red-500/10 rounded-lg transition group">
      <svg class="w-5 h-5 mr-3 text-red-400 group-hover:text-red-200" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      <span class="font-bold">里世界 · 纯R18|慎</span>
    </a>
    
    <a href="/about" class="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition">
       <svg class="w-5 h-5 mr-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8.5v.01M11 11h1v5h1"/></svg>
       <span>关于</span>
    </a>
    
    <div class="pt-4 mt-4 border-t border-white/10">
      <div class="flex items-center justify-between p-3">
         <span class="text-gray-300 flex items-center"><span class="mr-3">🔞</span> R18 哒咩~</span>
         <label class="relative inline-flex items-center cursor-pointer">
           <input type="checkbox" id="r18-toggle-sidebar" class="sr-only peer" onchange="toggleR18Global(this)">
           <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer 
           after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
           after:translate-x-full peer-checked:after:translate-x-0 
           bg-pink-600 peer-checked:bg-gray-600"></div>
         </label>
      </div>
    </div>
  </nav>

  <div class="pt-4 mt-4 border-t border-white/10">
      <p class="px-3 text-xs font-bold text-gray-500 uppercase mb-2">Friends</p>
      <a href="https://github.com/TyrEamon/MtcACG-GO" target="_blank" class="flex items-center p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm">
         <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
         GitHub
      </a>
  </div>
  <div class="p-4 text-xs text-center text-gray-600 border-t border-white/5">© 2025 MtcACG Gallery</div>
</aside>

<script>
async function randomImage() {
   const res = await fetch('/api/posts?q=random');
   const data = await res.json();
   if(data.length) window.location.href = '/detail/' + data[0].id;
}
  function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebar-overlay');
    if(!sb || !ov) return;
    const isOpen = !sb.classList.contains('-translate-x-full');
    if (isOpen) {
      sb.classList.add('-translate-x-full');
      ov.classList.remove('opacity-100');
      setTimeout(() => ov.classList.add('hidden'), 300);
    } else {
      ov.classList.remove('hidden');
      void ov.offsetWidth; 
      ov.classList.add('opacity-100');
      sb.classList.remove('-translate-x-full');
    }
  }

  function toggleR18Global(el) {
    localStorage.setItem('hide_r18', !el.checked);
    location.reload();
  }
  
  setTimeout(() => {
    const toggle = document.getElementById('r18-toggle-sidebar');
    if(toggle) {
        toggle.checked = (localStorage.getItem('hide_r18') !== 'true');
    }
  }, 100);

  async function randomPost() {
    try { 
      const res = await fetch('/api/posts?q=random'); 
      const data = await res.json(); 
      if(data.length) location.href='/detail/'+data[0].id; 
    } catch(e){}
  }
</script>
`;

// === 把这段加到 src/templates.js 的最末尾 ===

export function htmlHome() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>MtcACG</title>
  <link rel="icon" type="image/png" href="https://pub-d07d03b8c35d40309ce9c6d8216e885b.r2.dev/ACGg.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* 隐藏滚动条但保留功能 */
    ::-webkit-scrollbar { width: 0px; background: transparent; }
    html { -ms-overflow-style: none; scrollbar-width: none; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #121212; color: #fff; overflow-x: hidden; }
    #bg-layer { position: fixed; inset: 0; z-index: -1; background-size: cover; background-position: center; filter: blur(6px) brightness(0.6); opacity: 0; transition: opacity 1s; pointer-events: none; }
    .header { position: fixed; top: 0; left: 0; right: 0; z-index: 28; background: rgba(18, 18, 18, 0.90); backdrop-filter: none; -webkit-backdrop-filter: none; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-weight: 800; font-size: 18px; letter-spacing: 1px; color: #fff; text-decoration: none; }
    /*.search-bar { flex: 1; max-width: 400px; margin: 0 16px; position: relative; } */
    /*input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: white; padding: 8px 16px; border-radius: 99px; width: 100%; outline: none; transition: 0.3s; font-size: 14px; } */
    /*input:focus { background: rgba(0,0,0,0.6); border-color: #ec4899; } */
    .masonry-wrap { display: flex; gap: 12px; padding: 12px; align-items: flex-start; }
        /* === 搜索框容器（可展开） === */
    .search-container {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0;
    }
    .search-input {
      width: 0;
      padding: 0;
      border: none;
      background: transparent;
      color: white;
      outline: none;
      transition: all 0.3s ease;
      border-bottom: 1px solid transparent;
      opacity: 0;
      font-size: 14px;
    }
    .search-input.expanded {
      width: 300px;
      padding: 4px 8px;
      border-bottom: 1px solid #ec4899;
      opacity: 1;
      margin-right: 8px;
    }
    /* 移动端搜索框稍窄 */
    @media(max-width: 640px) {
      .search-input.expanded { width: 140px; }
    }
    
    .search-btn {
      background: none;
      border: none;
      color: #ccc;
      cursor: pointer;
      padding: 4px;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-btn:hover { color: #fff; }

    @media(min-width: 768px) { .masonry-wrap { padding: 20px; gap: 20px; max-width: 1800px; margin: 0 auto; } }
    .masonry-col { flex: 1; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
    @media(min-width: 768px) { .masonry-col { gap: 20px; } }
    .card { border-radius: 12px; overflow: hidden; background: #2a2a2a; position: relative; transition: transform 0.2s ease-out; box-shadow: 0 4px 6px rgba(0,0,0,0.3); width: 100%; }
    .card:active { transform: scale(0.98); }
    .card:hover { transform: scale(1.02) translateY(-4px); z-index: 20; box-shadow: 0 16px 24px -6px rgba(0,0,0,0.6); }
    .card-inner { position: relative; width: 100%; }
    .placeholder { display: block; width: 100%; padding-bottom: calc(var(--h) / var(--w) * 100%); background: #2a2a2a; }
    .card-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .3s; }
    .card-img.loaded { opacity: 1; }
    .meta { position: absolute; bottom: 0; left: 0; right: 0; padding: 50px 10px 10px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); opacity: 0; transition: opacity 0.2s; }
    .card:hover .meta { opacity: 1; }
    @media(max-width: 768px) { .meta { padding: 30px 8px 8px; opacity: 1; } .title { font-size: 11px; } }
    .title { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 1px 3px rgba(0,0,0,0.9); color: #fff; }
    .loading-tip { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.7); color: #fff; padding: 6px 16px; border-radius: 99px; font-size: 12px; backdrop-filter: blur(5px); opacity: 0; transition: opacity .2s; pointer-events: none; z-index: 100; }
  </style>
</head>
<body>
  <div id="bg-layer"></div>
  ${SIDEBAR_HTML}
  
  <div class="header">
    <div class="flex items-center">
    <div class="p-2 cursor-pointer" onclick="toggleSidebar()">
      <svg width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
    </div>
        <!-- 画师名人堂 (Header Icon) -->
    <a href="/artists" class="ml-2 p-2 text-gray-300 hover:text-yellow-400 transition" title="画师名人堂">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    </a>
  </div>
  <div class="flex items-center gap-3">
    <div class="search-container">
      <input type="text" id="search" class="search-input" placeholder="搜索标签或标题..." onkeydown="handleHomeSearch(event)">
      <button class="search-btn" onclick="toggleHomeSearch()">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      </button>
    </div>
    <!--<div class="search-bar"> -->
      <!--<input type="text" id="search" placeholder="  要搜索什么吖...." onchange="doSearch(this.value)"> -->
    <!--</div> -->
    <a href="/" class="logo">MtcACG</a>
  </div>

  <div id="masonry" class="masonry-wrap"></div>
  <!-- ✅ 从这里开始插入 -->
  <button id="auto-scroll-btn" onclick="toggleAutoScroll()" 
      class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full 
             bg-white/10 hover:bg-white/20 backdrop-blur-md 
             border border-white/10 shadow-xl 
             text-gray-300 hover:text-white 
             transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center group"
      title="自动滚动">
     <!-- 播放图标 -->
     <svg id="icon-play" class="w-5 h-5 ml-0.5 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
     <!-- 暂停图标 -->
     <svg id="icon-pause" class="w-5 h-5 hidden text-pink-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
  </button>
  <!-- 🏁 插入结束 -->
  <div id="tip" class="loading-tip">在加载啦…别、别急呀喵～</div>

  <script>
    // === 🆕 搜索框展开/收起逻辑 ===
    function toggleHomeSearch() {
      const input = document.getElementById('search');
      const isExpanded = input.classList.contains('expanded');
      
      if (isExpanded && input.value.trim() !== '') {
        doSearch(input.value);
      } else {
        input.classList.toggle('expanded');
        if (!isExpanded) input.focus();
      }
    }
    
    function handleHomeSearch(e) {
      if (e.key === 'Enter') {
        doSearch(e.target.value);
      }
    }
    const masonry = document.getElementById('masonry');
    const bgLayer = document.getElementById('bg-layer');
    const tip = document.getElementById('tip');
    const hideR18 = localStorage.getItem('hide_r18') === 'true';

    let offset = 0;
    const params = new URLSearchParams(window.location.search);
    let q = params.get('q') || ''; 
    if(q) {
        document.addEventListener('DOMContentLoaded', () => {
             const searchInput = document.getElementById('search');
             if(searchInput) {
                 searchInput.value = q;
                 searchInput.classList.add('expanded'); // ← 自动展开搜索框
             }
        });
    }

    
    let isLoading = false;
    let done = false;
    let colCount = window.innerWidth < 768 ? 2 : (window.innerWidth < 1200 ? 3 : 4);
    let cols = [];
    let colHeights = []; // 用于记录每列的预估高度

    function initMasonry() {
      masonry.innerHTML = '';
      cols = [];
      colHeights = new Array(colCount).fill(0); // <--- 新增这行，重置高度
      for(let i=0; i<colCount; i++) {
        const div = document.createElement('div');
        div.className = 'masonry-col';
        masonry.appendChild(div);
        cols.push(div);
      }
    }
    
    window.addEventListener('resize', () => {
      const newCount = window.innerWidth < 768 ? 2 : (window.innerWidth < 1200 ? 3 : 4);
      if(newCount !== colCount) {
        colCount = newCount;
        offset = 0;
        load(true);
      }
    });

    // ===========================================
    // --- 2. 智能自动滚动逻辑 (独立于 load 函数外) ---
    // ===========================================
    let autoScrollActive = false;
    let scrollTimer = null;
    let resumeTimer = null;

    function getIcons() {
      return {
        btn: document.getElementById('auto-scroll-btn'),
        play: document.getElementById('icon-play'),
        pause: document.getElementById('icon-pause')
      };
    }

    window.toggleAutoScroll = function() {
      autoScrollActive = !autoScrollActive;
      if (autoScrollActive) {
        updateBtnState(true);
        startScrolling();
      } else {
        updateBtnState(false);
        stopScrolling();
        if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      }
    }

    function updateBtnState(isActive) {
      const { btn, play, pause } = getIcons();
      if(!btn) return;
      if(isActive) {
        btn.classList.add('bg-white/20', 'border-pink-500/50', 'shadow-pink-500/20');
        btn.classList.remove('border-white/10');
        play.classList.add('hidden'); pause.classList.remove('hidden');
      } else {
        btn.classList.remove('bg-white/20', 'border-pink-500/50', 'shadow-pink-500/20');
        btn.classList.add('border-white/10');
        play.classList.remove('hidden'); pause.classList.add('hidden');
      }
    }

    function startScrolling() {
      if (!autoScrollActive) return;
      if (scrollTimer) clearInterval(scrollTimer);
      scrollTimer = setInterval(() => {
        window.scrollBy(0, 0.8);
        if(done && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
             window.toggleAutoScroll(); 
        }
      }, 16);
    }

    function stopScrolling() {
      if (scrollTimer) { clearInterval(scrollTimer); scrollTimer = null; }
    }

    ['mousedown', 'wheel', 'touchstart', 'keydown'].forEach(event => {
      window.addEventListener(event, () => {
        if (autoScrollActive) {
          stopScrolling();
          if (resumeTimer) clearTimeout(resumeTimer);
          resumeTimer = setTimeout(() => {
            if (autoScrollActive) startScrolling();
          }, 1500);
        }
      }, { passive: true });
    });
    

    async function load(reset = false) {
      if (isLoading || (done && !reset)) return;
      isLoading = true;
      tip.style.opacity = '1';

      if (reset) {
        initMasonry();
        offset = 0;
        done = false;
      } else if (cols.length === 0) {
        initMasonry();
      }

      try {
        // 注意：反引号被转义
        const res = await fetch(\`/api/posts?offset=\${offset}&q=\${encodeURIComponent(q)}\`);
        const data = await res.json();

        if (data.length === 0) {
          done = true;
          if(offset > 0) tip.textContent = '已经到底啦 (｡•ˇ‸ˇ•｡)';
          setTimeout(() => tip.style.opacity = '0', 2000);
          isLoading = false;
          return;
        }
  
        let colHeights = new Array(colCount).fill(0);
        
    const blockKeywords =[
        'R-18','NSFW','Hentai','血腥','R18','性爱','性交','淫','乱伦','调教','捆绑',
        '触手','高潮','喷水','阿黑颜','颜射','后宫','痴汉','NTR','Boobs',
        'Nipples','强暴','做爱','自慰','援交','喷水','Creampie','Bukkake','Fuck',
        'Blowjob','口交','Handjob','Paizuri','乳交','Cunnilingus','Fellatio','Masturbation','Pussy',
        'Vagina','Genitals','阴部','阴茎','私处','爆乳','Nude','Topless','Ahegao','高潮脸',
        'X-ray','断面图','Mind Break','恶堕','坏掉','透视','Futa','扶她','双性','Tentacle','BDSM','Bondage',
        '束缚','Scat','Pregnant','妊娠','怀孕','丸吞','破れタイツ','快楽堕ち','寝取られ','乳出し',
        'Garter','Lingerie','Panty','Stockings','ふたなり','輪姦','近親','異種姦','孕ませ','緊縛','奴隷',
        '悪堕ち','精神崩壊','セックス','中出し','顔射','イラマチオ','フェラ','パイズリ','手コキ','潮吹き','絶頂',
        'アヘ顔','全裸','乳首','ペニス','ヴァギナ','クリトリス','近親','触手','レイプ','調教','スカトロ','ふたなり',
        'パンツ下ろし','naked','nipples','anus',];

    const r18Keywords = [
        'R-18','NSFW','Hentai','血腥','R18','性爱','性交','淫','乱伦','裸胸','露点','调教',
        '捆绑','触手','高潮','喷水','阿黑颜','颜射','后宫','痴汉','NTR','3P','Boobs','Tits','Nipples','Breast','强暴',
        '做爱','自慰','援交','喷水','Creampie','Cum','Bukkake','Sex','Fuck','Blowjob','口交','Handjob','Paizuri',
        '乳交','Cunnilingus','Fellatio','Masturbation','Pussy','Vagina','Penis','Dick','Cock','Genitals','Pubic',
        '阴部','阴茎','私处','白虎','爆乳','Breast','Nude','Topless','Ahegao','高潮脸','X-ray','断面图','Mind Break',
        '恶堕','坏掉','透视','Futa','扶她','双性','Tentacle','BDSM','Bondage','捆绑','束缚','Scat','Pregnant','妊娠',
        '怀孕','异种','绳艺','丸吞','破れタイツ','敗北','快楽堕ち','寝取られ','乳出し','パンツ下ろし','尻揉み','比基尼','裸足',
        'School Swimsuit','アナル尻尾','Maid','Swimsuit','Ass','成人','成人','Pantyhose','Garter','连裤袜','ロリ',
        'Lingerie','Panty','Stockings','ふたなり','輪姦','母子','近親','異種姦','孕ませ','緊縛','奴隷','悪堕ち',
        '精神崩壊','セックス','中出し','顔射','イラマチオ','フェラ','パイズリ','手コキ','潮吹き','絶頂','アヘ顔','全裸','乳首',
        'ペニス','ヴァギナ','クリトリス','近親','触手','レイプ','調教','スカトロ','ふたなり','yande',]; 

        function checkKeywords(text, keywords) {
          return keywords.some(k => {
            const key = k.toLowerCase();
            // 所有关键词都用 includes 匹配
            return text.includes(key);
          });
        }        

        const isR18Page = window.location.pathname === '/r18';

        let validCount = 0;

        for (const item of data) {
          const textToCheck = ((item.caption || '') + ' ' + (item.tags || '')).toLowerCase();
          
          let isHidden = false;
          if (isR18Page) {
             if (!checkKeywords(textToCheck, r18Keywords)) isHidden = true; 
          } else {
             if (hideR18 && checkKeywords(textToCheck, blockKeywords)) isHidden = true;
          }

          if (isHidden) continue;

          validCount++;

          if (offset === 0 && validCount === 1) {
              bgLayer.style.backgroundImage = \`url(/image/\${item.file_name})\`;
              bgLayer.style.opacity = '1';
          }
          // ================================

         const w = item.width || 3;
         const h = item.height || 4;
         const title = (item.caption || '').split('\\\\n')[0]; 

         let minH = colHeights[0];
         let minIdx = 0;
         for(let i=1; i<colCount; i++) {
           if(colHeights[i] < colHeights[minIdx]) {
             minIdx = i;
           }
         }

          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = \`
            <a href="/detail/\${item.id}">
              <div class="card-inner">
                <div class="placeholder" style="--w:\${w};--h:\${h};"></div>
                <img class="card-img" src="/image/\${item.file_name}" loading="lazy" onload="this.classList.add('loaded')">
                <div class="meta"><div class="title">\${title}</div></div>
              </div>
            </a>\`;
          
            cols[minIdx].appendChild(card);
            const aspectRatio = (h / w) || 1.2; 
            colHeights[minIdx] += aspectRatio;
        }
        
        offset += data.length;
        
        if (validCount < 5 && data.length >= 20) {
          console.log(\`Page filtered (valid: \${validCount}/\${data.length}), auto loading next page...\`);              
            isLoading = false;
            setTimeout(() => load(false), 100); 
            return;
        }
      } catch (e) { console.error(e); }
      isLoading = false;
      tip.style.opacity = '0';
    }

    function doSearch(val) {
      q = val;
      load(true);
    }

    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1200) {
        load();
      }
    });

    load(true);
  </script>
</body>
</html>`;
}


 export function htmlAbout() {
  return `
  <!DOCTYPE html>
  <html class="dark">
  <head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About - MtcACG</title>
    <link rel="icon" type="image/png" href="https://pub-d07d03b8c35d40309ce9c6d8216e885b.r2.dev/ACGg.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌸</text></svg>">
    <style>
      /* 动态背景 */
      #bg-layer { 
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; 
        background-size: cover; background-position: center; 
        filter: blur(8px) brightness(0.6); 
        transition: opacity 1s; opacity: 0; 
        transform: translate3d(0,0,0); will-change: opacity; pointer-events: none;
      }
      
      /* 隐藏滚动条但允许滚动 */
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      
      /* 玻璃板内的文字排版 */
      .content-box h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: #fff; border-left: 4px solid #ec4899; padding-left: 12px; margin-top: 2rem; }
      .content-box p { margin-bottom: 1rem; line-height: 1.7; color: #e5e7eb; }
      .content-box code { background: rgba(255,255,255,0.15); padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #f9a8d4; }
      .content-box a { color: #f472b6; text-decoration: none; border-bottom: 1px dashed #f472b6; transition: color 0.2s; }
      .content-box a:hover { color: #fff; border-bottom-style: solid; }
    </style>
  </head>
  <body class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4 overflow-hidden">
    <div id="bg-layer"></div>
    ${SIDEBAR_HTML}
    
    <!-- 🟢 玻璃板容器 -->
    <div class="max-w-2xl w-full bg-black/40 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl relative border border-white/10 content-box h-[85vh] overflow-y-auto no-scrollbar">
       
       <!-- 顶部栏 -->
       <div class="flex items-center justify-between mb-8 sticky top-0 z-10 py-4 -mx-6 px-6 -mt-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
         <div class="flex items-center gap-4">
           <button onclick="toggleSidebar()" class="text-gray-300 hover:text-white transition p-1">
             <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
           </button>
               <!-- 画师名人堂 (Header Icon) -->
         <a href="/artists" class="ml-2 p-2 text-gray-300 hover:text-yellow-400 transition" title="画师名人堂">
           <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
           </svg>
         </a>

           <h1 class="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">关于 MtcACG</h1>
         </div>
         <a href="/" class="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition border border-white/5">回到首页</a>
       </div>

       <!-- 序言 -->
       <section class="animate-fade-in">
         <h2 class="text-xl font-medium text-white mb-3 flex items-center !mt-0">
           <span class="w-1 h-6 bg-pink-500 rounded-full mr-3 opacity-80"></span>
           序 · Start
         </h2>
         <p>
         欢迎来到 MtcACG！(≧∇≦)ﾉ
         在乱糟糟的互联网异世界里，这里是本站长偷偷搭建的“秘密基地”。
         </p>
         <p class="mt-2">
         这里没有算法裹挟，只有我的私人凝视。每一张图，都是我从时间里切下的碎片，安放于此，建成一座只属于我的数字花园。
         </p>
       </section>
     
       <!-- 功能 -->
       <section>
         <h2 class="text-xl font-medium text-white mb-3 flex items-center">
           <span class="w-1 h-6 bg-purple-500 rounded-full mr-3 opacity-80"></span>
           逛 · Explore
         </h2>
         <p>  
         想怎么玩都行！跟着 <code>#标签</code> 寻找同好，或在 <code>瀑布流</code> 里无限滑行。
         还有哦，左上角的菜单里藏着通往“里世界”的钥匙——那是 <strong>R-18 </strong> 的封印。但还是要保持绅士风度哦 (/ω＼)。
         </p>
       </section>
     
       <!-- 接口 -->
       <section>
         <h2 class="text-xl font-medium text-white mb-3 flex items-center">
           <span class="w-1 h-6 bg-blue-500 rounded-full mr-3 opacity-80"></span>
           连 · Link
         </h2>
         <p>
         想把这里的风景带回你的世界？和你定下一个数据契约吧：
           <br>
           <code class="text-sm bg-black/30 px-3 py-2 rounded-lg mt-3 block w-full md:w-auto font-mono text-pink-300 border border-white/5 select-all">/api/posts?q=random</code>
           <br>
           
           -- 无R18 API接口 --
           <br>
           <code class="text-sm bg-black/30 px-3 py-2 rounded-lg mt-3 block w-full md:w-auto font-mono text-pink-300 border border-white/5 select-all">/api/bg_safe?type=image</code>
           <br>
           
          -- 含R18 API接口 --
          <br>
           <code class="text-sm bg-black/30 px-3 py-2 rounded-lg mt-3 block w-full md:w-auto font-mono text-pink-300 border border-white/5 select-all">/api/bg_all?type=image</code>
           <br>
           这是一个随机召唤阵，每次点击，都会召唤出一张此时此刻的惊喜。
         </p>
       </section>
     
       <!-- 尾声 -->
       <section>
         <h2 class="text-xl font-medium text-white mb-3 flex items-center">
           <span class="w-1 h-6 bg-gray-500 rounded-full mr-3 opacity-80"></span>
           寄语 · Epilogue
         </h2>
         <p>
         现在的 MtcACG 还在长身体的阶段呢，很多想收录的美图还在排队等着“入驻”。欢迎通过<a href="https://t.me/trytwosBot" target="_blank">Telegram</a> 投递信件。
         “请多给这个小小的图库一点耐心和爱吧~”
         </p>
         <p class="mt-6 text-sm opacity-60 italic text-center">
           "愿你在这里，捕获到最让你心动的那一抹色彩."
         </p>
       </section>

       <div class="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-mono">
         © 2025 MtcACG Gallery <span class="mx-2">|</span> Powered by Cloudflare Workers
       </div>

    </div>

    <script>
      // 自动拉取一张随机图作为背景
      async function setRandomBg() {
        try {
          const res = await fetch('/api/posts?q=random');
          const data = await res.json();
          if(data.length) {
            const bg = document.getElementById('bg-layer');
            bg.style.backgroundImage = 'url(/image/' + data[0].file_name + ')';
            bg.style.opacity = '1';
          }
        } catch(e){}
      }
      setRandomBg();
    </script>
  </body>
  </html>`;
}




export function htmlDetail(params) {
  // 解包参数，方便下面使用
  const { title, artist, bgUrl, imagesJson, currentIndex, tags, randomPosts } = params;

  // 这里的 SIDEBAR_CONTENT 是你详情页专用的侧边
  const SIDEBAR_CONTENT = `
    <div id="overlay" onclick="toggleSidebar()" class="fixed inset-0 bg-black/60 z-[99] hidden transition-opacity opacity-0" style="will-change: opacity"></div>
    <aside id="sidebar" class="fixed top-0 left-0 w-72 h-full bg-[#1a1a1a] border-r border-white/10 z-[100] transform -translate-x-full transition-transform duration-300 ease-out shadow-2xl flex flex-col" style="will-change: transform">
      <div class="p-6 border-b border-white/10 flex items-center justify-between">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">MtcACG</h2>
        <button onclick="toggleSidebar()" class="text-gray-400 hover:text-white">&times;</button>
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <a href="/" class="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition">
          <svg class="w-5 h-5 mr-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 11.5L12 4l9 7.5M5 10.5V20h5v-5h4v5h5v-9.5"/></svg>
          <span>首页</span>
        </a>

            <!-- 画师名人堂 (Sidebar Item) -->
        <a href="/artists" class="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition">
           <svg class="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
           </svg>
          <span class="bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent font-bold">画师名人堂</span>
        </a>
    
        <a href="javascript:void(0)" onclick="randomImage(); toggleSidebar();" class="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition">
          <svg class="w-5 h-5 mr-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h4l3 6 3-6h4M4 18h4l3-6 3 6h4"/></svg>
          <span>随机抽图看看0w0</span>
        </a>
        <a href="/r18" class="flex items-center p-3 text-red-300 hover:bg-red-500/10 rounded-lg transition group">
          <svg class="w-5 h-5 mr-3 text-red-400 group-hover:text-red-200" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <span class="font-bold">里世界 · 纯R18|慎</span>
        </a>    
        <a href="/about" class="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition">
           <svg class="w-5 h-5 mr-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8.5v.01M11 11h1v5h1"/></svg>
           <span>关于</span>
        </a>
        <div class="pt-4 mt-4 border-t border-white/10">
          <div class="flex items-center justify-between p-3">
             <span class="text-gray-300 flex items-center"><span class="mr-3">🔞</span> R18 哒咩~</span>
             <label class="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" id="r18-toggle-sidebar" class="sr-only peer" onchange="toggleR18(this)">
               <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer 
               after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
               after:translate-x-full peer-checked:after:translate-x-0 
               bg-pink-600 peer-checked:bg-gray-600"></div>          
             </label>
          </div>
        </div>
      </nav>
      <div class="pt-4 mt-4 border-t border-white/10">
          <p class="px-3 text-xs font-bold text-gray-500 uppercase mb-2">Friends</p>
          <a href="https://github.com/TyrEamon/MTCacg" target="_blank" class="flex items-center p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm">
             <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
             GitHub
          </a>
      </div>
      <div class="p-4 text-xs text-center text-gray-600 border-t border-white/5">© 2025 MtcACG Gallery</div>
    </aside>
  `;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="icon" type="image/png" href="https://pub-d07d03b8c35d40309ce9c6d8216e885b.r2.dev/ACGg.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html, body { 
      margin: 0; padding: 0; width: 100%; height: 100%; 
      background: #050509; color: #fff; font-family: system-ui, sans-serif;
      overflow: hidden; 
    }
    
    #fixed-bg {
      position: fixed; inset: 0; z-index: 1;
      background-image: url('${bgUrl}');
      background-size: cover; background-position: center;
      filter: blur(7px) brightness(0.85);
      transform: scale(1.1);
      opacity: 0.7; 
      pointer-events: none;
    }

    .header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; }
    
    .glass-btn { 
      display: flex; align-items: center; justify-content: center;
      color: #ccc; text-decoration: none; 
      background: rgba(0,0,0,0.4); padding: 8px 12px; 
      border-radius: 99px; backdrop-filter: blur(4px); transition: .2s; 
      cursor: pointer; border: none;
    }
    .glass-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }
    
    .brand { font-weight: 800; opacity: 0.8; }

    .page-container { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100vh; padding-top: 60px; box-sizing: border-box; }
    .main-content {
      display: flex; flex: 1; padding: 20px; gap: 40px;
      overflow: hidden; width: 100%; max-width: 1400px;
      margin: 0 auto; box-sizing: border-box;
    }
    
    .left-col { flex: 1.8; display: flex; align-items: center; justify-content: center; position: relative; min-width: 0; height: 100%; }
    .right-col {
      flex: 1; display: flex; flex-direction: column; gap: 20px;
      overflow-y: auto; min-height: 0; padding-right: 10px;
      max-width: 450px;
    }
    .right-col::-webkit-scrollbar { width: 6px; }
    .right-col::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }

    @media(max-width: 1023px) {
      body { overflow-y: auto; }
      .page-container { height: auto; padding-top: 50px; display: block; }
      .main-content { display: block; padding: 16px; overflow: visible; height: auto; gap: 20px; }
      .left-col { height: auto; min-height: 300px; margin-bottom: 24px; }
      .right-col { overflow: visible; height: auto; padding-right: 0; max-width: 100%; }
    }

    .viewer { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; }
    .viewer img { 
      max-width: 100%; max-height: 100%; 
      object-fit: contain; border-radius: 12px; 
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    }
    @media(max-width: 1023px) { .viewer img { max-height: 60vh; } }

    .nav-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(0,0,0,0.5); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 20px; border: 1px solid rgba(255,255,255,0.1); z-index: 10; }
    .nav-btn.prev { left: 16px; } .nav-btn.next { right: 16px; }

    .info-box { background: rgba(30,30,35,0.5); backdrop-filter: blur(20px); border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.08); flex-shrink: 0; }
    h1 { font-size: 20px; margin: 0 0 8px; line-height: 1.4; word-break: break-word; }
    .id-row { font-family: monospace; color: #888; font-size: 13px; margin-bottom: 20px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
    .tag { background: rgba(255,255,255,0.08); color: #ccc; padding: 6px 12px; border-radius: 8px; font-size: 13px; text-decoration: none; transition: .2s; }
    .tag:hover { background: rgba(255,255,255,0.2); color: #fff; }
    
    .dl-btn { display: block; width: 100%; box-sizing: border-box; text-align: center; background: linear-gradient(90deg, #ec4899, #8b5cf6); color: #fff; font-weight: 700; text-decoration: none; padding: 14px; border-radius: 12px; transition: .2s; }
    .dl-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
    
    .rec-grid { display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); }
    @media(min-width: 1024px) { .rec-grid { grid-template-columns: repeat(3, 1fr); } }
    .rec-item { aspect-ratio: 1; border-radius: 12px; overflow: hidden; background: #000; }
    .rec-item img { width: 100%; height: 100%; object-fit: cover; transition: .3s; }
    .rec-item:hover img { opacity: 0.8; transform: scale(1.05); }

    #lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: none; align-items: center; justify-content: center; z-index: 100; }
  </style>
</head>
<body>
  <div id="fixed-bg"></div>
  ${SIDEBAR_CONTENT}

  <div class="page-container">
    <div class="header">
      <button onclick="toggleSidebar()" class="glass-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </button>
      <div class="brand">MtcACG</div>
    </div>

    <div id="lightbox">
      <img id="lightbox-img" src="" style="max-width: 95vw; max-height: 95vh; object-fit: contain; box-shadow: 0 20px 60px rgba(0,0,0,0.8); border-radius: 12px;">
    </div>
  
    <div class="main-content" id="app"
        data-images='${imagesJson.replace(/'/g, "\\'")}'
        data-index='${currentIndex}'
        data-title='${title.replace(/'/g, "\\'")}'>
      
      <div class="left-col">
        <div class="viewer">
          <img id="img" src="" alt="">
          <div class="nav-btn prev" style="display:none" onclick="go(-1)">❮</div>
          <div class="nav-btn next" style="display:none" onclick="go(1)">❯</div>
        </div>
      </div>

      <div class="right-col">
        <div class="info-box">

        <div class="artist-card mb-4 p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20
                    border border-white/20 rounded-xl backdrop-blur-sm">
          ${
            artist
              ? `<a href="/artist/${encodeURIComponent(artist)}"
                   class="inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-pink-300 transition">
                   Artist(画师)： ${artist} 
                   <span class="opacity-70"> 🎨</span>
                 </a>`
              : `<span class="text-gray-400 text-sm">Artist(画师)： Unknown Artist </span>`
          }
        </div>

  
          <h1 id="title-text"></h1>
          <div id="id-text" class="id-row"></div>
          <div id="tags-box" class="tags">${tags.map(t => `<a href="/?q=${encodeURIComponent(t)}" class="tag">#${t}</a>`).join('')}</div>
          <a id="dl-link" href="#" target="_blank" class="dl-btn">Download Original</a>
        </div>
        
        <div class="rec-grid">
          ${randomPosts.map(p => `<a href="/detail/${p.id}" class="rec-item"><img src="/image/${p.file_name}" loading="lazy"></a>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <script>
    async function randomImage() {
      try {
        const res = await fetch('/api/posts?q=random');
        const data = await res.json();
        if(data.length) window.location.href = '/detail/' + data[0].id;
      } catch(e) {}
    }
    function toggleSidebar() {
      const sb = document.getElementById('sidebar');
      const ov = document.getElementById('overlay');
      if(!sb || !ov) return;
      const isOpen = !sb.classList.contains('-translate-x-full');
      if (isOpen) {
        sb.classList.add('-translate-x-full');
        ov.classList.remove('opacity-100');
        setTimeout(() => ov.classList.add('hidden'), 300);
      } else {
        ov.classList.remove('hidden');
        void ov.offsetWidth;
        ov.classList.add('opacity-100');
        sb.classList.remove('-translate-x-full');
      }
    }
    function toggleR18(el) {
      localStorage.setItem('hide_r18', !el.checked);
      location.reload();
    }
    setTimeout(() => {
      const toggle = document.getElementById('r18-toggle-sidebar');
      if(toggle) {
          toggle.checked = (localStorage.getItem('hide_r18') !== 'true');
      }
  }, 100);  
  
    const root = document.getElementById('app');
    const images = JSON.parse(root.dataset.images);
    let idx = parseInt(root.dataset.index);
    const imgEl = document.getElementById('img');
    
    const titleEl = document.getElementById('title-text');
    const idEl = document.getElementById('id-text');
    const dlLink = document.getElementById('dl-link');
    const btnPrev = document.querySelector('.nav-btn.prev');
    const btnNext = document.querySelector('.nav-btn.next');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    imgEl.addEventListener('click', () => {
      if(!images.length) return;
      lightboxImg.src = '/image/' + images[idx].file;
      lightbox.style.display = 'flex';
    });
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }
    });
   
    if (images.length > 1) { btnPrev.style.display = 'flex'; btnNext.style.display = 'flex'; }

    function render(dir) {
      const item = images[idx];
      if(dir) imgEl.style.opacity = '0.5';
      setTimeout(() => {
        imgEl.src = '/image/' + item.file;
        titleEl.textContent = root.dataset.title + (images.length > 1 ? \` [P\${idx+1}/\${images.length}]\` : '');
        idEl.textContent = 'ID: ' + item.id;
        dlLink.href = item.download;
        imgEl.onload = () => imgEl.style.opacity = '1';
      }, dir ? 50 : 0);
    }
    render(0);

    window.go = (dir) => { idx = (idx + dir + images.length) % images.length; render(dir); };
    document.addEventListener('keydown', e => { if(e.key === 'ArrowLeft') go(-1); if(e.key === 'ArrowRight') go(1); });
  </script>
</body>
</html>`;
}



// ==========================================
// 2. 画师分类页 HTML (新增/替换此函数)
// ==========================================
export function htmlArtists() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>画师名人堂 - MtcACG</title>
  <link rel="icon" type="image/png" href="https://pub-d07d03b8c35d40309ce9c6d8216e885b.r2.dev/ACGg.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ::-webkit-scrollbar { width: 0px; background: transparent; }
    html { -ms-overflow-style: none; scrollbar-width: none; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #121212; color: #fff; overflow-x: hidden; }
    
    #bg-layer { position: fixed; inset: 0; z-index: -1; background-size: cover; background-position: center; filter: blur(10px) brightness(0.5); opacity: 0; transition: opacity 1s; pointer-events: none; }

    /* === 顶部栏 (更通透) === */
    .header { 
      position: fixed; top: 0; left: 0; right: 0; z-index: 50; 
      /* 背景透明度降低到 0.6，模糊度增加 */
      background: rgba(10, 10, 10, 0.6); 
      backdrop-filter: blur(20px); 
      border-bottom: 1px solid rgba(255,255,255,0.08); 
      padding: 12px 20px; 
      display: flex; align-items: center; justify-content: space-between; 
    }
    .logo { font-weight: 800; font-size: 18px; color: #fff; text-decoration: none; white-space: nowrap; }

    /* 搜索框容器 */
    .search-container {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 12px;
    }
    .search-input {
      width: 0;
      padding: 0;
      border: none;
      background: transparent;
      color: white;
      outline: none;
      transition: all 0.3s ease;
      border-bottom: 1px solid transparent;
      opacity: 0;
      font-size: 14px;
    }
    .search-input.expanded {
      width: 160px;
      padding: 4px 8px;
      border-bottom: 1px solid #ec4899;
      opacity: 1;
      margin-right: 8px;
    }
    /* 移动端搜索框稍微宽一点 */
    @media(max-width: 640px) {
        .search-input.expanded { width: 120px; }
    }
    
    .search-btn {
      background: none; border: none; color: #ccc; cursor: pointer; padding: 4px;
      transition: color 0.2s;
    }
    .search-btn:hover { color: #fff; }

    /* === 瀑布流容器 === */
    .masonry-wrap { display: flex; gap: 16px; padding: 16px; align-items: flex-start; margin-top: 60px; }
    @media(min-width: 768px) { .masonry-wrap { padding: 30px; gap: 24px; max-width: 1800px; margin: 80px auto 0; } }
    .masonry-col { flex: 1; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
    @media(min-width: 768px) { .masonry-col { gap: 24px; } }

    /* === 卡片样式 === */
    .artist-card {
      background: #202020; border-radius: 12px; overflow: hidden; position: relative;
      transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      display: flex; flex-direction: column;
    }
    .artist-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.5); z-index: 10; background: #2a2a2a; }

    .cover-area { position: relative; width: 100%; cursor: zoom-in; }
    .placeholder { width: 100%; padding-bottom: calc(var(--h) / var(--w) * 100%); background: #1a1a1a; }
    .card-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.4s; }
    .card-img.loaded { opacity: 1; }
    
    .zoom-hint {
      position: absolute; top: 10px; right: 10px;
      background: rgba(0,0,0,0.6); border-radius: 50%; width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; pointer-events: none;
    }
    .cover-area:hover .zoom-hint { opacity: 1; }

    .info-bar { padding: 12px 14px; background: #202020; display: flex; flex-direction: column; gap: 10px; border-top: 1px solid rgba(255,255,255,0.05); }
    .info-top { display: flex; justify-content: space-between; align-items: center; }
    .artist-name { font-weight: 700; font-size: 15px; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
    .info-bottom { display: flex; justify-content: space-between; align-items: center; }
    .count-badge { font-size: 12px; color: #888; background: #151515; padding: 4px 8px; border-radius: 6px; }

    .view-btn {
      background: #4CAF50; color: white; font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 99px; text-decoration: none; transition: background 0.2s; display: flex; align-items: center; gap: 4px;
    }
    .view-btn:hover { background: #45a049; }
    .view-btn:active { transform: scale(0.95); }

    /* === Lightbox === */
    #lightbox { position: fixed; inset: 0; z-index: 999; background: rgba(0,0,0,0.95); display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.25s; }
    #lightbox.active { display: flex; opacity: 1; }
    #lightbox img { max-width: 90vw; max-height: 90vh; border-radius: 4px; box-shadow: 0 0 30px rgba(0,0,0,0.5); object-fit: contain; transform: scale(0.95); transition: transform 0.3s; }
    #lightbox.active img { transform: scale(1); }
    .lb-close { position: absolute; top: 20px; right: 20px; color: #fff; font-size: 30px; cursor: pointer; opacity: 0.7; }
    .lb-close:hover { opacity: 1; }

    .loading-tip { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); padding: 8px 20px; border-radius: 20px; font-size: 12px; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
  </style>
</head>
<body>
  <div id="bg-layer"></div>
  ${SIDEBAR_HTML}

  <div class="header">
    <!-- 左侧：侧边栏按钮 + 名人堂入口 (高亮) -->
    <div class="flex items-center gap-2">
        <div class="p-2 cursor-pointer hover:bg-white/10 rounded-full transition" onclick="toggleSidebar()">
          <svg width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </div>
        <!-- 当前就在名人堂，所以这里图标给个高亮色 -->
        <a href="/artists" class="p-2 text-yellow-400 bg-white/10 rounded-full" title="画师名人堂">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </a>
    </div>

    <!-- 右侧：搜索 + LOGO -->
    <div class="flex items-center">
        <!-- 搜索框 -->
        <div class="search-container">
            <input type="text" id="artist-search" class="search-input" placeholder="搜索画师..." onkeydown="handleSearch(event)">
            <button class="search-btn" onclick="toggleSearch()">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
        </div>
        <a href="/" class="logo">MtcACG</a>
    </div>
  </div>

  <div id="masonry" class="masonry-wrap"></div>
  
  <div id="tip" class="loading-tip">加载中...</div>

  <!-- Lightbox 结构 -->
  <div id="lightbox" onclick="closeLightbox()">
    <div class="lb-close">&times;</div>
    <img id="lb-img" src="" alt="Preview">
  </div>

  <script>
    const masonry = document.getElementById('masonry');
    const bgLayer = document.getElementById('bg-layer');
    const tip = document.getElementById('tip');
    
    let page = 1;
    let isLoading = false;
    let done = false;
    // 默认展示全部，q 用来存搜索关键词
    let currentQuery = ''; 
    let colHeights = [];
    let cols = [];
    let colCount = window.innerWidth < 640 ? 2 : (window.innerWidth < 1024 ? 3 : (window.innerWidth < 1400 ? 4 : 5));

    // 搜索框展开/收起逻辑
    function toggleSearch() {
        const input = document.getElementById('artist-search');
        const isExpanded = input.classList.contains('expanded');
        
        if (isExpanded && input.value.trim() !== '') {
            // 如果已经展开且有内容，点击放大镜就执行搜索
            doArtistSearch(input.value);
        } else {
            // 否则切换展开状态
            input.classList.toggle('expanded');
            if (!isExpanded) input.focus();
        }
    }
    
    // 回车搜索
    function handleSearch(e) {
        if (e.key === 'Enter') {
            doArtistSearch(e.target.value);
        }
    }

    // 执行搜索
    function doArtistSearch(val) {
        currentQuery = val.trim();
        page = 1;
        done = false;
        load(true); // reset = true
    }

    function initMasonry() {
      masonry.innerHTML = '';
      cols = [];
      colHeights = new Array(colCount).fill(0);
      for(let i=0; i<colCount; i++) {
        const div = document.createElement('div');
        div.className = 'masonry-col';
        masonry.appendChild(div);
        cols.push(div);
      }
    }

    window.addEventListener('resize', () => {
      const newCount = window.innerWidth < 640 ? 2 : (window.innerWidth < 1024 ? 3 : (window.innerWidth < 1400 ? 4 : 5));
      if(newCount !== colCount) {
        colCount = newCount;
        page = 1; done = false; load(true);
      }
    });

    // Lightbox
    window.openLightbox = function(url) {
      const lb = document.getElementById('lightbox');
      const img = document.getElementById('lb-img');
      img.src = url;
      lb.style.display = 'flex';
      void lb.offsetWidth; lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
      const lb = document.getElementById('lightbox');
      lb.classList.remove('active');
      setTimeout(() => {
        lb.style.display = 'none';
        document.getElementById('lb-img').src = '';
        document.body.style.overflow = 'auto';
      }, 250);
    };
    
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLightbox(); });

    async function load(reset = false) {
      if (isLoading || (done && !reset)) return;
      isLoading = true;
      tip.style.opacity = '1';

      if (reset) initMasonry();
      if (cols.length === 0) initMasonry();

      try {
        // ✅ 这里的 API 请求加上了 q 参数，实现后端搜索
        const url = \`/artists?format=json&page=\${page}&q=\${encodeURIComponent(currentQuery)}\`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.length === 0) {
          done = true;
          tip.textContent = '没有更多了';
          setTimeout(() => tip.style.opacity = '0', 2000);
          isLoading = false;
          return;
        }

        // 只有在第一页且是【全量浏览】（没搜东西）时才换大背景，避免搜索时背景乱跳
        if (page === 1 && currentQuery === '' && data.length > 0) {
          bgLayer.style.backgroundImage = \`url(/image/\${data[0].cover})\`;
          bgLayer.style.opacity = '1';
        }

        for (const item of data) {
          const w = item.width || 3;
          const h = item.height || 4;
          const aspectRatio = h / w;
          
          let minIdx = 0;
          for(let i=1; i<colCount; i++) {
            if(colHeights[i] < colHeights[minIdx]) minIdx = i;
          }

          const card = document.createElement('div');
          card.className = 'artist-card';
          
          const coverUrl = \`/image/\${item.cover}?dl=jpg\`;
          const artistLink = \`/artist/\${encodeURIComponent(item.artist)}\`;

          card.innerHTML = \`
            <div class="cover-area" onclick="openLightbox('\${coverUrl}')">
               <div class="placeholder" style="--w:\${w}; --h:\${h};"></div>
               <img class="card-img" src="\${coverUrl}" loading="lazy" onload="this.classList.add('loaded')">
               <div class="zoom-hint">
                 <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="none"/><path fill="currentColor" d="M21 21l-4.35-4.35a7.95 7.95 0 001.35-4.65C18 7.58 14.42 4 10 4S2 7.58 2 12s3.58 8 8 8c1.77 0 3.4-.55 4.65-1.35L19 23l2-2zM10 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
               </div>
            </div>
            
            <div class="info-bar">
               <div class="info-top">
                 <div class="artist-name" title="\${item.artist}">\${item.artist}</div>
               </div>
               <div class="info-bottom">
                 <div class="count-badge">\${item.count} 作品</div>
                 <a href="\${artistLink}" class="view-btn">
                   查看作品 <span style="font-size:14px">→</span>
                 </a>
               </div>
            </div>
          \`;

          cols[minIdx].appendChild(card);
          colHeights[minIdx] += (aspectRatio + 0.3);
        }

        page++;
      } catch (e) { console.error(e); }
      
      isLoading = false;
      tip.style.opacity = '0';
    }

    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
        load();
      }
    });

    load(true);
  </script>
</body>
</html>`;
}


// templates.js

// 确保在文件顶部或适当位置引入了 SIDEBAR_HTML
// import { SIDEBAR_HTML } from './templates.js'; 

export function htmlArtistProfile(data) {
  const { artist, count, updateTime, cover1, cover2, platformText } = data;

  // === 3. 动态生成平台标签的 HTML ===
  // 我们在模板里直接处理，把 "Pixiv、Yande.re" 拆开变成漂亮的彩色徽章
  const platforms = platformText.split('、');
  
  const renderBadge = (p) => {
    let icon = '🎨'; let colorClass = 'bg-gray-500/20 text-gray-200 border-gray-500/30';
    if (p.includes('Pixiv')) { icon = '🅿️'; colorClass = 'bg-[#0096fa]/20 text-[#0096fa] border-[#0096fa]/30'; }
    else if (p.includes('Yande')) { icon = '🍒'; colorClass = 'bg-[#ff4d4d]/20 text-[#ff4d4d] border-[#ff4d4d]/30'; }
    else if (p.includes('MtcACG')) { icon = '🌟'; colorClass = 'bg-[#a855f7]/20 text-[#a855f7] border-[#a855f7]/30'; }
    else if (p.includes('Twitter')) { icon = '🐦'; colorClass = 'bg-[#1da1f2]/20 text-[#1da1f2] border-[#1da1f2]/30'; }
    
    return `<span class="platform-badge ${colorClass}">${icon} ${p}</span>`;
  };

  const badgesHtml = platforms.map(p => renderBadge(p.trim())).join('');


  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${artist} - 作品集</title>
  <link rel="icon" type="image/png" href="https://pub-d07d03b8c35d40309ce9c6d8216e885b.r2.dev/ACGg.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* === 基础设置 === */
    body { background: #121212; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    ::-webkit-scrollbar { width: 0; }
    
    /* === 优化点2：网页大背景 (调亮) === */
    /* 之前的 brightness(0.4) 太黑了，改成 0.6，模糊度保留 */
    .page-bg {
      position: fixed; inset: 0; z-index: -2;
      background-image: url('/image/${cover2}?dl=jpg');
      background-size: cover; background-position: center;
      filter: blur(3px) brightness(0.6); 
      transform: scale(1.1);
      transition: opacity 1s;
    }

        /* === 顶部导航栏（统一风格） === */
    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 50;
      background: rgba(10, 10, 10, 0.7); 
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 12px 20px;
      display: flex; align-items: center; justify-content: space-between;
    }
    
    /* Tailwind 工具类（如果环境没有自动加载就加上） */
    .flex { display: flex; }
    .items-center { align-items: center; }
    .gap-2 { gap: 0.5rem; }
    .p-2 { padding: 0.5rem; }
    .rounded-full { border-radius: 9999px; }
    .transition { transition: all 0.2s; }
    .hover\:bg-white\/10:hover { background: rgba(255,255,255,0.1); }
    .hover\:bg-white\/20:hover { background: rgba(255,255,255,0.2); }
    .cursor-pointer { cursor: pointer; }
    .text-yellow-400 { color: #fbbf24; }
    .bg-white\/10 { background: rgba(255,255,255,0.1); }
    .text-gray-300 { color: #d1d5db; }
    .hover\:text-white:hover { color: #fff; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .text-lg { font-size: 1.125rem; }
    .tracking-wide { letter-spacing: 0.025em; }
    .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .max-w-xs { max-width: 20rem; }

    /* === 优化点2：信息卡片 (调亮 & 玻璃感) === */
    .profile-card {
      margin-top: 100px;
      position: relative; overflow: hidden;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4); /* 阴影可以让卡片浮起来 */
      border: 1px solid rgba(255, 255, 255, 0.15); /* 边框亮一点 */
    }
    
    /* 卡片背景图层 */
    .profile-card::before {
      content: ''; position: absolute; inset: 0; z-index: -1;
      background-image: url('/image/${cover1}?dl=jpg');
      background-size: cover; background-position: center;
      /* 关键调整：亮度 0.7 (之前是0.5)，模糊度 50px (更柔和) */
      filter: blur(15px) brightness(0.6) saturate(1.2); 
      transform: scale(1.2);
    }
    
    /* 遮罩层 (改淡) */
    .profile-card::after {
      content: ''; position: absolute; inset: 0; z-index: -1;
      /* 之前是 0.4，现在改成 0.2，或者用渐变 */
      background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
    }

    /* === 优化点3：多彩平台标签 === */
    .platform-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 12px; border-radius: 8px; 
      font-size: 13px; font-weight: 600; 
      border: 1px solid; /*边框颜色由 inline style 控制*/
      backdrop-filter: blur(4px);
      transition: transform 0.2s;
    }
    .platform-badge:hover { transform: translateY(-2px); }

    /* 统计数据 */
    .stat-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 30px;
    }
    @media(min-width: 640px) { .stat-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; } }

    .stat-item {
      background: rgba(0,0,0,0.2); /* 半透明黑底 */
      border-radius: 16px; padding: 20px;
      border: 1px solid rgba(255,255,255,0.05);
      backdrop-filter: blur(10px);
      transition: background 0.2s;
    }
    .stat-item:hover { background: rgba(255,255,255,0.1); }

    .stat-label { font-size: 12px; color: #ccc; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; font-weight: 500; }
    .stat-value { font-size: 20px; font-weight: 700; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }

    /* 瀑布流 */
    .masonry-wrap { display: flex; gap: 16px; margin-top: 40px; align-items: flex-start; }
    .masonry-col { flex: 1; display: flex; flex-direction: column; gap: 16px; }
    
    .img-card {
      display: block; border-radius: 12px; overflow: hidden; background: #222;
      position: relative; transition: transform 0.2s;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    .img-card:hover { transform: translateY(-4px); z-index: 10; box-shadow: 0 12px 24px rgba(0,0,0,0.5); }
    .img-card img { width: 100%; height: auto; display: block; opacity: 0; transition: opacity 0.3s; }
    .img-card img.loaded { opacity: 1; }
    .meta { 
      position: absolute; bottom: 0; left: 0; right: 0; 
      padding: 60px 12px 12px; /* 顶部留足空间给渐变 */
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
      opacity: 0; transition: opacity 0.3s ease; 
      pointer-events: none; z-index: 10;
    }
    .img-card:hover .meta { opacity: 1; }
    
    .title { 
      font-size: 13px; font-weight: 600; color: #fff; 
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
      text-shadow: 0 2px 4px rgba(0,0,0,0.8);
      transform: translateY(10px); transition: transform 0.3s ease;
    }
    .img-card:hover .title { transform: translateY(0); }
  </style>
</head>
<body class="px-4 pb-20 md:px-10 lg:px-20">
  
  <div class="page-bg"></div>
  
  ${typeof SIDEBAR_HTML !== 'undefined' ? SIDEBAR_HTML : ''}

  <div class="header">
    <!-- 左侧：汉堡菜单 + 名人堂入口 -->
    <div class="flex items-center gap-2">
        <div class="p-2 cursor-pointer hover:bg-white/10 rounded-full transition" onclick="toggleSidebar()">
          <svg width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </div>
        <!-- 画师名人堂入口（高亮） -->
        <a href="/artists" class="p-2 text-yellow-400 bg-white/10 rounded-full transition hover:bg-white/20" title="画师名人堂">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 4 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </a>
    </div>

    <!-- 中间：画师名称 -->
    <div class="font-bold text-lg tracking-wide truncate max-w-xs">${artist}的作品展</div>    <!-- 右侧：返回首页 -->
    <a href="/" class="text-gray-300 hover:text-white transition font-semibold">MtcACG</a>
  </div>

  <div class="max-w-5xl mx-auto">
    <!-- 信息卡片 -->
    <div class="profile-card">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div class="flex flex-wrap items-center gap-4 mb-3">
             <h1 class="text-3xl md:text-5xl font-bold text-white drop-shadow-md">${artist}</h1>
           </div>
           
           <!-- 这里的平台标签已经完全彩色化了 -->
           <div class="flex flex-wrap gap-2 items-center">
              ${badgesHtml}
              <span class="text-gray-300 text-sm ml-2 opacity-80 border-l border-white/20 pl-3">MtcACG 收录画师</span>
           </div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-item">
          <span class="stat-label"><span class="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span> 收录作品</span>
          <span class="stat-value">${count} 张</span>
        </div>
        <div class="stat-item">
          <span class="stat-label"><span class="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></span> 最近更新</span>
          <span class="stat-value">${updateTime}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label"><span class="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]"></span> 数据来源</span>
          <!-- 防止文字太长，只显示前两个，用 title 看全部 -->
          <span class="stat-value truncate block" title="${platformText}">${platformText}</span>
        </div>
      </div>
    </div>

    <!-- 瀑布流区域 -->
    <div class="mt-16 mb-8 flex items-end justify-between border-b border-white/10 pb-4">
       <div class="flex items-center gap-3">
         <div class="w-1.5 h-8 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]"></div>
         <div>
           <h2 class="text-2xl font-bold leading-none">Gallery</h2>
           <span class="text-gray-400 text-xs font-mono uppercase tracking-widest">Selected Works</span>
         </div>
       </div>
       <span class="text-gray-500 font-mono text-sm">${count} ITEMS</span>
    </div>

    <div id="masonry" class="masonry-wrap"></div>
    <div id="tip" class="text-center py-10 text-gray-500 text-sm opacity-60">Loading...</div>
  </div>

  <script>
    const artistName = "${artist}";
    let page = 1;
    let done = false;
    let isLoading = false;
    const masonry = document.getElementById('masonry');
    const tip = document.getElementById('tip');
    
    // 智能列数：手机2列，平板3列，电脑4列
    let colCount = window.innerWidth < 768 ? 2 : (window.innerWidth < 1200 ? 4 : 5);
    let cols = [];
    let colHeights = new Array(colCount).fill(0);

    function init() {
      masonry.innerHTML = '';
      cols = [];
      colHeights = new Array(colCount).fill(0);
      for(let i=0; i<colCount; i++) {
        const div = document.createElement('div');
        div.className = 'masonry-col';
        masonry.appendChild(div);
        cols.push(div);
      }
    }
    init();

    async function load() {
      if(done || isLoading) return;
      isLoading = true;
      tip.style.opacity = '1';
      
      try {
        const res = await fetch(\`/artist/\${encodeURIComponent(artistName)}?format=json&page=\${page}\`);
        const data = await res.json();
        
        if(data.length === 0) {
          done = true;
          tip.textContent = 'End of Gallery';
          setTimeout(()=>tip.style.opacity='0', 1000);
          return;
        }

        for(const item of data) {
           const w = item.width || 300;
           const h = item.height || 400;
           const ratio = h / w;
           
           // 贪心算法：找当前最短的那一列插入
           let min = 0;
           for(let i=1; i<colCount; i++) if(colHeights[i] < colHeights[min]) min = i;
           

           // 1. 先提取标题
           const titleText = (item.caption || '').split('\\n')[0];

           const card = document.createElement('a');
           card.href = \`/detail/\${item.id}\`;
           card.className = 'img-card';
           card.innerHTML = \`
               <img src="/image/\${item.file_name}?dl=jpg" loading="lazy" onload="this.classList.add('loaded')" style="aspect-ratio:\${w}/\${h}">
               <div class=\"meta\">
                   <div class=\"title\">\${titleText}</div>
               </div>
           \`;

           
           cols[min].appendChild(card);
           colHeights[min] += ratio;
        }
        page++;
      } catch(e) { console.error(e); }
      isLoading = false;
    }

    // 触底自动加载
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) {
        load();
      }
    });
    
    // 窗口改变大小时重新布局 (可选优化)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newCount = window.innerWidth < 768 ? 2 : (window.innerWidth < 1200 ? 4 : 5);
        if(newCount !== colCount) {
           colCount = newCount;
           page = 1; done = false;
           init(); load();
        }
      }, 300);
    });

    load();
  </script>
</body>
</html>`;
}



