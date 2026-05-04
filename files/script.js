// Mobile nav toggle
const hamb = document.getElementById('hamburger');
const nav = document.getElementById('topnav');
hamb?.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamb.setAttribute('aria-expanded', String(nav.classList.contains('open')));
});

// Search + category filter
const search = document.getElementById('search');
const cats = document.querySelectorAll('.cat');
const cards = Array.from(document.querySelectorAll('.card'));

function applyFilters(){
  const q = (search?.value || '').toLowerCase().trim();
  const active = document.querySelector('.cat.active')?.dataset.category || 'all';
  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const cat = card.dataset.category;
    const matchesQ = q === '' || name.includes(q);
    const matchesCat = active === 'all' || active === cat;
    card.style.display = (matchesQ && matchesCat) ? '' : 'none';
  });
}

search?.addEventListener('input', applyFilters);
cats.forEach(c => c.addEventListener('click', () => {
  cats.forEach(x => x.classList.remove('active'));
  c.classList.add('active');
  applyFilters();
}));