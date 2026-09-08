import "./compass.css";

export const compass = () => `
    <svg class="deck-compass" viewBox="0 0 440 440" aria-hidden="true" focusable="false">
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
        <circle cx="365" cy="79" r="15.5" fill="#92d9b8" fill-opacity=".8" />
      </g>
      <circle cx="220" cy="220" r="137.5" fill="url(#qis-compass-disc)" />
      <g class="qis-compass-needle">
        <path d="M275 150 Q297 141 289 163 L254 242 Q250 251 240 255
          L165 290 Q143 299 150 277 L186 199 Q190 190 200 186 Z"
          fill="#006447" mask="url(#qis-compass-cutout)" />
      </g>
    </svg>
`;

export function animateCompass(element, reducedMotion) {
  if (reducedMotion) return () => {};
  const cover = element.id === 'slide-01';
  // Sur la couverture : 2,2 s de rotation, puis 2,8 s de pause, en boucle.
  const duration = cover ? 5000 : 2200;
  const moving = cover ? 2200 / duration : 1;
  const needle = [
    { transform: 'rotate(0deg)', offset: 0, easing: 'ease-in-out' },
    { transform: 'rotate(-16deg)', offset: .15 * moving, easing: 'cubic-bezier(.45, 0, .2, 1)' },
    { transform: 'rotate(374deg)', offset: .85 * moving, easing: 'ease-out' },
    { transform: 'rotate(360deg)', offset: moving },
  ];
  const orbit = [
    { transform: 'rotate(0deg)', offset: 0, easing: 'cubic-bezier(.45, 0, .2, 1)' },
    { transform: 'rotate(360deg)', offset: moving },
  ];
  if (cover) {
    needle.push({ transform: 'rotate(360deg)', offset: 1 });
    orbit.push({ transform: 'rotate(360deg)', offset: 1 });
  }
  const options = { duration, iterations: cover ? Infinity : 1 };
  const animations = [
    element.querySelector('.qis-compass-needle').animate(needle, options),
    element.querySelector('.qis-compass-orbit').animate(orbit, options),
  ];
  return () => animations.forEach(animation => animation.cancel());
}
