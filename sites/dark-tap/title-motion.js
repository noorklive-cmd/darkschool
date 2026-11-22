const titles = document.querySelectorAll('[data-title-motion]');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let frame = 0;

function paintTitles() {
  frame = 0;
  if (reduceMotion.matches) return;

  const viewportHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  for (const title of titles) {
    const top = title.getBoundingClientRect().top + scrollTop;
    const start = Math.max(0, top - viewportHeight * .82);
    const progress = Math.max(0, Math.min(1, (scrollTop - start) / (viewportHeight * .38)));
    const position = -10 + 122 * Math.pow(progress, 1.55);
    title.style.setProperty('--sweep-position', position.toFixed(2) + '%');
    title.classList.add('has-color-sweep');
  }
}

function scheduleTitles() {
  if (!frame && !reduceMotion.matches) frame = requestAnimationFrame(paintTitles);
}

window.addEventListener('scroll', scheduleTitles, { passive: true });
window.addEventListener('resize', scheduleTitles);
reduceMotion.addEventListener('change', scheduleTitles);
scheduleTitles();
