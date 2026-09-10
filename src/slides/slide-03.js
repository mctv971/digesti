import { qisLogo, asset, header, footer, icon, presentSteps } from './shared.js';
import './slide-03.css';

let cleanup;
export const slide03 = {
  id: 'slide-03',
  render: () => `
    ${header(3, 'Comprendre le parcours', 'De l’information <em>à l’abonné.</em>', 'Communications, Météo et Ressenti des entités : un même point d’accès.')}
    <svg class="flow-links" viewBox="0 0 1920 1080" aria-hidden="true"><path class="com-link" d="M618 407H700Q748 407 748 455V542Q748 586 802 586H843"/><path class="weather-link" d="M618 586H843"/><path class="perception-link" d="M618 765H700Q748 765 748 717V630Q748 586 802 586H843"/><path class="access-link" d="M1143 586H1310m-17-13 17 13-17 13"/></svg>
    <div class="source-node source-iq"><div class="icon-tile">${icon('user')}</div><div><span class="small-label">Communications</span><h2>Équipe IQ</h2><p>Crée les communications QdS</p></div></div>
    <div class="source-node source-weather"><div class="icon-tile">${icon('weather')}</div><div><span class="small-label">Météo des SI</span><h2>États TP & batchs</h2><p>Donnent la situation quotidienne</p></div></div>
    <div class="source-node source-perception"><div class="icon-tile">${icon('user')}</div><div><img class="perception-logo" src="${asset('logo-perception.svg')}" alt="Perception+" /><h2>Entités</h2><p>Partagent leur ressenti sur les SI</p></div></div>
    <div class="flow-platform"><img src="${qisLogo}" alt="QIS — Qualité Infos Services" /><span>Centralise l’information</span></div>
    <div class="flow-subscriber"><div class="icon-tile">${icon('user')}</div><span class="small-label">Mon rôle</span><h2>Abonné</h2><p>Je consulte les informations<br />de mes périmètres.</p></div>
    <span class="access-label">Selon mes abonnements</span>
    <div class="flow-caption" aria-live="polite"></div>
    ${footer(3)}
  `,
  enter(context) {
    const captions = [
      '<span>01</span><p><strong>Les Communications suivent les événements QdS.</strong><br />Détection, évolution et résolution d’un incident.</p>',
      '<span>02</span><p><strong>La Météo donne une vision quotidienne des SI et SA.</strong><br />En cas de KO, les équipes responsables précisent l’impact et les actions.</p>',
      '<span>03</span><p><strong>Perception+ fait remonter le ressenti des entités.</strong><br />Leur expérience des SI complète les Communications et la Météo.</p>',
      '<span>04</span><p><strong>Mes abonnements définissent ce que je peux consulter.</strong><br />Je personnalise les notifications de mes Communications et de ma Météo.</p>',
    ];
    cleanup = presentSteps(context, ['Voir le parcours Météo', 'Voir le parcours Perception+', 'Passer côté abonné', 'Comprendre la solution'], ({ step }) => {
      context.element.querySelector('.flow-caption').innerHTML = captions[step];
    });
  },
  exit() { cleanup?.(); },
};
