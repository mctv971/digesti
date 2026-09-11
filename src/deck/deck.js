import { compass, animateCompass } from "./compass.js";

export function createDeck(stage, slides) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = -1;
  let element;
  let context;
  let cleanupCompass;
  let paginationEvents;

  function indexFromHash() {
    const hash = window.location.hash;
    if (!/^#[1-9]\d*$/.test(hash)) return 0;
    const value = Number(hash.slice(1)) - 1;
    return Number.isSafeInteger(value) && value < slides.length ? value : 0;
  }

  function syncHash() {
    const hash = `#${index + 1}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }

  function leave() {
    if (index < 0) return;
    cleanupCompass?.();
    paginationEvents?.abort();
    slides[index].exit?.(context);
    element.remove();
  }

  function enter(entryStep = 0) {
    const slide = slides[index];
    element = document.createElement('section');
    element.id = slide.id;
    element.className = 'slide';
    element.setAttribute('aria-label', `Slide ${index + 1} sur ${slides.length}`);
    element.innerHTML = slide.render() + compass();
    stage.append(element);
    // Le DOM est recréé à chaque entrée pour repartir d'un état propre.
    context = { element, reducedMotion: motion.matches, next, prev, entryStep };
    slide.enter?.(context);
    cleanupCompass = animateCompass(element, motion.matches);
    setupPagination();
  }

  function setupPagination() {
    const form = element.querySelector('.slide-counter');
    if (!form) return;
    paginationEvents = new AbortController();
    const options = { signal: paginationEvents.signal };
    const input = form.querySelector('.slide-number');
    const reset = () => {
      input.value = String(index + 1).padStart(2, '0');
      input.setCustomValidity('');
    };
    reset();
    input.setAttribute('aria-label', `Numéro de slide, de 1 à ${slides.length}`);
    form.querySelector('.slide-total').textContent = `/ ${String(slides.length).padStart(2, '0')}`;
    input.addEventListener('focus', () => input.select(), options);
    input.addEventListener('input', () => input.setCustomValidity(''), options);
    input.addEventListener('blur', reset, options);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { reset(); input.blur(); }
    }, options);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      const target = Number(value);
      if (!/^\d+$/.test(value) || !Number.isSafeInteger(target) || target < 1 || target > slides.length) {
        input.setCustomValidity(`Saisissez un numéro entre 1 et ${slides.length}.`);
        input.reportValidity();
        return;
      }
      input.blur();
      goTo(target - 1);
    }, options);
  }

  function goTo(target, { entryStep = 0 } = {}) {
    if (!Number.isInteger(target)) return;
    const nextIndex = Math.max(0, Math.min(target, slides.length - 1));
    if (nextIndex !== index) {
      leave();
      index = nextIndex;
      enter(entryStep);
    }
    syncHash();
  }

  function onKeyDown(event) {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const control = event.target.closest('input, textarea, select, button, a, [contenteditable]');
    // Les flèches restent disponibles après un clic sur la navigation ou la démo.
    // Espace conserve l'activation native des boutons ; les champs restent libres.
    if (control && (!control.closest('.step-controls, .screen-action') || event.key === ' ')) return;

    switch (event.key) {
      case 'ArrowRight':
      case ' ': event.preventDefault(); next(); break;
      case 'ArrowLeft': event.preventDefault(); prev(); break;
      case 'Home': event.preventDefault(); goTo(0); break;
      case 'End': event.preventDefault(); goTo(slides.length - 1); break;
      default: return;
    }
  }

  // Les étapes internes restent manuelles. goTo() sélectionne toujours une slide.
  function next() {
    if (!context.nextStep?.()) goTo(index + 1);
  }

  function prev() {
    if (!context.prevStep?.()) goTo(index - 1, { entryStep: 'last' });
  }

  function onHashChange() {
    goTo(indexFromHash());
  }

  function onMotionChange() {
    leave();
    enter();
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('hashchange', onHashChange);
  motion.addEventListener('change', onMotionChange);
  goTo(indexFromHash());

  return {
    next,
    prev,
    goTo,
    get index() { return index; },
    destroy() {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('hashchange', onHashChange);
      motion.removeEventListener('change', onMotionChange);
      leave();
      index = -1;
    },
  };
}
