/* slideshow.js — deretan foto unit pembangkit di bawah header, bergeser otomatis satu foto setiap beberapa detik.
   Foto tampil utuh (tidak dipotong, tidak diperbesar). Daftar foto di config.js (fotoSlideshow). Tidak ikut ke Unduh PDF. */
(function () {
  const CFG = window.OH_CONFIG || {};
  const list = (CFG.fotoSlideshow || []).filter((f) => f && f.src);
  const box = document.querySelector('.oh-slides');
  if (!box || !list.length) return;
  const JEDA = Math.max(2000, Number(CFG.fotoJedaDetik || 3.5) * 1000);
  const diam = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const track = document.createElement('div'); track.className = 'oh-strip';
  const buat = (f, klon) => {
    const fig = document.createElement('figure'); fig.className = 'oh-slide';
    if (klon) fig.setAttribute('aria-hidden', 'true');
    const img = document.createElement('img');
    img.src = f.src; img.alt = klon ? '' : (f.judul || 'Foto unit pembangkit'); img.decoding = 'async';
    img.addEventListener('error', () => { fig.remove(); });
    img.addEventListener('load', () => atur(false));
    fig.appendChild(img);
    if (f.judul) { const c = document.createElement('figcaption'); c.textContent = f.judul; fig.appendChild(c); }
    return fig;
  };
  list.forEach((f) => track.appendChild(buat(f, false)));
  // salinan untuk putaran tanpa jeda di ujung
  list.forEach((f) => track.appendChild(buat(f, true)));
  box.appendChild(track);
  box.hidden = false;

  let idx = 0, timer = null;
  const asli = () => [...track.children].filter((c) => !c.hasAttribute('aria-hidden'));
  function geserKe(i, anim) {
    const items = [...track.children];
    if (!items[i]) return;
    track.style.transition = anim ? 'transform .9s ease' : 'none';
    track.style.transform = `translateX(${-items[i].offsetLeft}px)`;
  }
  function atur(anim) {
    // hanya bergeser kalau deretan foto lebih lebar dari banner
    const n = asli().length;
    const lebarAsli = asli().reduce((s, c) => s + c.offsetWidth, 0) + (n - 1) * 10;
    box.classList.toggle('pas', lebarAsli <= box.clientWidth);
    if (lebarAsli <= box.clientWidth) { clearInterval(timer); timer = null; track.style.transform = 'none'; return; }
    geserKe(idx, anim);
    if (!timer) mulai();
  }
  function maju() {
    const n = asli().length;
    idx += 1; geserKe(idx, true);
    if (idx >= n) setTimeout(() => { idx = 0; geserKe(0, false); }, 950);
  }
  function mulai() {
    clearInterval(timer); timer = null;
    if (diam) return;
    timer = setInterval(() => { if (!document.hidden) maju(); }, JEDA);
  }
  box.addEventListener('mouseenter', () => { clearInterval(timer); timer = null; });
  box.addEventListener('mouseleave', () => atur(false));
  window.addEventListener('resize', () => atur(false));
  atur(false);
})();
