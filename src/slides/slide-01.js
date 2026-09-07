import './slide-01.css';

const animations = [];

export const slide01 = {
  id: 'slide-01',
  render: () => `
    <div class="qis-halo" aria-hidden="true"></div>
    <p class="qis-eyebrow">PPF / QDS</p>
    <div class="qis-accent" aria-hidden="true"></div>
    <h1 class="qis-title"><span>QIS -</span> Qualité Infos Services</h1>
    <h2 class="qis-subtitle">DIGEST-SI</h2>
    <ul class="qis-topics" aria-label="Thématiques">
      <li>Communications</li>
      <li>Abonnements</li>
      <li>Météo des SI</li>
      <li>Perception+</li>
    </ul>
    <svg class="qis-compass" viewBox="0 0 440 440" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="qis-compass-disc" x1="0" y1="0" x2="0.4" y2="1">
          <stop stop-color="#91d8b1" stop-opacity=".84" />
          <stop offset="1" stop-color="#66bb9e" stop-opacity=".58" />
        </linearGradient>
        <linearGradient id="qis-compass-orbit" x1="0" y1="1" x2="1" y2="0">
          <stop stop-color="#8bd5b2" stop-opacity="0" />
          <stop offset=".55" stop-color="#8bd5b2" stop-opacity=".5" />
          <stop offset="1" stop-color="#a5e9c4" stop-opacity=".75" />
        </linearGradient>
        <mask id="qis-compass-cutout">
          <rect width="440" height="440" fill="white" />
          <circle cx="220" cy="220" r="17.5" fill="black" />
        </mask>
      </defs>
      <g class="qis-compass-orbit">
        <path d="M323 43 A205 205 0 1 0 398 119" fill="none"
          stroke="url(#qis-compass-orbit)" stroke-width="4" stroke-linecap="round" />
        <path d="M393 124 L398 118 L401 128" fill="none"
          stroke="#92d9b8" stroke-opacity=".65" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="365" cy="79" r="15.5" fill="#92d9b8" fill-opacity=".8" />
      </g>
      <circle cx="220" cy="220" r="137.5" fill="url(#qis-compass-disc)" />
      <g class="qis-compass-needle">
        <path d="M275 150 Q297 141 289 163 L254 242 Q250 251 240 255
          L165 290 Q143 299 150 277 L186 199 Q190 190 200 186 Z"
          fill="#006447" mask="url(#qis-compass-cutout)" />
      </g>
    </svg>
    <p class="qis-signature">Une information fiable<br />Au service de nos activités</p>
    <img class="qis-logo" src="${import.meta.env.BASE_URL}assets/logo-g2s-blanc.svg" alt="G2S" />
  `,
  enter({ element, reducedMotion }) {
    if (reducedMotion) return;
    // Un tour dès l'entrée, puis environ 3,5 secondes de pause entre deux tours.
    animations.push(element.querySelector('.qis-compass-needle').animate(
      [
        { transform: 'rotate(0deg)', offset: 0, easing: 'ease-in-out' },
        { transform: 'rotate(-16deg)', offset: 0.06, easing: 'cubic-bezier(.45, 0, .2, 1)' },
        { transform: 'rotate(374deg)', offset: 0.3, easing: 'ease-out' },
        { transform: 'rotate(360deg)', offset: 0.4 },
        { transform: 'rotate(360deg)', offset: 1 },
      ],
      { duration: 6000, iterations: Infinity },
    ));
    animations.push(element.querySelector('.qis-compass-orbit').animate(
      [
        { transform: 'rotate(0deg)', offset: 0, easing: 'cubic-bezier(.45, 0, .2, 1)' },
        { transform: 'rotate(360deg)', offset: 0.42 },
        { transform: 'rotate(360deg)', offset: 1 },
      ],
      { duration: 6000, iterations: Infinity },
    ));
  },
  exit() {
    animations.forEach((animation) => animation.cancel());
    animations.length = 0;
  },
};
