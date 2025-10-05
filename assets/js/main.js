// main.js - interacciones UI, accesibilidad y utilidades

// Navegación responsive
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Cerrar menú al navegar en móvil
navList?.addEventListener('click', e => {
  if (e.target.matches('a')) {
    navList.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

// Scroll activo en navegación
const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.nav__list a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
sections.forEach(s => observer.observe(s));

// Theme toggle con persistencia
const themeToggle = document.getElementById('themeToggle');
const isLight = localStorage.getItem('theme') === 'light';
if (isLight) document.documentElement.classList.add('light-theme');
if (themeToggle) {
  themeToggle.checked = isLight;
  themeToggle.addEventListener('change', () => {
    document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('theme', document.documentElement.classList.contains('light-theme') ? 'light' : 'dark');
  });
}

// Año dinámico
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Typewriter simple
const typewriterEl = document.getElementById('typewriter');
const roles = ['Frontend', 'Full Stack', 'JavaScript', 'React', 'UI/UX'];
if (typewriterEl) {
  let i = 0, j = 0, deleting = false;
  const tick = () => {
    const current = roles[i];
    if (!deleting) {
      typewriterEl.textContent = current.slice(0, j++);
      if (j > current.length) { deleting = true; setTimeout(tick, 1000); return; }
    } else {
      typewriterEl.textContent = current.slice(0, j--);
      if (j < 0) { deleting = false; i = (i + 1) % roles.length; j = 0; }
    }
    setTimeout(tick, deleting ? 50 : 110);
  };
  tick();
}

// Formulario (validación básica simulada)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function showError(id, msg) {
  const span = document.querySelector(`.error[data-for="${id}"]`);
  if (span) span.textContent = msg || '';
}

form?.addEventListener('submit', e => {
  e.preventDefault();
  statusEl.textContent = '';
  const data = new FormData(form);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const message = data.get('message').trim();
  let valid = true;

  if (name.length < 2) { showError('name', 'Nombre muy corto'); valid = false; } else showError('name');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showError('email', 'Email inválido'); valid = false; } else showError('email');
  if (message.length < 10) { showError('message', 'Mensaje muy corto'); valid = false; } else showError('message');
  if (!valid) return;

  statusEl.textContent = 'Enviando...';
  setTimeout(() => {
    statusEl.textContent = 'Mensaje enviado (simulado). ¡Gracias!';
    form.reset();
  }, 1000);
});
