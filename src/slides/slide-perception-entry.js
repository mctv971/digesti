import { header, footer, laptop, presentSteps } from './shared.js';
import { perceptionRail, perceptionAside, perceptionScreen, setPerceptionCopy, pointAtPerception, showPerceptionScreen } from './perception-shared.js';

const main = '1_perception_saisie_principal.png';
const incidentList = '2_perception_saisie_p1.png';
const incident = '3_perception_saisie_inc.png';
const mainAlt = 'Saisie de la caisse GNE pour la période du 13 au 19 août : jours, incidents, météo des processus métier et commentaire.';
const incidentAlt = 'Qualification d’un incident : processus métier, impact faible à critique et nombre de personnes impactées.';
let cleanup;
export const slidePerceptionEntry = {
  id: 'slide-perception-entry',
  render: () => `
    ${header(11, 'Perception+ · La saisie', 'L’entité exprime <em>son expérience.</em>')}
    ${perceptionRail(1)}${perceptionAside()}
    ${laptop(perceptionScreen(main, mainAlt), 'Perception+ / Saisie')}
    <p class="perception-principle"><strong>L’outil propose les incidents.</strong> L’entité sélectionne, qualifie et saisit son ressenti.</p>
    ${footer(11)}
  `,
  enter(context) {
    const el = context.element;
    const events = new AbortController();
    el.querySelector('.perception-hotspot').addEventListener('click', context.next, { signal: events.signal });
    el.querySelector('.subscriber-label').textContent = 'Vue entité';
    const states = [
      { file: main, alt: mainAlt, hotspot: [35.8, 60.5, 3.5, 7, 'Consulter les incidents P1'], title: 'Ma caisse.<br />La période ouverte.', text: 'Chaque caisse ne voit et ne complète que sa propre saisie, sur la période en cours, du jeudi au mercredi.', note: '<strong>Jour par jour</strong><br />Incidents vécus, météo des processus et commentaire.' },
      { file: incidentList, alt: 'Liste des incidents P1 proposés pour le jeudi 13 août, avec un incident à consulter.', hotspot: [56, 23, 42, 13, 'Ouvrir la qualification de l’incident'], click: [.378, .635], title: 'Retrouver les incidents<br />qui me concernent.', text: 'Les incidents concernant l’entité remontent dans la plateforme. Elle choisit ceux qui ont réellement impacté son activité.', note: '<strong>Une aide à la saisie</strong><br />La présence d’un incident ne signifie pas qu’il a été pris en compte par l’entité.' },
      { file: incident, alt: incidentAlt, click: [.968, .268], title: 'Qualifier l’impact<br />sur le métier.', text: 'L’entité rattache l’incident aux processus concernés, précise la gêne vécue et le nombre de personnes impactées.', note: '<strong>Trois informations utiles</strong><br />Processus • niveau d’impact • personnes touchées.' },
      { file: incident, alt: incidentAlt, zoom: [1.6, 37.5, 37.5], title: 'De la gêne<br />au travail empêché.', text: 'Faible, modéré, élevé ou critique : le niveau d’impact précise les conséquences concrètes sur l’activité.', note: '<strong>Exemple affiché</strong><br />Communications Sortantes<br />Impact modéré • 50 à 100 personnes.' },
      { file: main, alt: mainAlt, title: 'Au-delà de l’incident,<br />le ressenti.', text: 'L’entité exprime aussi son expérience des processus métier : Santé, Sinistres, Souscription…', note: '<strong>Une lecture métier</strong><br />Le ressenti complète les informations sur les incidents.' },
      { file: main, alt: mainAlt, zoom: [1.55, 35.4, 33.5], title: 'Une météo.<br />Des mots pour expliquer.', text: 'Pour chaque processus : soleil, ciel partiellement ensoleillé ou nuage. L’entité peut aussi ajouter un commentaire à son ressenti.', note: '<strong>Comprendre l’expérience</strong><br />Ce qui a bien fonctionné, les difficultés et leurs effets sur l’activité.' },
      { file: main, alt: mainAlt, title: 'Chaque jour,<br />une vue du vécu.', text: 'Le ressenti du jour complète celui des processus. La période rassemble ces retours au fil de la semaine.', note: '<strong>L’entité garde la main</strong><br />Elle renseigne son expérience. Nous ne saisissons pas à sa place.' },
    ];
    const dispose = presentSteps(context, ['Voir les incidents', 'Qualifier l’incident', 'Voir les critères', 'Revenir au ressenti', 'Lire la météo métier', 'Voir le ressenti du jour', 'Consulter les périodes closes'], async ({ step, animate, cursor, play }) => {
      const state = states[step];
      if (animate && state.click && !await pointAtPerception(el, cursor, ...state.click)) return;
      setPerceptionCopy(el, `${String(step + 1).padStart(2, '0')} / SAISIE`, state.title, state.text, state.note);
      if (!await showPerceptionScreen(el, state, animate, play)) return;
      if (step === 6 && animate) await pointAtPerception(el, cursor, .442, .311, false);
    });
    cleanup = () => { dispose(); events.abort(); };
  },
  exit() { cleanup?.(); },
};
