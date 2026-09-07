import { header, footer, journey, highlightJourney, laptop, capture, presentSteps } from './shared.js';
import './slide-07.css';

let cleanup;
export const slide07 = {
  id: 'slide-07',
  render: () => `
    ${header(7, 'Météo des SI', 'Chaque matin, <em>un état des lieux.</em>')}
    ${journey(1, 'TP & batchs')}
    <aside class="demo-copy"><span class="demo-number"></span><h2></h2><p></p><div class="demo-note"></div></aside>
    ${laptop(`${capture('qis_meteo.png', 'Météo du 7 septembre 2026 : BOAGDE / SIBOGAN et V360 / SIVISION, batchs OK, TP affichés avec un point d’interrogation.')}<div class="screen-focus weather-focus" hidden></div>`, 'Météo SI')}
    <p class="topic-note">En cas de KO, les équipes responsables renseignent l’impact constaté et les actions entreprises.</p>
    ${footer(7)}
  `,
  enter(context) {
    const el = context.element;
    const states = [
      ['01 / CHOISIR LE JOUR', 'La situation<br />du jour.', 'Le calendrier permet de consulter la Météo à une date donnée.', '<strong>Les mêmes abonnements SI</strong><br />donnent accès aux Communications et à la Météo.'],
      ['02 / LIRE LES ÉTATS', 'TP et batchs,<br />en un regard.', 'Je vérifie l’ouverture des TP et le passage des batchs pour les SI et SA de mes abonnements.', '<strong>Dans cet exemple</strong><br />Les batchs sont OK.<br />Les TP sont affichés « ? ».'],
      ['03 / ALLER AU DÉTAIL', 'Du périmètre<br />au bloc fonctionnel.', 'Pour BOAGDE / SIBOGAN, le détail affiche le job et son état : tous les blocs sont OK, 1 / 1.', '<strong>Une lecture quotidienne</strong><br />Pour G2S, tous les SI sont accessibles. Les notifications Météo restent personnalisables.'],
    ];
    cleanup = presentSteps(context, ['Lire les états TP / batchs', 'Voir les blocs fonctionnels', 'Retenir l’essentiel'], async ({ step, animate, cursor, play }) => {
      if (animate && step === 1 && !await cursor(45, 162, true)) return;
      if (animate && step === 2 && !await cursor(443, 115, true)) return;
      const [number, title, text, note] = states[step];
      highlightJourney(el, step === 0 ? 1 : 3);
      el.querySelector('.demo-number').textContent = number;
      el.querySelector('.demo-copy h2').innerHTML = title;
      el.querySelector('.demo-copy > p').textContent = text;
      el.querySelector('.demo-note').innerHTML = note;
      const focus = el.querySelector('.weather-focus');
      focus.hidden = step === 0;
      focus.classList.toggle('weather-blocks', step === 2);
      const img = el.querySelector('.capture img');
      img.style.transform = step === 2 ? 'scale(1.5)' : 'scale(1)';
      el.querySelector('.demo-cursor').style.opacity = '0';
      if (animate && step === 2) await play(img, [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }], { duration: 750 });
    });
  },
  exit() { cleanup?.(); },
};
