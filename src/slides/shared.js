import './shared.css';

export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const paths = {
  mail: '<rect x="3" y="5" width="26" height="22" rx="4"/><path d="m4 8 12 9L28 8"/>',
  grid: '<rect x="4" y="4" width="9" height="9" rx="2"/><rect x="19" y="4" width="9" height="9" rx="2"/><rect x="4" y="19" width="9" height="9" rx="2"/><rect x="19" y="19" width="9" height="9" rx="2"/>',
  user: '<circle cx="16" cy="10" r="5"/><path d="M5 28v-3a11 11 0 0 1 22 0v3"/>',
  weather: '<path d="M9 25a7 7 0 1 1 1-14 9 9 0 0 1 17 4 5 5 0 0 1-1 10Z"/><path d="M7 3v3M1 8l3 2M18 3l-2 3"/>',
  bell: '<path d="M5 23h22l-3-5v-6a8 8 0 0 0-16 0v6ZM12 27a4 4 0 0 0 8 0"/>',
  check: '<path d="m6 16 7 7L27 8"/>',
  arrow: '<path d="M5 16h22M19 8l8 8-8 8"/>',
  branch: '<rect x="11" y="3" width="10" height="8" rx="2"/><path d="M16 11v7M6 23v-5h20v5"/><rect x="2" y="23" width="8" height="6" rx="1"/><rect x="22" y="23" width="8" height="6" rx="1"/>',
};

export function icon(name, className = '') {
  return `<svg class="line-icon ${className}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
}

export function header(number, label, title, description = '') {
  return `<header class="slide-heading"><p class="eyebrow"><span>${String(number).padStart(2, '0')}</span> / ${label}</p><h1>${title}</h1>${description ? `<p class="lead">${description}</p>` : ''}</header>`;
}

export function footer(number) {
  return `<footer class="slide-footer"><span class="footer-brand">QIS <span>/</span> LE PARCOURS ABONNÉ</span>
    <nav class="step-controls" aria-label="Navigation de la présentation">
      <button class="back-button" data-prev aria-label="Étape précédente">←</button>
      <span class="step-dots" aria-hidden="true"></span>
      <button class="next-button" data-next>Continuer ${icon('arrow')}</button>
      <span class="keyboard-hint">← → / Espace</span>
    </nav><span class="slide-counter">${String(number).padStart(2, '0')} / 08</span>
    <img class="footer-logo" src="${asset('logo-g2s-couleur.svg')}" alt="G2S" />
  </footer>`;
}

export function journey(active, origin = 'Origine') {
  const labels = [origin, 'QIS', 'Mes abonnements', 'Je consulte', 'Mes notifications'];
  return `<ol class="journey" aria-label="Parcours de l’information">${labels.map((label, i) => `<li ${i === active ? 'aria-current="step"' : ''}><span>${String(i + 1).padStart(2, '0')}</span>${label}</li>`).join('')}</ol>`;
}

export function highlightJourney(element, active) {
  element.querySelectorAll('.journey li').forEach((node, i) => {
    if (i === active) node.setAttribute('aria-current', 'step');
    else node.removeAttribute('aria-current');
  });
}

export function laptop(content, label) {
  return `<div class="laptop"><div class="laptop-frame"><div class="laptop-camera" aria-hidden="true"></div>
    <div class="screen"><div class="screen-bar"><span class="screen-dot"></span><strong>QIS</strong><span class="screen-label">${label}</span><span class="subscriber-label">Vue abonné</span></div>
      <div class="screen-viewport">${content}<svg class="demo-cursor" viewBox="0 0 42 48" aria-hidden="true"><circle class="cursor-ring" cx="4" cy="4" r="15"/><path d="M4 4v34l9-9 7 15 7-4-7-14 14-1Z" fill="#153d33" stroke="white" stroke-width="2.5" stroke-linejoin="round"/></svg></div>
    </div></div><div class="laptop-base" aria-hidden="true"><span></span></div></div>`;
}

export function capture(file, alt, classes = 'crop-app') {
  return `<div class="capture ${classes}"><img src="${asset(`qis/${file}`)}" alt="${alt}" draggable="false" /></div>`;
}

// Les quelques éléments répétés des démonstrations partagent le même lifecycle.
// Chaque slide conserve son contenu, ses étapes et ses styles spécifiques.
export function presentSteps(context, labels, render) {
  const { element, reducedMotion } = context;
  const events = new AbortController();
  const animations = new Set();
  const nextButton = element.querySelector('[data-next]');
  const dots = element.querySelector('.step-dots');
  let step = 0;
  let busy = false;
  let disposed = false;
  let generation = 0;

  const cancel = () => {
    animations.forEach((animation) => animation.cancel());
    animations.clear();
  };

  async function play(target, frames, options = {}) {
    if (!target || disposed) return false;
    if (reducedMotion) return true;
    const current = generation;
    const animation = target.animate(frames, { duration: 600, easing: 'cubic-bezier(.2,.7,.2,1)', ...options });
    animations.add(animation);
    try {
      await animation.finished;
      return !disposed && current === generation;
    } catch {
      return false;
    } finally {
      animations.delete(animation);
    }
  }

  async function cursor(x, y, click = false) {
    const target = element.querySelector('.demo-cursor');
    if (!target) return true;
    const from = target.style.transform || 'translate(80px, 420px)';
    const to = `translate(${x}px, ${y}px)`;
    target.style.opacity = '1';
    target.style.transform = to;
    if (!await play(target, [{ transform: from }, { transform: to }])) return false;
    if (click) return play(target.querySelector('.cursor-ring'), [
      { opacity: 0.8, transform: 'scale(.4)' },
      { opacity: 0, transform: 'scale(1.8)' },
    ], { duration: 250 });
    return true;
  }

  function show(target, animate) {
    cancel();
    const current = ++generation;
    const previous = step;
    step = target;
    element.dataset.step = step;
    dots.innerHTML = labels.map((_, i) => `<i class="${i === step ? 'active' : ''}"></i>`).join('');
    nextButton.innerHTML = `${labels[step]} ${icon('arrow')}`;
    busy = true;
    element.setAttribute('aria-busy', 'true');
    Promise.resolve(render({ step, previous, animate: animate && !reducedMotion, play, cursor }))
      .catch((error) => { if (!disposed) console.error(error); })
      .finally(() => {
        if (current !== generation || disposed) return;
        busy = false;
        element.setAttribute('aria-busy', 'false');
      });
  }

  context.nextStep = () => {
    if (busy) return true;
    if (step === labels.length - 1) return false;
    show(step + 1, true);
    return true;
  };
  context.prevStep = () => {
    if (step === 0) return false;
    show(step - 1, false);
    return true;
  };
  element.querySelector('[data-next]').addEventListener('click', context.next, { signal: events.signal });
  element.querySelector('[data-prev]').addEventListener('click', context.prev, { signal: events.signal });
  show(0, false);
  play(element.querySelector('.slide-heading'), [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }]);

  return () => {
    disposed = true;
    generation++;
    cancel();
    events.abort();
    delete context.nextStep;
    delete context.prevStep;
  };
}
