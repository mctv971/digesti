import { header, footer, presentSteps } from './shared.js';
import { perceptionRail, perceptionAsset } from './perception-shared.js';

let cleanup;
export const slidePerceptionEntry = {
  id: 'slide-perception-entry',
  render: () => `
    ${header(11, 'Perception+ · La saisie', 'L’entité exprime <em>son expérience.</em>')}
    ${perceptionRail(1)}
    <figure class="perception-annotated-screen"><img src="${perceptionAsset('1_perception_saisie_principal.png')}" alt="Écran principal de saisie de la caisse GNE : période en cours, jours, incidents, météo des processus métier et commentaire." /></figure>
    <svg class="perception-annotation-arrows" viewBox="0 0 1920 1080" aria-hidden="true">
      <defs><marker id="perception-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1L8 5L1 9" /></marker></defs>
      <path d="M365 424H393V326H579V444H590" />
      <path d="M365 733H525Q545 733 545 713V682H590" />
      <path d="M1532 437H1510Q1495 437 1495 457V548H1447" />
      <path d="M1532 642H1207" />
      <path d="M1532 845H1420" />
    </svg>
    <ol class="perception-annotations">
      <li class="annotation-period"><span>1</span><h2>Ma caisse,<br />ma période</h2><p>Je ne vois et ne renseigne que la période ouverte de ma caisse.</p></li>
      <li class="annotation-incidents"><span>2</span><h2>Les incidents vécus</h2><p>Je sélectionne les incidents proposés et précise le processus, le niveau d’impact et le nombre de personnes touchées.</p><strong>L’outil ne saisit pas à ma place.</strong></li>
      <li class="annotation-day"><span>3</span><h2>Le ressenti du jour</h2><p>Du jeudi au mercredi, je choisis un jour et renseigne sa météo.</p></li>
      <li class="annotation-process"><span>4</span><h2>La météo métier</h2><p>J’exprime mon ressenti par processus : soleil, éclaircies ou nuages.</p></li>
      <li class="annotation-comment"><span>5</span><h2>Les commentaires</h2><p>Je précise mon ressenti et explique les difficultés rencontrées dans l’activité.</p></li>
    </ol>
    ${footer(11)}
  `,
  enter(context) {
    // Une seule vue : les annotations restent visibles sans clic ni zoom.
    cleanup = presentSteps(context, ['Consulter les périodes closes'], () => {});
  },
  exit() { cleanup?.(); },
};
