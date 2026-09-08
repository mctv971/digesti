import './slide-01.css';

export const slide01 = {
  id: 'slide-01',
  render: () => `
    <div class="qis-halo" aria-hidden="true"></div>
    <p class="qis-eyebrow">PPF / QDS</p>
    <div class="qis-accent" aria-hidden="true"></div>
    <h1 class="qis-title"><span>QIS -</span> Qualité Infos Services</h1>
    <h2 class="qis-subtitle">DIGEST-SI</h2>
    <ul class="qis-topics" aria-label="Thématiques">
      <li>Communications</li>
      <li>Abonnements</li>
      <li>Météo des SI</li>
      <li>Perception+</li>
    </ul>
    <p class="qis-signature">Une information fiable<br />Au service de nos activités</p>
    <img class="qis-logo" src="${import.meta.env.BASE_URL}assets/logo-g2s-blanc.svg" alt="G2S" />
  `,
};
