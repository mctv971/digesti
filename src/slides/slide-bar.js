import { header, footer, journey, laptop, capture, presentSteps } from './shared.js';
import './slide-bar.css';

let cleanup;
export const slideBar = {
  id: 'slide-bar',
  render: () => `
    ${header(8, 'BAR · Batch Activity Report', 'Après la Météo, <em>le détail de l’activité.</em>')}
    ${journey(3, 'Météo des SI')}
    <aside class="demo-copy"><span class="demo-number"></span><h2></h2><p></p><div class="demo-note"></div></aside>
    ${laptop(`${capture('qis_bar_app.png', 'BAR, vue Tech pour CR GLBR Production : états des jobs et détail du traitement AE70.', 'bar-jobs')}${capture('qis_bar_tech.png', 'BAR, vue Flux pour CR GLBR Production : envois, réceptions, attentes et écarts.', 'bar-flows')}<button class="screen-action open-bar-flows" aria-label="Voir les flux de CR GLBR Production"></button>`, 'BAR / CR GLBR Production')}
    <p class="topic-note">Un écran par entité, avec ses environnements.<br />Exemple présenté : CR GLBR Production.</p>
    ${footer(8)}
  `,
  enter(context) {
    const el = context.element;
    const events = new AbortController();
    el.querySelector('.open-bar-flows').addEventListener('click', context.next, { signal: events.signal });
    const dispose = presentSteps(context, ['Voir les flux', 'Retenir l’essentiel'], async ({ step, animate, cursor }) => {
      if (step === 1 && animate && !await cursor(320, 94, true)) return;
      el.querySelector('.bar-jobs').hidden = step !== 0;
      el.querySelector('.bar-flows').hidden = step !== 1;
      el.querySelector('.open-bar-flows').hidden = step !== 0;
      el.querySelector('.demo-number').textContent = step === 0 ? '01 / TRAITEMENTS' : '02 / FLUX';
      el.querySelector('.demo-copy h2').innerHTML = step === 0 ? 'Les traitements,<br />en détail.' : 'Les échanges,<br />de bout en bout.';
      el.querySelector('.demo-copy > p').textContent = step === 0 ? 'Le BAR prolonge la Météo : je retrouve l’état des applications, TP et batchs, puis le détail technique des jobs.' : 'Pour la même entité, je consulte les flux envoyés et reçus, les attentes et les écarts.';
      el.querySelector('.demo-note').innerHTML = step === 0 ? '<strong>Par date et environnement</strong><br />États, début, fin, durée et message système.' : '<strong>Pour chaque flux</strong><br />Partenaire, description, volume et heure de fin.';
      el.querySelector('.demo-cursor').style.opacity = '0';
    });
    cleanup = () => { dispose(); events.abort(); };
  },
  exit() { cleanup?.(); },
};
