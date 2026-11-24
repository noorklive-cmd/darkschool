const icons = {
  nfc: '<path d="M8 9a7 7 0 0 1 0 6m4-9a12 12 0 0 1 0 12m4-15a17 17 0 0 1 0 18"/>',
  eye: '<path d="M12 3 22 20H2L12 3Z"/><path d="M6.5 14s2-3 5.5-3 5.5 3 5.5 3-2 3-5.5 3-5.5-3-5.5-3Z"/><circle cx="12" cy="14" r="1.2"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  chat: '<path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0m-4 4h.01"/>',
  star: '<path d="m12 2 3 6 7 .9-5 5 1.2 7.1-6.2-3.4L5.8 21 7 14 2 9l7-.9Z"/>',
  grid: '<path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  food: '<path d="M4 4v6a3 3 0 0 0 6 0V4M7 4v17m12-17c-3 2-4 5-4 9h4m0-9v17"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8 8 13 13M8 16 21 3"/>',
  camera: '<path d="M8 6l2-3h4l2 3h4l1 2v11H3V8l1-2Z"/><circle cx="12" cy="12" r="4"/>',
  shop: '<path d="M3 10l2-6h14l2 6v3H3zm2 3v8h14v-8m-9 8v-5h4v5"/>',
  building: '<path d="M6 21V3h12v18M3 21h18M10 7h4m-4 4h4m-4 4h4"/>',
  person: '<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  link: '<path d="M9 15H6a4 4 0 0 1 0-8h4m4 0h4a4 4 0 0 1 0 8h-4m-6-4h8"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18h2a1.6 1.6 0 0 0 1-3c-1-1 0-2 2-2h2a2 2 0 0 0 2-2A9 9 0 0 0 12 3ZM7 12h.01M9 8h.01m5-1h.01m3 4h.01"/>',
  qr: '<path d="M3 3h6v6H3zm12 0h6v6h-6zM3 15h6v6H3zm12 0h3v3m3 0v3m-6 0h3"/>',
  refresh: '<path d="M20 4v6h-6M4 20v-6h6m10-4A8 8 0 0 0 6 6m-2 8a8 8 0 0 0 14 4"/>'
};
const svg = (name) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + icons[name] + '</svg>';
const get = (id) => document.getElementById(id);
const group = [
  {name:'Google', chip:'Google Reviews', icon:'star', example:'Avalie a empresa', color:'#ffc844', title:'Avaliações', copy:'Leve o cliente direto à página de avaliação da sua empresa no Google.'},
  {name:'Instagram', icon:'insta', example:'@seuperfil', color:'#ee53df', title:'Redes sociais', copy:'Abra seu Instagram ou TikTok direto no perfil certo.'},
  {name:'WhatsApp', icon:'chat', example:'Mensagem pronta para enviar', color:'#36db8d', title:'Atendimento', copy:'Abra uma conversa no WhatsApp com a mensagem pronta para o cliente enviar.'},
  {name:'Cardápio', icon:'food', example:'Cardápio digital'},
  {name:'Wi-Fi', icon:'wifi', example:'Rede de visitantes', color:'#32d8ed', title:'Wi-Fi', copy:'Compartilhe o acesso da rede com clientes e visitantes.'},
  {name:'Portfólio', icon:'grid', example:'Seus projetos e links'}
];
const uses = [
  ['Salões e barbearias','Convide a cliente a avaliar no Google ao fim do atendimento.','scissors','#ef4cdd'],
  ['Restaurantes e cafés','Cardápio digital na mesa, ao alcance de um toque.','food','#ffa540'],
  ['Eventos e creators','Compartilhe seu portfólio e seus links durante a conversa.','camera','#40d6eb'],
  ['Lojas e atendimento','Avaliações, catálogo ou suporte no balcão.','shop','#35d883'],
  ['Imobiliárias e consultores','Ficha do imóvel e contato direto na visita.','building','#a278ff'],
  ['Marcas pessoais','Seu contato e seus projetos em um cartão de visitas.','person','#ffc837']
];
const extras = [
  ['Link de destino','Instagram, WhatsApp, cardápio, Wi-Fi, avaliações ou sua página.','link'],
  ['Arte e identidade','Acabamento e visual alinhados à sua marca.','palette'],
  ['Mensagem de WhatsApp','A conversa começa com o texto já escrito.','chat'],
  ['Página exclusiva','Uma mini página só sua, com tudo em um lugar.','grid'],
  ['QR Code de apoio','Uma opção para quem prefere apontar a câmera.','qr'],
  ['Atualização de links','Consulte opções de atualização de destino ao configurar o cartão.','refresh']
];
document.querySelectorAll('[data-icon]').forEach((node) => { node.innerHTML = svg(node.dataset.icon); });
get('demo-chips').innerHTML = group.map((item) => '<li><i>' + svg(item.icon) + '</i>' + (item.chip || item.name) + '</li>').join('');
const ticker = [...group.map((item) => item.chip || item.name), 'Eventos', 'Links personalizados'];
get('ticker-content').innerHTML = [...ticker, ...ticker].map((name) => '<span>' + name.toUpperCase() + '<b aria-hidden="true">●</b></span>').join('');
function tile(title, copy, icon, color, link = '') {
  return '<article class="tile" style="--accent:' + (color || '#b9b9c3') + '"><i class="tile-icon">' + svg(icon) + '</i><div><h3>' + title + '</h3><p>' + copy + '</p>' + link + '</div></article>';
}
get('destinations').innerHTML = group.filter((item) => item.title).map((item) => tile(item.title, item.copy, item.icon, item.color, '<a href="#personalizacao" data-target="' + item.name + '" class="tile-link" aria-label="Configurar ' + item.name + '">CONFIGURAR ↗</a>')).join('');
get('uses').innerHTML = uses.map((item) => tile(...item)).join('');
get('extras').innerHTML = extras.map((item) => tile(...item)).join('');
const colors = [
  ['Ciano','#11dbef','#377dff'], ['Violeta','#8c36fc','#e100ee'], ['Magenta','#fb19ac','#ff6546'], ['Âmbar','#ffc228','#fa7c12']
];
get('choices').innerHTML = group.map((item) => '<button type="button" aria-pressed="false">' + item.name + '</button>').join('');
get('colors').innerHTML = colors.map(([name, start, end], index) => '<button type="button" class="swatch" aria-label="' + name + '" aria-pressed="' + (index === 0) + '" style="--swatch:linear-gradient(135deg,' + start + ',' + end + ')"></button>').join('');
const config = document.querySelector('.config');
const message = get('message');
const whatsapp = 'https://wa.me/5511940877072?text=';
let destination = group[0];
let color = colors[0];
function updateConfig() {
  const text = message.value.trim();
  get('target-icon').innerHTML = svg(destination.icon);
  get('target-title').textContent = destination.name;
  get('target-example').textContent = destination.example;
  get('message-preview').textContent = text || 'Sem mensagem personalizada.';
  get('send').href = whatsapp + encodeURIComponent('Olá, Alex! Quero configurar meu Dark Tap. Destino: ' + destination.name + '. Aura: ' + color[0] + '.' + (destination.name === 'WhatsApp' && text ? ' Mensagem para o cartão: ' + text : ''));
}
function chooseDestination(name) {
  destination = group.find((item) => item.name === name);
  [...get('choices').children].forEach((button) => button.setAttribute('aria-pressed', button.textContent === name));
  updateConfig();
}
[...get('choices').children].forEach((button) => button.addEventListener('click', () => chooseDestination(button.textContent)));
document.querySelectorAll('[data-target]').forEach((link) => link.addEventListener('click', () => chooseDestination(link.dataset.target)));
[...get('colors').children].forEach((button, index, buttons) => button.addEventListener('click', () => {
  color = colors[index];
  buttons.forEach((item) => item.setAttribute('aria-pressed', item === button));
  config.style.setProperty('--glow', color[1]);
  config.style.setProperty('--edge', color[2]);
  updateConfig();
}));
message.addEventListener('input', updateConfig);
chooseDestination(destination.name);
document.querySelectorAll('.wa').forEach((link) => { link.href = whatsapp + encodeURIComponent('Olá, Alex! Quero configurar um Dark Tap sob medida.'); });

