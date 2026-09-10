import perceptionLogo from '../../SOURCE/logoPerception.svg?url';
import './perception.css';

// Les deux démonstrations partagent les mêmes captures et le même cadrage.
const screens = import.meta.glob('../../SOURCE/screenPerception/*.png', { eager: true, query: '?url', import: 'default' });
export const perceptionAsset = (file) => screens[`../../SOURCE/screenPerception/${file}`];
export const perceptionBrand = () => `<img class="perception-brand" src="${perceptionLogo}" alt="Perception+" />`;
export const perceptionRail = (active) => `<ol class="perception-rail" aria-label="Parcours Perception+">${['Écouter les entités', 'Saisir le vécu', 'Partager la synthèse'].map((label, i) => `<li ${i === active ? 'aria-current="step"' : ''}><span>0${i + 1}</span>${label}</li>`).join('')}</ol>${perceptionBrand()}`;
export const perceptionAside = () => '<aside class="demo-copy"><span class="demo-number"></span><h2></h2><p></p><div class="demo-note"></div></aside>';
export const perceptionScreen = (file, alt) => `<div class="perception-canvas"><img class="perception-image" src="${perceptionAsset(file)}" alt="${alt}" draggable="false" /><button class="screen-action perception-hotspot" hidden></button></div>`;

export function setPerceptionCopy(el, number, title, text, note) {
  el.querySelector('.demo-number').textContent = number;
  el.querySelector('.demo-copy h2').innerHTML = title;
  el.querySelector('.demo-copy > p').textContent = text;
  el.querySelector('.demo-note').innerHTML = note;
}

// Coordonnées relatives à la capture : le clic reste juste après un zoom.
export function pointAtPerception(el, cursor, x, y, click = true) {
  const viewport = el.querySelector('.screen-viewport');
  const area = viewport.getBoundingClientRect();
  const screen = el.querySelector('.perception-canvas').getBoundingClientRect();
  const scale = area.width / viewport.clientWidth;
  return cursor((screen.x + screen.width * x - area.x) / scale, (screen.y + screen.height * y - area.y) / scale, click);
}

export async function showPerceptionScreen(el, { file, alt, zoom = [1, 0, 0], hotspot }, animate, play) {
  const canvas = el.querySelector('.perception-canvas');
  const img = el.querySelector('.perception-image');
  const sameImage = img.getAttribute('src') === perceptionAsset(file);
  const from = sameImage ? canvas.style.transform || 'none' : 'none';
  const [scale, x, y] = zoom;
  const to = `translate(${-x * scale}%, ${-y * scale}%) scale(${scale})`;
  img.src = perceptionAsset(file);
  img.alt = alt;
  canvas.style.transform = to;
  const button = el.querySelector('.perception-hotspot');
  button.hidden = !hotspot;
  if (hotspot) {
    const [left, top, width, height, label] = hotspot;
    Object.assign(button.style, { left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` });
    button.setAttribute('aria-label', label);
  }
  el.querySelector('.demo-cursor').style.opacity = '0';
  if (!animate) return true;
  if (from !== to) return play(canvas, [{ transform: from }, { transform: to }], { duration: 800 });
  if (!sameImage) return play(canvas, [{ opacity: .25 }, { opacity: 1 }], { duration: 300 });
  return true;
}
