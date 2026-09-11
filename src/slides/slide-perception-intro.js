import { header, footer, icon, qisLogo, presentSteps } from './shared.js';
import { perceptionBrand, perceptionRail } from './perception-shared.js';

let cleanup;
export const slidePerceptionIntro = {
  id: 'slide-perception-intro',
  render: () => `
    ${header(10, 'Perception+ · Le sens', 'La qualité mesurée. <em>La qualité perçue.</em>')}
    ${perceptionRail(0)}
    <div class="perception-story">
      <section class="perception-chapter perception-compare">
        <article class="quality-measured"><span class="small-label">Le regard des indicateurs</span><div class="quality-symbol">${icon('branch')}</div><h2>Mesurer la<br />disponibilité.</h2><p>Suivre les applications et le respect des engagements de disponibilité pris avec les entités.</p><span class="quality-tag">Qualité de service mesurée</span></article>
        <span class="quality-plus" aria-hidden="true">+</span>
        <article class="quality-perceived"><span class="small-label">Le regard des entités</span><div class="quality-symbol">${icon('user')}</div><h2>Comprendre<br />le vécu.</h2><p>Recueillir l’expérience du service : l’impact sur l’activité et le ressenti des utilisateurs.</p><span class="quality-tag">Qualité de service perçue</span></article>
        <p class="perception-statement">Deux regards complémentaires sur <strong>une même qualité de service.</strong></p>
      </section>
      <section class="perception-chapter perception-workshops" hidden>
        <div class="workshop-panel">
          <div class="workshop-origin"><div class="workshop-pilots"><strong class="workshop-count">3</strong><span>caisses<br />pilotes</span></div><div><span class="small-label">Conçu avec le terrain</span><h2>Des ateliers Speed Boat</h2><p>Pour concevoir une saisie<br />moderne et plus simple.</p></div></div>
          <div class="workshop-path"><div>${icon('user')}<span>Écouter<br />les besoins</span></div>${icon('arrow', 'workshop-link')}<div>${icon('branch')}<span>Concevoir<br />ensemble</span></div>${icon('arrow', 'workshop-link')}<div>${icon('check')}<span>Faciliter<br />la saisie</span></div></div>
          <div class="workshop-result"><span class="workshop-delivery" aria-hidden="true">${icon('arrow')}</span>${perceptionBrand()}<p>La voix des entités,<br /><strong>directement dans QIS.</strong></p><img class="workshop-qis" src="${qisLogo}" alt="QIS — Qualité Infos Services" /></div>
        </div>
        <p class="perception-statement">Un cadre commun. <strong>Le ressenti reste celui de l’entité.</strong></p>
      </section>
    </div>
    ${footer(10)}
  `,
  enter(context) {
    const chapters = [...context.element.querySelectorAll('.perception-chapter')];
    cleanup = presentSteps(context, ['Construire avec les caisses', 'Découvrir la saisie'], async ({ step, play }) => {
      chapters.forEach((chapter, i) => { chapter.hidden = i !== step; });
      await play(chapters[step], [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 550 });
    });
  },
  exit() { cleanup?.(); },
};
