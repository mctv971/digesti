import { header, footer, icon, qisLogo, presentSteps } from './shared.js';
import { perceptionAsset, perceptionBrand, perceptionRail } from './perception-shared.js';

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
      <section class="perception-chapter perception-rhythm" hidden>
        <span class="small-label">Un rendez-vous régulier avec les entités</span><h2>Une semaine de vécu.<br /><em>Une base pour échanger.</em></h2>
        <div class="perception-week"><div class="week-period"><span class="week-caption">Période de recueil</span><ol>${['Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi'].map(day => `<li><i aria-hidden="true"></i>${day}</li>`).join('')}</ol></div><span class="week-arrow" aria-hidden="true">${icon('arrow')}</span><div class="week-collection"><span>Jeudi matin</span><strong>Collecte</strong></div></div>
        <div class="perception-meeting">${icon('user')}<div><strong>Toutes les deux semaines</strong><p>Ces retours structurent les points avec les entités et nourrissent les échanges sur la qualité de service.</p></div></div>
      </section>
      <section class="perception-chapter perception-before" hidden>
        <figure><img src="${perceptionAsset('perception_avant.png')}" alt="Trois exemples de retours actuels : extraction ServiceNow et tableaux Excel de météo, aux formats différents." /><figcaption>Exemples de retours actuellement transmis par les caisses</figcaption></figure>
        <div class="before-copy"><span class="small-label">Aujourd’hui</span><h2>Des retours utiles.<br /><em>Des formats dispersés.</em></h2><ul><li>Des fichiers Excel différents selon les caisses.</li><li>Parfois, des extractions automatiques de ServiceNow.</li><li>Une consolidation et un suivi dans le temps à faciliter.</li></ul></div>
      </section>
      <section class="perception-chapter perception-workshops" hidden>
        <div class="workshop-origin"><span class="small-label">Conçu avec le terrain</span><strong class="workshop-count">3</strong><h2>caisses pilotes</h2><p>Des ateliers <strong>Speed Boat</strong> pour concevoir une saisie moderne et plus simple.</p></div>
        <div class="workshop-path"><div>${icon('user')}<span>Écouter<br />les besoins</span></div><span aria-hidden="true">→</span><div>${icon('branch')}<span>Concevoir<br />ensemble</span></div><span aria-hidden="true">→</span><div>${icon('check')}<span>Faciliter<br />la saisie</span></div></div>
        <div class="workshop-result">${perceptionBrand()}<p>La voix des entités,<br /><strong>directement dans QIS.</strong></p><img class="workshop-qis" src="${qisLogo}" alt="QIS — Qualité Infos Services" /></div>
        <p class="perception-statement">Un cadre commun. <strong>Le ressenti reste celui de l’entité.</strong></p>
      </section>
    </div>
    ${footer(10)}
  `,
  enter(context) {
    const chapters = [...context.element.querySelectorAll('.perception-chapter')];
    cleanup = presentSteps(context, ['Le rythme du recueil', 'Voir les retours actuels', 'Construire avec les caisses', 'Découvrir la saisie'], async ({ step, play }) => {
      chapters.forEach((chapter, i) => { chapter.hidden = i !== step; });
      await play(chapters[step], [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 550 });
    });
  },
  exit() { cleanup?.(); },
};
