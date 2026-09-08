import { header, footer, journey, highlightJourney, laptop, capture, presentSteps } from './shared.js';
import './slide-07.css';

let cleanup;
export const slide07 = {
  id: 'slide-07',
  render: () => `
    ${header(7, 'Météo des SI', 'Chaque matin, <em>un état des lieux.</em>')}
    ${journey(1, 'TP & batchs')}
    <aside class="demo-copy"><span class="demo-number"></span><h2></h2><p></p><div class="demo-note"></div></aside>
    ${laptop(`${capture('qis_meteo.png', 'Météo du 1er septembre 2026 : batchs OK, 4 blocs sur 4 pour BOAGDE / SIBOGAN et 24 sur 24 pour V360 / SIVISION.', 'crop-app weather-normal')}${capture('qis_meteo_error.png', 'Exemple du 10 mars 2026 : cinq anomalies. Les gestionnaires renseignent impact et actions pour les batchs en erreur.', 'weather-error')}<div class="screen-focus weather-focus" hidden></div>`, 'Météo SI')}
    <p class="topic-note"></p>
    ${footer(7)}
  `,
  enter(context) {
    const el = context.element;
    const states = [
      ['01 / CHOISIR LE JOUR', 'La situation<br />du jour.', 'Le calendrier permet de consulter la Météo à une date donnée.', '<strong>Les mêmes abonnements SI</strong><br />donnent accès aux Communications et à la Météo.'],
      ['02 / LIRE LES ÉTATS', 'TP et batchs,<br />en un regard.', 'Je vérifie l’ouverture des TP et le passage des batchs pour les SI et SA de mes abonnements.', '<strong>Dans cet exemple</strong><br />Les batchs sont OK.<br />Les TP sont affichés « ? ».'],
      ['03 / ALLER AU DÉTAIL', 'Du périmètre<br />au bloc fonctionnel.', 'Pour BOAGDE / SIBOGAN, les quatre blocs fonctionnels sont OK. Chaque job est identifié avec son détail.', '<strong>Une lecture quotidienne</strong><br />L’état global se précise bloc par bloc.'],
      ['04 / EN CAS D’ERREUR', 'Une anomalie.<br />Un suivi à compléter.', 'Si un TP ou un batch est en erreur, les gestionnaires Météo complètent la seconde Météo.', '<strong>Autre exemple : 10 mars</strong><br />3 batchs KO pour BOAGDE, 2 pour V360.'],
      ['05 / SECONDE MÉTÉO', 'L’impact.<br />Les actions.', 'Les gestionnaires renseignent l’impact constaté et les actions entreprises, puis valident les informations.', '<strong>Dans cette capture</strong><br />BOAGDE KO depuis 6 h.<br />Action en cours par les équipes G2S.'],
    ];
    cleanup = presentSteps(context, ['Lire les états TP / batchs', 'Voir les blocs fonctionnels', 'Voir le cas en erreur', 'Comprendre la seconde Météo', 'Prolonger avec le BAR'], async ({ step, animate, cursor, play }) => {
      if (animate && step === 1 && !await cursor(360, 107, true)) return;
      if (animate && step === 2 && !await cursor(445, 90, true)) return;
      if (animate && step === 4 && !await cursor(860, 150)) return;
      const [number, title, text, note] = states[step];
      highlightJourney(el, step === 0 ? 1 : 3);
      el.querySelector('.demo-number').textContent = number;
      el.querySelector('.demo-copy h2').innerHTML = title;
      el.querySelector('.demo-copy > p').textContent = text;
      el.querySelector('.demo-note').innerHTML = note;
      el.querySelector('.topic-note').textContent = step >= 3 ? 'La saisie relève des gestionnaires Météo. L’abonné consulte les informations de ses périmètres.' : '';
      el.querySelector('.subscriber-label').textContent = step >= 3 ? 'Vue gestionnaire Météo' : 'Vue abonné';
      el.querySelector('.weather-normal').hidden = step >= 3;
      el.querySelector('.weather-error').hidden = step < 3;
      const focus = el.querySelector('.weather-focus');
      focus.hidden = step === 0 || step === 3;
      focus.classList.toggle('weather-blocks', step === 2);
      focus.classList.toggle('weather-impact', step === 4);
      const normal = el.querySelector('.weather-normal img');
      const error = el.querySelector('.weather-error img');
      normal.style.transform = step === 2 ? 'scale(1.5)' : 'scale(1)';
      error.style.transform = step === 4 ? 'scale(1.4)' : 'scale(1)';
      el.querySelector('.demo-cursor').style.opacity = '0';
      if (animate && (step === 2 || step === 4)) await play(step === 2 ? normal : error, [{ transform: 'scale(1)' }, { transform: step === 2 ? 'scale(1.5)' : 'scale(1.4)' }], { duration: 750 });
    });
  },
  exit() { cleanup?.(); },
};
