import { header, footer, journey, laptop, capture, presentSteps } from './shared.js';

let cleanup;
export const slideBar = {
  id: 'slide-bar',
  render: () => `
    ${header(9, 'BAR · Batch Activity Report', 'Après la Météo, <em>le détail de l’activité.</em>')}
    ${journey(3, 'Météo des SI')}
    <aside class="demo-copy"><span class="demo-number"></span><h2></h2><p></p><div class="demo-note"></div></aside>
    ${laptop(`${capture('qis_bar_app.png', 'BAR, vue Tech pour CR GLBR Production : états des jobs et détail du traitement AE70.', 'bar-jobs')}`, 'BAR / CR GLBR Production')}
    <p class="topic-note">Un écran par entité, avec ses environnements.<br />Exemple présenté : CR GLBR Production.</p>
    ${footer(9)}
  `,
  enter(context) {
    const el = context.element;
    cleanup = presentSteps(context, ['Découvrir Perception+'], () => {
      el.querySelector('.demo-number').textContent = '01 / TRAITEMENTS';
      el.querySelector('.demo-copy h2').innerHTML = 'Les traitements,<br />en détail.';
      el.querySelector('.demo-copy > p').textContent = 'Le BAR prolonge la Météo : je retrouve l’état des applications, TP et batchs, puis le détail technique des jobs.';
      el.querySelector('.demo-note').innerHTML = '<strong>Par date et environnement</strong><br />États, début, fin, durée et message système.';
    });
  },
  exit() { cleanup?.(); },
};
