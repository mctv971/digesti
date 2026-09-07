import { asset, header, footer, icon, presentSteps } from './shared.js';
import './slide-08.css';

let cleanup;
export const slide08 = {
  id: 'slide-08',
  render: () => `
    ${header(8, 'L’essentiel', 'Votre information QdS. <em>À portée de main.</em>')}
    <div class="recap-intro"><img class="recap-qis" src="${asset('logo-qis.png')}" alt="QIS — Qualité Infos Services" /><h2>Un point de repère.<br />Quatre réflexes.</h2><p>Une plateforme commune pour retrouver l’information utile à mes activités.</p><div class="recap-symbol" aria-hidden="true">${icon('branch')}</div></div>
    <ol class="recap-actions"><li><span>01</span><div><h2>Consulter</h2><p>Les informations des périmètres auxquels je suis abonné.</p></div>${icon('branch')}</li><li><span>02</span><div><h2>Suivre</h2><p>Les communications et l’évolution des incidents.</p></div>${icon('mail')}</li><li><span>03</span><div><h2>Vérifier</h2><p>La situation quotidienne des TP et des batchs.</p></div>${icon('weather')}</li><li><span>04</span><div><h2>Choisir</h2><p>Mes notifications Mail, séparément pour Communications et Météo.</p></div>${icon('bell')}</li></ol>
    <div class="recap-banner"><p>Mes abonnements ouvrent <strong>l’accès.</strong><br />Mes préférences règlent <strong>les notifications.</strong></p><span>Une information fiable<br />au service de nos activités.</span></div>
    ${footer(8)}
  `,
  enter(context) {
    cleanup = presentSteps(context, ['Fin du parcours'], ({ play }) => {
      context.element.querySelectorAll('.recap-actions li').forEach((item, i) => {
        play(item, [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { delay: i * 100, fill: 'backwards' });
      });
      context.element.querySelector('[data-next]').disabled = true;
    });
  },
  exit() { cleanup?.(); },
};
