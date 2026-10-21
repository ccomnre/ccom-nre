/* slideshow.js — foto unit pembangkit di header, berganti otomatis.
   Daftar foto diatur di config.js (fotoSlideshow). Tidak ikut ke Unduh PDF. */
(function () {
  const CFG = window.OH_CONFIG || {};
  const list = (CFG.fotoSlideshow || []).filter((f) => f && f.src);
  const box = document.querySelector('.oh-slides');
  if (!box || !list.length) return;
  const JEDA = Math.max(2000, Number(CFG.fotoJedaDetik || 3.5) * 1000);
  const diam = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const slides = list.map((f, i) => {
    const fig = document.createElement('figure');
    fig.className = 'oh-slide' + (i === 0 ? ' on' : '');
    const img = document.createElement('img');
    img.src = f.src; img.alt = f.judul || 'Foto unit pembangkit'; img.loading = i === 0 ? 'eager' : 'lazy'; img.decoding = 'async';
    img.addEventListener('error', () => { fig.remove(); });
    fig.appendChild(img);
    if (f.judul) { const c = document.createElement('figcaption'); c.textContent = f.judul; fig.appendChild(c); }
    box.appendChild(fig);
    return fig;
  });
  const dots = document.createElement('div'); dots.className = 'oh-slide-dots';
  slides.forEach((_, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Foto ' + (i + 1));
    b.addEventListener('click', () => { tampil(i); mulai(); });
    dots.appendChild(b);
  });
  if (slides.length > 1) box.appendChild(dots);
  box.hidden = false;

  let idx = 0, timer = null;
  function tampil(i) {
    const hidup = slides.filter((s) => s.isConnected);
    if (!hidup.length) { box.hidden = true; return; }
    idx = (i + hidup.length) % hidup.length;
    hidup.forEach((s, k) => s.classList.toggle('on', k === idx));
    [...dots.children].forEach((d, k) => d.setAttribute('aria-current', String(k === idx)));
  }
  function mulai() {
    clearInterval(timer);
    if (diam || slides.length < 2) return;
    timer = setInterval(() => { if (!document.hidden) tampil(idx + 1); }, JEDA);
  }
  box.addEventListener('mouseenter', () => clearInterval(timer));
  box.addEventListener('mouseleave', mulai);
  tampil(0); mulai();
})();
