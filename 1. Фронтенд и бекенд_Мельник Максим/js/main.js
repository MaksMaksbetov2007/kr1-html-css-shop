const cards = [...document.querySelectorAll('.car-card')];
const search = document.querySelector('#search');
const buttons = [...document.querySelectorAll('.filter')];
const sort = document.querySelector('#sort');
const count = document.querySelector('#result-count');
const grid = document.querySelector('#car-grid');
const empty = document.querySelector('#empty-state');
let brand = 'all';
function updateCatalog(){
  const q = search.value.trim().toLowerCase();
  let shown = cards.filter(card => (brand === 'all' || card.dataset.brand === brand) && (card.dataset.name.toLowerCase().includes(q) || card.dataset.brand.toLowerCase().includes(q)));
  shown.sort((a,b) => sort.value === 'name' ? a.dataset.name.localeCompare(b.dataset.name,'ru') : cards.indexOf(a)-cards.indexOf(b));
  cards.forEach(card => card.hidden = true);
  shown.forEach(card => {card.hidden = false; grid.appendChild(card);});
  count.textContent = String(shown.length).padStart(2,'0');
  empty.hidden = shown.length > 0;
}
buttons.forEach(btn => btn.addEventListener('click', () => {brand = btn.dataset.brand; buttons.forEach(b => b.classList.toggle('active', b === btn)); updateCatalog();}));
search.addEventListener('input', updateCatalog);
sort.addEventListener('change', updateCatalog);
document.querySelectorAll('.favorite').forEach(btn => btn.addEventListener('click', () => {const on = btn.getAttribute('aria-pressed') === 'true'; btn.setAttribute('aria-pressed', String(!on)); btn.textContent = on ? '♡' : '♥';}));
const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open));});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');}));
document.querySelector('#contact-form').addEventListener('submit', e => {e.preventDefault(); if(!e.currentTarget.reportValidity()) return; document.querySelector('#form-message').textContent = 'Спасибо! Это демонстрационная форма: заявка не отправляется на сервер.'; e.currentTarget.reset();});
updateCatalog();
