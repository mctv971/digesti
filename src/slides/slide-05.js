import { header, footer, journey, icon, presentSteps } from './shared.js';
import './slide-05.css';

let cleanup;
export const slide05 = {
  id: 'slide-05',
  render: () => `
    ${header(5, 'Abonnements & notifications', 'Mes accès. <em>Mes notifications.</em>')}
    ${journey(2, 'Accès définis')}
    <section class="subscription-policy" aria-label="Mes abonnements">
      <div class="policy-heading">${icon('branch')}<div><span class="small-label">Abonnement</span><h2>Ce que je peux consulter.</h2></div></div>
      <div class="policy-cards"><div class="policy-g2s"><span class="small-label">Utilisateurs G2S</span><h3>Tous les SI.<br />Tous les Domaines.</h3><p>Des abonnements par défaut pour consulter l’ensemble des informations.</p></div><div class="policy-others"><span class="small-label">Autres entités</span><h3>Les listes existantes<br />comme point de départ.</h3><p>Les abonnements sont initialisés à partir des listes de diffusion actuelles.</p></div></div>
      <div class="policy-manager">${icon('user')}<p><strong>Les gestionnaires adaptent les abonnements.</strong><br />Par utilisateur ou par groupe. L’abonné ne les ajoute ni ne les supprime lui-même.</p></div>
    </section>
    <section class="notification-choice" aria-label="Mes notifications"><div class="icon-tile">${icon('bell')}</div><span class="small-label">Notification</span><h2>Ce pour quoi<br />je souhaite être notifié.</h2><p>Je choisis moi-même, pour chaque abonnement :</p><div class="notification-options"><span>${icon('mail')} Mail</span><span>Aucune notification</span></div></section>
    <p class="subscription-takeaway">Désactiver une notification <span>≠</span> perdre l’accès à l’information.</p>
    ${footer(5)}
  `,
  enter(context) {
    cleanup = presentSteps(context, ['Voir mes abonnements'], () => {});
  },
  exit() { cleanup?.(); },
};
