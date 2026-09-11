import { asset, header, footer, presentSteps } from './shared.js';
import './slide-architecture.css';

let cleanup;
export const slideArchitecture = {
  id: 'slide-architecture',
  render: () => `
    ${header(4, 'Architecture & démarche projet', 'Une solution construite avec vous,<br /><em>sur des technologies Microsoft</em>')}
    <section class="architecture-stack" aria-labelledby="stack-title">
      <h2 id="stack-title" class="small-label">Socle technologique</h2>
      <div class="technology-row">
        <div class="technology"><div class="technology-icons"><img src="${asset('microsoft/power-apps.svg')}" alt="" /></div><div><h3>Power Apps</h3><p>Application</p></div></div>
        <div class="technology"><div class="technology-icons"><img src="${asset('microsoft/power-automate.svg')}" alt="" /></div><div><h3>Power Automate</h3><p>Automatisation des processus</p></div></div>
        <div class="technology"><div class="technology-icons technology-pair"><img src="${asset('microsoft/dataverse.svg')}" alt="Dataverse" /><img src="${asset('microsoft/sharepoint.svg')}" alt="SharePoint" /></div><div><h3>Dataverse / SharePoint</h3><p>Gestion des données</p></div></div>
        <div class="technology"><div class="technology-icons technology-pair"><img src="${asset('microsoft/outlook.svg')}" alt="Outlook" /><img src="${asset('microsoft/teams.svg')}" alt="Teams" /></div><div><h3>Outlook / Teams</h3><p>Intégration à l’environnement de travail</p></div></div>
      </div>
    </section>
    <section class="architecture-method" aria-labelledby="method-title">
      <h2 id="method-title" class="small-label">Notre démarche projet</h2>
      <p class="architecture-intro">Une démarche en cinq étapes, construite avec les métiers.</p>
      <ol class="project-steps">
        <li class="project-step" hidden><span class="project-number">1</span><h3>Comprendre</h3><p class="project-description">Recueil des besoins et des usages</p><ul><li>Ateliers métier</li><li>Rédaction et revue des User Stories</li></ul></li>
        <li class="project-step" hidden><span class="project-number">2</span><h3>Concevoir</h3><p class="project-description">Construction de la solution avec les métiers</p><ul><li>Lancement de sprint</li><li>Validation et arbitrage des priorités sur l’application</li></ul></li>
        <li class="project-step" hidden><span class="project-number">3</span><h3>Construire</h3><p class="project-description">Développement par itérations</p><ul><li>Weekly de suivi des développements</li><li>Démonstration à chaque point d’avancement</li></ul></li>
        <li class="project-step" hidden><span class="project-number">4</span><h3>Tester ensemble</h3><p class="project-description">Validation avec les futurs utilisateurs</p><ul><li>Mail automatique avec les US à tester par le métier</li><li>Canal de discussion projet partagé entre le métier et l’équipe de développement</li><li>Test fonctionnel préalable par la BA, bouton dédié pour le retour de bug</li></ul></li>
        <li class="project-step" hidden><span class="project-number">5</span><h3>Déployer & améliorer</h3><p class="project-description">Mise en service, accompagnement et évolutions</p><ul><li>Déploiement des features par vague</li><li>Amélioration continue</li></ul></li>
      </ol>
    </section>
    <p class="architecture-takeaway">Les utilisateurs sont impliqués tout au long du projet afin de construire une solution adaptée aux besoins réels et de l’améliorer progressivement.</p>
    ${footer(4)}
  `,
  enter(context) {
    const el = context.element;
    const cards = [...el.querySelectorAll('.project-step')];
    const stride = (el.querySelector('.project-steps').clientWidth - 4 * 18) / 5 + 18;
    const takeaway = el.querySelector('.architecture-takeaway');
    cleanup = presentSteps(context, ['Comprendre', 'Concevoir', 'Construire', 'Tester ensemble', 'Déployer & améliorer', 'Consulter les communications'], async ({ step, animate, play }) => {
      const count = step;
      const target = `translateX(${(cards.length - count) * stride / 2}px)`;
      const previousTransforms = cards.map(card => card.style.transform || 'translateX(0px)');
      cards.forEach((card, i) => {
        card.hidden = i >= count;
        card.style.zIndex = i === count - 1 ? '2' : '1';
        if (!animate) card.style.transform = target;
      });
      el.querySelector('.architecture-intro').hidden = count !== 0;
      takeaway.hidden = count !== cards.length;
      if (!count || !animate) return;
      const incoming = cards[count - 1];
      const center = `translateX(${(3 - count) * stride}px)`;
      // Entrée brève au centre, puis répartition de la rangée en une demi-seconde.
      incoming.style.transform = center;
      if (!await play(incoming, [{ opacity: 0, transform: `${center} translateY(16px)` }, { opacity: 1, transform: center }], { duration: 200 })) return;
      cards.slice(0, count).forEach(card => { card.style.transform = target; });
      if (count === 1) return;
      await Promise.all(cards.slice(0, count).map((card, i) => play(card, [
        { transform: i === count - 1 ? center : previousTransforms[i] },
        { transform: target },
      ], { duration: 300 })));
    });
  },
  exit() { cleanup?.(); },
};
