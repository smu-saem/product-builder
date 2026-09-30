/* 공통 인터랙션 — 테마 토글 / 헤더 / 스크롤 리빌 */

// 테마 토글 (다크 ⇄ 라이트)
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
if (toggle) {
  const syncLabel = () => {
    const light = root.getAttribute('data-theme') === 'light';
    toggle.setAttribute('aria-label', light ? '어두운 테마로 전환' : '밝은 테마로 전환');
    toggle.setAttribute('aria-pressed', String(light));
  };
  syncLabel();
  toggle.addEventListener('click', () => {
    const light = root.getAttribute('data-theme') === 'light';
    if (light) root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'light');
    try { localStorage.setItem('theme', light ? 'dark' : 'light'); } catch (e) {}
    syncLabel();
  });
}

// 스크롤 시 헤더 하단 경계선
const hdr = document.querySelector('header');
addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 8), { passive: true });

// 스크롤 리빌
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// 모션 최소화 설정 존중
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
}
