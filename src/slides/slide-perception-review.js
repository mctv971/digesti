import { header, footer, laptop, icon, presentSteps } from './shared.js';
import { perceptionRail, perceptionAside, perceptionScreen, setPerceptionCopy, pointAtPerception, showPerceptionScreen } from './perception-shared.js';

const map = '3_perception_visu.png';
const hover = '4_perception_visu_hover.png';
const detail = '5_perception_visu_gne.png';
const mapAlt = 'Visualisation d’une période clôturée : carte des caisses et synthèse des météos perçues.';
const detailAlt = 'Exemple de synthèse hebdomadaire de la caisse GGE : ressenti quotidien, incidents, processus métier et commentaires. Période clôturée, saisies verrouillées.';
let cleanup;
export const slidePerceptionReview = {
  id: 'slide-perception-review',
  render: () => `
    ${header(12, 'Perception+ · La visualisation', 'Du ressenti à <em>une vision partagée.</em>')}
    ${perceptionRail(2)}${perceptionAside()}
    ${laptop(perceptionScreen(map, mapAlt), 'Perception+ / Visualisation')}
    <p class="perception-principle"><strong>Les périodes clôturées restent consultables.</strong> Un historique commun pour préparer les échanges.</p>
    <section class="perception-benefits" hidden>
      <div class="perception-convergence"><div><span class="small-label">Les indicateurs</span><h2>Qualité<br />mesurée</h2><p>Disponibilité et engagements</p></div><span class="convergence-link" aria-hidden="true">⇄</span><div><span class="small-label">La voix des entités</span><h2>Qualité<br />perçue</h2><p>Ressenti et impact sur l’activité</p></div></div>
      <p class="convergence-purpose"><span>La perspective</span> Croiser ces deux regards pour <strong>comprendre les écarts.</strong></p>
      <div class="perception-benefit-row"><article>${icon('grid')}<h3>Conserver l’historique</h3><p>Retrouver les périodes et suivre l’évolution du ressenti.</p></article><article>${icon('branch')}<h3>Consolider les rapports</h3><p>Disposer de retours structurés dans un cadre commun.</p></article><article>${icon('user')}<h3>Structurer les échanges</h3><p>Préparer les points avec les entités à partir de leur vécu.</p></article></div>
    </section>
    ${footer(12)}
  `,
  enter(context) {
    const el = context.element;
    const events = new AbortController();
    el.querySelector('.perception-hotspot').addEventListener('click', context.next, { signal: events.signal });
    el.querySelector('.subscriber-label').textContent = 'Périodes clôturées';
    const states = [
      { file: map, alt: mapAlt, hotspot: [40.5, 35, 8.5, 18, 'Explorer la région sur la carte'], title: 'Une période close.<br />Une vue d’ensemble.', text: 'Une fois clôturée, la période rejoint l’historique. La carte récapitule le ressenti des caisses pour la période choisie.', note: '<strong>Du collectif au détail</strong><br />La carte est interactive : chaque région donne accès au retour d’une caisse.' },
      { file: hover, alt: 'La région nord-est est mise en évidence sur la carte interactive.', zoom: [1.22, 11, 15], hotspot: [40.5, 35, 8.5, 18, 'Ouvrir la synthèse de la caisse'], click: [.442, .433], title: 'Une région.<br />Un accès au détail.', text: 'Le survol met la région en évidence. Un clic ouvre la synthèse de la caisse pour cette période.', note: '<strong>Une navigation directe</strong><br />De la météo globale aux informations saisies par l’entité.' },
      { file: detail, alt: detailAlt, click: [.442, .433], title: 'La semaine,<br />dans son contexte.', text: 'Le détail réunit le ressenti global, les météos quotidiennes, les incidents, les processus et les commentaires.', note: '<strong>Période clôturée</strong><br />Les saisies sont verrouillées et restent consultables.' },
      { file: detail, alt: detailAlt, zoom: [1.2, 16, 16], title: 'Comprendre ce qui<br />a marqué l’activité.', text: 'Les incidents et les commentaires donnent du contexte aux météos. Ils permettent de préparer un échange concret avec la caisse.', note: '<strong>Un support aux points réguliers</strong><br />Retrouver les difficultés et les mettre en discussion avec l’entité.' },
    ];
    const dispose = presentSteps(context, ['Explorer la carte', 'Ouvrir la synthèse', 'Lire les détails', 'Ce que cela nous apporte', 'Voir la trajectoire'], async ({ step, animate, cursor, play }) => {
      const summary = step === 4;
      if (!summary && animate && states[step].click && !await pointAtPerception(el, cursor, ...states[step].click, step === 2)) return;
      el.querySelector('.laptop').hidden = summary;
      el.querySelector('.demo-copy').hidden = summary;
      el.querySelector('.perception-principle').hidden = summary;
      el.querySelector('.perception-benefits').hidden = !summary;
      if (summary) {
        await play(el.querySelector('.perception-benefits'), [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }]);
        return;
      }
      const state = states[step];
      setPerceptionCopy(el, `${String(step + 1).padStart(2, '0')} / VISUALISATION`, state.title, state.text, state.note);
      await showPerceptionScreen(el, state, animate, play);
    });
    cleanup = () => { dispose(); events.abort(); };
  },
  exit() { cleanup?.(); },
};
