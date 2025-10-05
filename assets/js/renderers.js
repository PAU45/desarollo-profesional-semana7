// renderers.js - funciones puras de renderizado
const skillsContainer = document.getElementById('skillsContainer');
const projectsGrid = document.getElementById('projectsGrid');
const experienceTimeline = document.getElementById('experienceTimeline');
const educationTimeline = document.getElementById('educationTimeline');
const filtersContainer = document.getElementById('projectFilters');

export function renderSkills(skills) {
  if (!skillsContainer) return;
  skillsContainer.innerHTML = skills.map(skill => {
    const all = skill.tools || [];
    const shown = all.slice(0,4);
    const extra = all.length - shown.length;
    const tags = shown.map(t => `<span class="badge" title="${t}">${t}</span>`).join('') + (extra>0 ? `<span class="badge" title="${all.slice(4).join(', ')}">+${extra}</span>` : '');
    return `<article class="skill-card fade-in" tabindex="0" title="${(skill.description||'').replace(/\"/g,'"')}">
      <h3>${skill.name} <small>${abbrevLevel(skill.level)}</small></h3>
      <div class="badges">${tags}</div>
    </article>`;
  }).join('');
}

function abbrevLevel(level='') {
  const l = level.toLowerCase();
  if (l.includes('avanz')) return 'Av.';
  if (l.includes('intermedio-avanz')) return 'Int-Av.';
  if (l.includes('intermedio')) return 'Int.';
  if (l.includes('básico-inter')) return 'Bás-Int.';
  if (l.includes('básico')) return 'Bás.';
  if (l.includes('progreso')) return 'Prog.';
  return level || '';
}

export function renderProjects(projects) {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = projects.map(p => projectCard(p)).join('');
}

function projectCard(p) {
  const stack = p.stack?.map(s => `<span class="badge" title="${s}">${s}</span>`).join('') || '';
  const links = [
    p.repo && `<a class="inline" href="${p.repo}" target="_blank" rel="noopener">Código</a>`,
    p.demo && `<a class="inline" href="${p.demo}" target="_blank" rel="noopener">Demo</a>`
  ].filter(Boolean).join('');
  return `<article class="project-card fade-in" data-tags='${JSON.stringify(p.stack||[])}'>
    <h3>${p.name}</h3>
    <p>${p.description || ''}</p>
    <div class="stack">${stack}</div>
    <div class="links">${links}</div>
  </article>`;
}

export function renderExperience(experience) {
  if (!experienceTimeline) return;
  experienceTimeline.innerHTML = experience.map(e => `
    <li class="fade-in">
      <h3>${e.role} – ${e.company}</h3>
      <span class="range">${e.start} – ${e.end || 'Actual'}</span>
      <p>${e.summary || ''}</p>
    </li>`).join('');
}

export function renderEducation(education) {
  if (!educationTimeline) return;
  educationTimeline.innerHTML = education.map(ed => `
    <li class="fade-in">
      <h3>${ed.program} – ${ed.institution}</h3>
      <span class="range">${ed.start} – ${ed.end}</span>
      <p>${ed.summary || ''}</p>
      ${ed.focus ? `<p style="margin-top:.35rem;font-size:.7rem;letter-spacing:.5px;text-transform:uppercase;color:var(--color-text-alt);">Enfoque: ${ed.focus.join(', ')}</p>` : ''}
    </li>`).join('');
}

export function initFilters(projects) {
  if (!filtersContainer) return;
  // Obtener set único de tags
  const tags = [...new Set(projects.flatMap(p => p.stack || []))];
  filtersContainer.innerHTML = '<button class="filter-chip active" data-filter="*">Todos</button>' + tags.map(t => `<button class="filter-chip" data-filter="${t}">${t}</button>`).join('');

  filtersContainer.addEventListener('click', e => {
    if (e.target.matches('button.filter-chip')) {
      const filter = e.target.getAttribute('data-filter');
      filtersContainer.querySelectorAll('button').forEach(btn => btn.classList.toggle('active', btn === e.target));

      projectsGrid.querySelectorAll('.project-card').forEach(card => {
        if (filter === '*') { card.style.display = ''; return; }
        const tags = JSON.parse(card.dataset.tags || '[]');
        card.style.display = tags.includes(filter) ? '' : 'none';
      });
    }
  });
}
