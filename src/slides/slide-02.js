import { qisLogo, asset, header, footer, icon, presentSteps } from './shared.js';
import './slide-02.css';

let cleanup;
export const slide02 = {
  id: 'slide-02',
  render: () => `
    ${header(2, 'Centraliser', 'L’information utile. <em>Au même endroit.</em>', 'Un point d’accès commun à l’information Qualité de Service.')}
    <div class="before-label small-label">Aujourd’hui · des informations dispersées</div>
    <div class="mail-cloud" aria-label="Informations diffusées par email">
      <div class="mail-card mail-one">${icon('mail')}<div><strong>Un incident est détecté</strong><span>Communication QdS</span></div><i></i></div>
      <div class="mail-card mail-two">${icon('mail')}<div><strong>Le point de situation</strong><span>Évolution de l’incident</span></div><i></i></div>
      <div class="mail-card mail-three">${icon('mail')}<div><strong>La météo du matin</strong><span>État des TP et des batchs</span></div><i></i></div>
    </div>
    <svg class="converging-lines" viewBox="0 0 1920 1080" aria-hidden="true"><path d="M638 448C810 448 790 557.5 1030 557.5M680 581C830 581 850 557.5 1030 557.5M638 720C820 720 790 557.5 1030 557.5"/><path class="line-arrow" d="m1015 545.5 15 12-15 12"/></svg>
    <div class="qis-destination"><div class="platform-top"><span class="small-label">Votre point de repère</span>${icon('grid')}</div><div class="platform-identity"><img class="platform-logo" src="${qisLogo}" alt="QIS — Qualité Infos Services" /><p>Une plateforme.<br />Mes informations QdS.</p></div><div class="platform-modules"><span>${icon('mail')} Communications</span><span>${icon('weather')} Météo des SI</span><span><img class="perception-logo" src="${asset('logo-perception.svg')}" alt="Perception+" /></span></div></div>
    <div class="why-takeaway"><span class="takeaway-mark"></span><p class="why-message">Des listes figées.<br /><strong>Une information à retrouver.</strong></p><p class="why-secondary">Ciblage perfectible<br />Personnalisation limitée</p></div>
    ${footer(2)}
  `,
  enter(context) {
    cleanup = presentSteps(context, ['Réunir dans QIS', 'Suivre le parcours'], ({ step }) => {
      context.element.querySelector('.before-label').textContent = step === 0 ? 'Aujourd’hui · des informations dispersées' : 'Avec QIS · un point d’accès commun';
      context.element.querySelector('.why-message').innerHTML = step === 0
        ? 'Des listes figées.<br /><strong>Une information à retrouver.</strong>'
        : 'Je consulte dans QIS.<br /><strong>Je choisis mes notifications Mail.</strong>';
      context.element.querySelector('.why-secondary').innerHTML = step === 0
        ? 'Ciblage perfectible<br />Personnalisation limitée'
        : 'Des informations centralisées<br />Un accès selon mes abonnements';
    });
  },
  exit() { cleanup?.(); },
};