const toggle = document.querySelector('.toggle');
const menu = get('menu');
function showMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
toggle.addEventListener('click', () => showMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (event) => { if (event.target.closest('a')) showMenu(false); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    showMenu(false);
    toggle.focus();
  }
});

const track = get('demonstracao');
const demo = track.querySelector('.demo');
const scene = track.querySelector('.scene');
const localClock = new Intl.DateTimeFormat('pt-BR', {hour:'2-digit', minute:'2-digit', hourCycle:'h23'});
const localDate = new Intl.DateTimeFormat('pt-BR', {weekday:'long', day:'numeric', month:'long'});
let clockTimer;
function refreshClock() {
  clearTimeout(clockTimer);
  const now = new Date();
  get('local-time').textContent = localClock.format(now);
  get('local-time').dateTime = now.toISOString();
  get('local-date').textContent = localDate.format(now);
  clockTimer = setTimeout(refreshClock, 60000 - now.getSeconds() * 1000 - now.getMilliseconds());
}
refreshClock();
document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshClock(); });
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let pending = false;
let screenState = 'locked';
function renderScroll() {
  pending = false;
  const top = track.getBoundingClientRect().top;
  const stickyTop = Number.parseFloat(getComputedStyle(demo).top);
  const travel = Math.max(1, track.offsetHeight - demo.offsetHeight);
  const progress = Math.min(1, Math.max(0, (stickyTop - top) / travel));
  const state = progress >= .78 ? 'unlocked' : progress >= .46 ? 'detected' : 'locked';
  scene.style.setProperty('--p', reduced.matches ? Number(state !== 'locked') : Math.min(1, progress / .48));
  if (state !== screenState) {
    screenState = state;
    scene.classList.toggle('detected', state !== 'locked');
    scene.classList.toggle('unlocked', state === 'unlocked');
    get('lock-screen').hidden = state === 'unlocked';
    get('unlocked-screen').hidden = state !== 'unlocked';
    get('phone-state').textContent = state === 'locked' ? 'Aproxime o celular' : 'NFC detectado';
  }
  if (!reduced.matches) {
    document.documentElement.style.setProperty('--gradient-position', (scrollY / 12 % 100) + '%');
  }
}
function queueRender() {
  if (!pending) {
    pending = true;
    requestAnimationFrame(renderScroll);
  }
}
addEventListener('scroll', queueRender, {passive:true});
addEventListener('resize', queueRender);
reduced.addEventListener('change', queueRender);
queueRender();

const canvas = get('waves');
const ctx = canvas.getContext('2d');
if (ctx) {
  const gradient = ctx.createLinearGradient(0,0,1000,0);
  ['#16b7d7','#77cef1','#a773f1','#f269b0','#f6a15c'].forEach((color, index) => gradient.addColorStop(index / 4, color));
  for (let line = 0; line < 52; line++) {
    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.globalAlpha = .09 + line % 6 * .026;
    for (let x = 0; x <= 1000; x += 5) {
      const y = 146 + Math.sin(x / 102 + line / 17) * (26 + line * 1.2) + Math.cos(x / 165 - line / 15) * 31 + (line - 26) * 1.1;
      if (x === 0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  ctx.save();
  ctx.translate(500,145);
  ctx.rotate(-Math.PI / 4);
  ctx.globalAlpha = .23;
  ctx.fillStyle = '#a4a4c4';
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      ctx.beginPath();
      ctx.roundRect(-65 + column * 26, -65 + row * 26, 20, 20, 5);
      ctx.fill();
    }
  }
  ctx.restore();
}
