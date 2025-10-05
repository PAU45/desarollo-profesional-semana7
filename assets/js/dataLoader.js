// dataLoader.js - carga y renderiza datos dinámicos
import { renderSkills, renderProjects, renderExperience, initFilters, renderEducation } from './renderers.js';

async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error('Error cargando ' + path);
  return res.json();
}

export async function initData() {
  try {
    const [skills, projects, experience, education] = await Promise.all([
      fetchJSON('data/skills.json'),
      fetchJSON('data/projects.json'),
      fetchJSON('data/experience.json'),
      fetchJSON('data/education.json')
    ]);

    renderSkills(skills);
    renderProjects(projects);
  renderExperience(experience); // legacy (si hubiera experiencia futura)
  renderEducation(education);
    initFilters(projects);
  } catch (e) {
    console.error(e);
  }
}

initData();
