import './styles.css';
import { createDeck } from './deck/deck.js';
import { slides } from './deck/slides.js';

const stage = document.querySelector('#stage');

function fitStage() {
  const scale = Math.min(
    window.innerWidth / stage.offsetWidth,
    window.innerHeight / stage.offsetHeight,
  );
  stage.style.setProperty('--stage-scale', scale);
}

fitStage();
window.addEventListener('resize', fitStage);

// API publique : next(), prev(), goTo(index). Les index commencent à 0.
export const deck = createDeck(stage, slides);
window.deck = deck;

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    deck.destroy();
    window.removeEventListener('resize', fitStage);
    delete window.deck;
  });
}
