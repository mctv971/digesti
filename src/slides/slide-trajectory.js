import { header, footer, presentSteps } from './shared.js';
import './slide-trajectory.css';
import perceptionLogo from '../../SOURCE/logoPerception.svg?url';

let cleanup;
export const slideTrajectory = {
  id: 'slide-trajectory',
  render: () => `
    ${header(13, 'Trajectoire 2026 — 2027', 'QIS — <em>Trajectoire et jalons</em>')}
    <div class="trajectory-track" aria-hidden="true"><span class="trajectory-progress"></span></div>
    <ol class="trajectory-milestones" aria-label="Jalons de la trajectoire QIS">
      <li class="milestone" style="--x:175px; --stem:128px"><div class="milestone-copy"><h2>Mars — Juin 2026</h2><p>Story mapping, MVP<br />et développements Lot 1</p></div><span class="milestone-stem" aria-hidden="true"></span><span class="milestone-dot" aria-hidden="true"></span></li>
      <li class="milestone" style="--x:435px; --stem:255px"><div class="milestone-copy"><h2>Juillet 2026</h2><p>Lancement du pilote<br />(GLB et Gan Ass)</p></div><span class="milestone-stem" aria-hidden="true"></span><span class="milestone-dot" aria-hidden="true"></span></li>
      <li class="milestone milestone-today" style="--x:695px; --stem:380px"><div class="milestone-copy"><h2>Juil. — Nov. 2026</h2><p>Double diffusion<br />et points d’étape</p></div><span class="milestone-stem" aria-hidden="true"></span><span class="milestone-halo" aria-hidden="true"></span><span class="milestone-dot" aria-hidden="true"></span><span class="today-label">Aujourd’hui</span></li>
      <li class="milestone" style="--x:955px; --stem:128px"><div class="milestone-copy"><h2>Octobre 2026</h2><p>Bilan et arbitrages,<br />présentation aux entités</p></div><span class="milestone-stem" aria-hidden="true"></span><span class="milestone-dot" aria-hidden="true"></span></li>
      <li class="milestone milestone-production" style="--x:1215px; --stem:255px"><div class="milestone-copy"><h2>Nov. 2026</h2><p>Mise en prod.<br /> <span class="production-products">Communication, <img src="${perceptionLogo}" alt="Perception+" /></span></p></div><span class="milestone-stem" aria-hidden="true"></span><span class="milestone-dot" aria-hidden="true"></span></li>
      <li class="milestone milestone-production" style="--x:1475px; --stem:380px"><div class="milestone-copy"><h2>Déc. 2026</h2><p>Mise en prod. Météo</p></div><span class="milestone-stem" aria-hidden="true"></span><span class="milestone-dot" aria-hidden="true"></span></li>
      <li class="milestone" style="--x:1735px; --stem:128px"><div class="milestone-copy"><h2>2027</h2><p>Lot 2 — enrichissements<br />et industrialisation</p></div><span class="milestone-stem" aria-hidden="true"></span><span class="milestone-dot" aria-hidden="true"></span></li>
    </ol>
    <div class="production-group"><span class="production-bracket" aria-hidden="true"></span><p>Mise en production</p></div>
    ${footer(13)}
  `,
  enter(context) {
    const el = context.element;
    cleanup = presentSteps(context, ['Retenir l’essentiel'], ({ play }) => {
      play(el.querySelector('.trajectory-track'), [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 950 });
      play(el.querySelector('.trajectory-progress'), [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 850, delay: 180, fill: 'backwards' });
      el.querySelectorAll('.milestone').forEach((milestone, i) => {
        const delay = 280 + i * 160;
        play(milestone.querySelector('.milestone-dot'), [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 450, delay, fill: 'backwards' });
        play(milestone.querySelector('.milestone-stem'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 650, delay: delay + 100, fill: 'backwards' });
        play(milestone.querySelector('.milestone-copy'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 550, delay: delay + 350, fill: 'backwards' });
      });
      play(el.querySelector('.today-label'), [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450, delay: 900, fill: 'backwards' });
      play(el.querySelector('.milestone-halo'), [{ opacity: .4, transform: 'scale(.85)' }, { opacity: 0, transform: 'scale(1.85)' }], { duration: 1500, delay: 1300, iterations: 2, fill: 'backwards' });
      play(el.querySelector('.production-group'), [{ opacity: 0, transform: 'translateY(-7px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, delay: 1650, fill: 'backwards' });
    });
  },
  exit() { cleanup?.(); },
};
