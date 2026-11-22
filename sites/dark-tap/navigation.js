const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-principal');
const mobile = window.matchMedia('(max-width: 42rem)');

function setOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
}

toggle.hidden = false;
toggle.addEventListener('click', () => {
  setOpen(toggle.getAttribute('aria-expanded') === 'false');
});

navigation.addEventListener('click', (event) => {
  if (!mobile.matches || !event.target.closest('a')) return;
  const section = document.getElementById(event.target.closest('a').hash.slice(1));
  if (section) {
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
  }
  setOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
  setOpen(false);
  toggle.focus();
});

document.addEventListener('click', (event) => {
  if (toggle.contains(event.target) || navigation.contains(event.target)) return;
  setOpen(false);
});

mobile.addEventListener('change', () => setOpen(false));
