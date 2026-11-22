const demo = document.querySelector('.nfc-demo');
const actions = demo.querySelector('.nfc-actions');
const tap = demo.querySelector('.nfc-tap');
const edit = demo.querySelector('.nfc-edit');
const form = demo.querySelector('.nfc-panel');
const select = form.querySelector('select');
const idle = demo.querySelector('.nfc-idle');
const business = demo.querySelector('.nfc-business');
const destination = demo.querySelector('.nfc-destination');
const status = demo.querySelector('.nfc-status');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const destinations = { menu: 'Ver cardápio', whatsapp: 'Abrir WhatsApp', reviews: 'Ver avaliações' };
let saved = 'menu';

function show(state) {
  demo.dataset.state = state;
  idle.hidden = state === 'opened' || state === 'editing';
  business.hidden = !idle.hidden;
  edit.hidden = business.hidden;
  form.hidden = state !== 'editing';
  edit.setAttribute('aria-expanded', String(!form.hidden));
  edit.textContent = form.hidden ? 'Painel do lojista' : 'Fechar painel';
  tap.textContent = state === 'ready' || state === 'tapping' ? 'Aproximar cartão' : 'Testar de novo';
}

actions.hidden = false;
tap.addEventListener('click', () => {
  show('tapping');
  tap.disabled = true;
  status.textContent = 'Aproximando o cartão…';
  window.setTimeout(() => {
    show('opened');
    tap.disabled = false;
    status.textContent = 'Página do Café do Bairro aberta.';
  }, reducedMotion.matches ? 0 : 510);
});

edit.addEventListener('click', () => {
  if (!form.hidden) {
    show('opened');
    return;
  }
  select.value = saved;
  show('editing');
  select.focus();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  saved = select.value;
  destination.textContent = destinations[saved];
  show('opened');
  status.textContent = 'Destino atualizado. Aproxime o mesmo cartão para testar.';
  tap.focus();
});

destination.addEventListener('click', () => {
  status.textContent = 'Na versão real, este botão abriria: ' + destinations[saved] + '.';
});
