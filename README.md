# Portafolio Web

Portafolio moderno, accesible y modular en HTML/CSS/JS sin frameworks pesados.

## Características
- Diseño responsive mobile-first
- Modo claro/oscuro persistente
- Datos dinámicos desde archivos JSON (`data/*.json`)
- Filtros de proyectos por stack
- Timeline de experiencia
- Validación básica de formulario (simulada)
- Componente typewriter simple
- Accesibilidad: landmarks, labels, contraste, focos visibles

## Estructura
```
index.html
assets/
  css/
    reset.css
    styles.css
  js/
    dataLoader.js
    renderers.js
    main.js
data/
  skills.json
  projects.json
  experience.json
```

## Uso
Abrir `index.html` directamente en el navegador (o servir con un server estático para evitar problemas de CORS con `fetch`).

### Servidor simple (PowerShell)
```powershell
# Python
python -m http.server 5173
# Node (si tienes npx)
npx serve . -l 5173
```
Luego visita: http://localhost:5173

## Personalización rápida
- Reemplaza textos de `index.html` (hero, sobre mí, enlaces sociales)
- Actualiza imágenes en `assets/images/`
- Añade / edita entries en `data/*.json`
- Ajusta colores en `:root` dentro de `assets/css/styles.css`
- Cambia las palabras del efecto typewriter en `assets/js/main.js`

## Futuras mejoras sugeridas
- Integrar bundler ligero (Vite) y modularizar más
- Añadir internacionalización (i18n)
- Implementar envío real de formulario (API / Formspree / EmailJS)
- Agregar test de accesibilidad automatizado (axe)
- Optimizar imágenes (WebP/AVIF) y añadir lazy loading

## Licencia
MIT
