const stage = document.querySelector('.art-stage');
const image = stage?.querySelector('.art-image');
const ambient = document.querySelector('.ambient');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let frame = 0;
let pointer = null;

function paint() {
  frame = 0;
  if (reducedMotion.matches) return;
  const page = document.documentElement;
  const travel = Math.max(1, page.scrollHeight - window.innerHeight);
  const progress = Math.max(0, Math.min(1, window.scrollY / travel));
  ambient.style.setProperty('--light-x', `${Math.cos(progress * Math.PI * 2) * 23}%`);
  ambient.style.setProperty('--light-y', `${progress * 50 - 24}%`);
  ambient.style.setProperty('--grid-y', `${(window.scrollY * -.16) % 48}px`);
  if (!image) return;
  const bounds = stage.getBoundingClientRect();
  if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
  const x = pointer ? (pointer.clientX - bounds.left) / bounds.width - .5 : 0;
  const y = pointer ? (pointer.clientY - bounds.top) / bounds.height - .5 : 0;
  const scroll = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height) - .5;
  image.style.setProperty('--rx', `${-y * 9}deg`);
  image.style.setProperty('--ry', `${x * 12}deg`);
  image.style.setProperty('--lift', `${-scroll * 18}px`);
}

function schedule() {
  if (!frame && !reducedMotion.matches) frame = requestAnimationFrame(paint);
}

stage?.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'touch') return;
  pointer = event;
  schedule();
});
stage?.addEventListener('pointerleave', () => {
  pointer = null;
  schedule();
});
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
reducedMotion.addEventListener('change', schedule);
schedule();

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!reducedMotion.matches) entry.target.classList.add('drawing');
      observer.unobserve(entry.target);
    }
  }, { threshold: .2 });

  document.querySelectorAll('[data-reveal]').forEach((element) => reveal.observe(element));
}
