// Minimal interactivity
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const year = document.getElementById('year');
const eventsList = document.getElementById('eventsList');

year.textContent = new Date().getFullYear();

toggle?.addEventListener('click', () => {
  const light = root.classList.toggle('light');
  toggle.textContent = light ? '☾' : '☼';
  localStorage.setItem('theme', light ? 'light' : 'dark');
});

// Persist theme
(() => {
  const saved = localStorage.getItem('theme');
  if(saved === 'light'){ root.classList.add('light'); toggle.textContent = '☾'; }
})();

// Demo events — edit or fetch later
const demoEvents = [
  { date: '2025‑11‑08', city: 'CDMX', venue: 'Underground', note: 'Breakbeat ritual — violet × gold' },
  { date: '2025‑12‑20', city: 'London', venue: 'Secret Warehouse', note: 'UKG × Jungle set' },
  { date: '2026‑01‑17', city: 'Madrid', venue: 'Sala Nova', note: 'Dance Conspiracy night' }
];

demoEvents.forEach(ev => {
  const card = document.createElement('div');
  card.className = 'event tilt';
  card.innerHTML = `
    <h3>${ev.city} — ${ev.venue}</h3>
    <div class="meta">${ev.date}</div>
    <p>${ev.note}</p>
    <a class="btn small" href="mailto:nimagnetik@gmail.com?subject=Guestlist%20${encodeURIComponent(ev.city)}">Guestlist?</a>
  `;
  eventsList.appendChild(card);
});

// Tiny 3D tilt
document.querySelectorAll('.tilt').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(800px) rotateX(${y*-4}deg) rotateY(${x*4}deg) translateZ(2px)`;
  });
  el.addEventListener('mouseleave', ()=> el.style.transform = '');
});
