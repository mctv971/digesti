import { header, footer, journey, highlightJourney, laptop, capture, presentSteps } from './shared.js';
import './slide-04.css';

let cleanup;
export const slide04 = {
  id: 'slide-04',
  render: () => `
    ${header(4, 'Communications', 'Un incident, <em>toute son information.</em>')}
    ${journey(1, 'Équipe IQ')}
    <aside class="demo-copy"><span class="demo-number"></span><h2></h2><p></p><div class="demo-note"></div></aside>
    ${laptop(`${capture('qis_liste_com.png', 'Calendrier QIS : liste des événements, aucun événement sélectionné.', 'crop-app list-capture')}${capture('qis_liste_com_1.png', 'Événement Incident Qlik téléphonie sélectionné : deux communications et leurs boutons de consultation en forme d’œil.', 'crop-app event-capture')}${capture('qis_com.png', 'Détail de la communication du 31 août à 14:47 : incident en cours de résolution, description et prochaine communication.', 'detail-capture')}<button class="screen-action open-event" aria-label="Sélectionner Incident Qlik téléphonie"></button><button class="screen-action open-communication" aria-label="Consulter la communication de 14:47 avec l’œil" hidden></button><div class="screen-focus communication-focus" hidden></div>`, 'Communications')}
    <p class="topic-note">Une communication peut concerner un Domaine, un SI ou un SA.</p>
    ${footer(4)}
  `,
  enter(context) {
    const el = context.element;
    const events = new AbortController();
    el.querySelector('.open-event').addEventListener('click', context.next, { signal: events.signal });
    el.querySelector('.open-communication').addEventListener('click', context.next, { signal: events.signal });
    const states = [
      ['01 / RETROUVER', 'Tout commence<br />par une vue d’ensemble.', 'Je retrouve les communications de mes périmètres dans la liste et le calendrier.', '<strong>Un même point d’accès</strong><br />pour suivre les événements QdS.'],
      ['02 / SÉLECTIONNER', 'Un événement.<br />Ses communications.', 'Je sélectionne « Incident Qlik téléphonie ». Les deux communications de cet événement apparaissent au centre.', '<strong>Consulter avec l’œil</strong><br />Je choisis ici la communication publiée à 14:47.'],
      ['03 / OUVRIR', 'L’information<br />dans son contexte.', 'Un clic sur l’œil ouvre le détail de la communication sélectionnée.', '<strong>Une communication de l’équipe IQ</strong><br />rattachée à un périmètre.'],
      ['04 / COMPRENDRE', 'Le statut.<br />L’impact. La suite.', 'Je lis la description, l’état de résolution et la prochaine échéance de communication.', '<div class="incident-cycle"><span>Détection</span><b>En cours de résolution</b><span>Résolution</span></div>'],
    ];
    const disposeSteps = presentSteps(context, ['Sélectionner l’événement', 'Consulter avec l’œil', 'Lire le détail', 'Comprendre mes accès'], async ({ step, animate, cursor, play }) => {
      if (animate && (step === 1 || step === 2)) {
        const target = el.querySelector(step === 1 ? '.open-event' : '.open-communication').getBoundingClientRect();
        const viewport = el.querySelector('.screen-viewport');
        const area = viewport.getBoundingClientRect();
        const scale = area.width / viewport.clientWidth;
        if (!await cursor((target.x + target.width / 2 - area.x) / scale, (target.y + target.height / 2 - area.y) / scale, true)) return;
      }
      if (animate && step === 3 && !await cursor(413, 300)) return;
      const [number, title, text, note] = states[step];
      el.querySelector('.demo-number').textContent = number;
      el.querySelector('.demo-copy h2').innerHTML = title;
      el.querySelector('.demo-copy > p').textContent = text;
      el.querySelector('.demo-note').innerHTML = note;
      el.querySelector('.list-capture').hidden = step !== 0;
      el.querySelector('.event-capture').hidden = step !== 1;
      el.querySelector('.open-event').hidden = step !== 0;
      el.querySelector('.open-communication').hidden = step !== 1;
      highlightJourney(el, step === 0 ? 1 : 3);
      el.querySelector('.detail-capture').hidden = step < 2;
      el.querySelector('.screen-label').textContent = step === 0 ? 'Communications' : 'Incident Qlik téléphonie';
      el.querySelector('.communication-focus').hidden = step !== 3;
      const img = el.querySelector('.detail-capture img');
      img.style.transform = step === 3 ? 'scale(1.68)' : 'scale(1)';
      el.querySelector('.demo-cursor').style.opacity = '0';
      if (animate && step === 3) await play(img, [{ transform: 'scale(1)' }, { transform: 'scale(1.68)' }], { duration: 750 });
    });
    cleanup = () => { disposeSteps(); events.abort(); };
  },
  exit() { cleanup?.(); },
};
