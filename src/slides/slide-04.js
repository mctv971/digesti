import { qisLogo, header, footer, journey, highlightJourney, laptop, capture, presentSteps } from './shared.js';
import './slide-04.css';

const eye = '<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" role="img" aria-label="œil"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const connectOverview = 'translateY(0) scale(1)';
const connectApplications = 'translateY(-105px) scale(1.75)';
let cleanup;
export const slide04 = {
  id: 'slide-04',
  render: () => `
    ${header(5, 'Communications', 'Un incident, <em>toute son information.</em>')}
    ${journey(1, 'Équipe IQ')}
    <aside class="demo-copy"><span class="demo-number"></span><h2></h2><p></p><div class="demo-note"></div></aside>
    ${laptop(`<div class="connect-portal">${capture('qis_connect.png', 'Portail Connect, rubrique Mes Applications.', 'connect-capture')}<button class="screen-action open-qis" aria-label="Ouvrir QIS — Qualité Infos Services"><img src="${qisLogo}" alt="" /><span>Qualité Infos<br />Services</span></button></div>${capture('qis_liste_com.png', 'Calendrier QIS : liste des événements, aucun événement sélectionné.', 'crop-app list-capture')}${capture('qis_liste_com_1.png', 'Événement Incident Qlik téléphonie sélectionné : deux communications et leurs boutons de consultation en forme d’œil.', 'crop-app event-capture')}${capture('qis_com.png', 'Détail de la communication du 31 août à 14:47 : incident en cours de résolution, description et prochaine communication.', 'detail-capture')}<button class="screen-action open-event" aria-label="Sélectionner Incident Qlik téléphonie"></button><button class="screen-action open-communication" aria-label="Consulter la communication de 14:47 avec l’œil" hidden></button><div class="screen-focus communication-focus" hidden></div>`, 'Communications')}
    <p class="topic-note">Une communication concerne un Périmètre.</p>
    ${footer(5)}
  `,
  enter(context) {
    const el = context.element;
    const events = new AbortController();
    el.querySelector('.open-qis').addEventListener('click', context.next, { signal: events.signal });
    el.querySelector('.open-event').addEventListener('click', context.next, { signal: events.signal });
    el.querySelector('.open-communication').addEventListener('click', context.next, { signal: events.signal });
    const states = [
      ['01 / CONNECT', 'Mon point d’entrée :<br />le portail Connect.', 'Depuis la page d’accueil, je retrouve la rubrique Mes Applications.', '<strong>Accéder à QIS</strong><br />Je commence par Mes Applications.'],
      ['02 / ACCÉDER À QIS', 'Depuis Connect,<br />un clic vers QIS.', 'Dans Mes Applications, je sélectionne Qualité Infos Services pour accéder à mes informations.', '<strong>Mon point d’entrée</strong><br />Le portail Connect.'],
      ['03 / RETROUVER', 'Tout commence<br />par une vue d’ensemble.', 'Je retrouve les communications de mes périmètres dans la liste et le calendrier.', '<strong>Un même point d’accès</strong><br />pour suivre les événements QdS.'],
      ['04 / SÉLECTIONNER', 'Un événement.<br />Ses communications.', 'Je sélectionne « Incident Qlik téléphonie ». Les deux communications de cet événement apparaissent au centre.', `<strong>Consulter avec ${eye}</strong><br />Je choisis ici la communication publiée à 14:47.`],
      ['05 / OUVRIR', 'L’information<br />dans son contexte.', `Un clic sur ${eye} ouvre le détail de la communication sélectionnée.`, '<strong>Une communication de l’équipe IQ</strong><br />rattachée à un périmètre.'],
      ['06 / COMPRENDRE', 'Le statut.<br />L’impact. La suite.', 'Je lis la description, l’état de résolution et la prochaine échéance de communication.', '<div class="incident-cycle"><span>Détection</span><b>En cours de résolution</b><span>Résolution</span></div>'],
    ];
    const disposeSteps = presentSteps(context, ['Voir Mes applications', 'Ouvrir QIS', 'Sélectionner l’événement', `Consulter avec ${eye}`, 'Lire le détail', 'Comprendre mes accès'], async ({ step, animate, cursor, play }) => {
      if (animate && (step >= 2 && step <= 4)) {
        const target = el.querySelector(step === 2 ? '.open-qis' : step === 3 ? '.open-event' : '.open-communication').getBoundingClientRect();
        const viewport = el.querySelector('.screen-viewport');
        const area = viewport.getBoundingClientRect();
        const scale = area.width / viewport.clientWidth;
        if (!await cursor((target.x + target.width / 2 - area.x) / scale, (target.y + target.height / 2 - area.y) / scale, true)) return;
      }
      if (animate && step === 5 && !await cursor(413, 300)) return;
      const [number, title, text, note] = states[step];
      el.querySelector('.demo-number').textContent = number;
      el.querySelector('.demo-copy h2').innerHTML = title;
      el.querySelector('.demo-copy > p').innerHTML = text;
      el.querySelector('.demo-note').innerHTML = note;
      el.querySelector('.connect-portal').hidden = step > 1;
      el.querySelector('.open-qis').hidden = step > 1;
      el.querySelector('.list-capture').hidden = step !== 2;
      el.querySelector('.event-capture').hidden = step !== 3;
      el.querySelector('.open-event').hidden = step !== 2;
      el.querySelector('.open-communication').hidden = step !== 3;
      highlightJourney(el, step < 3 ? 1 : 3);
      el.querySelector('.detail-capture').hidden = step < 4;
      el.querySelector('.screen-label').textContent = step < 2 ? 'Connect / Mes Applications' : step === 2 ? 'Communications' : 'Incident Qlik téléphonie';
      el.querySelector('.communication-focus').hidden = step !== 5;
      const img = el.querySelector('.detail-capture img');
      img.style.transform = step === 5 ? 'scale(1.68)' : 'scale(1)';
      el.querySelector('.demo-cursor').style.opacity = '0';
      const portal = el.querySelector('.connect-portal');
      portal.style.transform = step === 1 ? connectApplications : connectOverview;
      el.querySelector('.open-qis').setAttribute('aria-label', step === 0 ? 'Zoomer sur Mes applications' : 'Ouvrir QIS — Qualité Infos Services');
      if (animate && step === 1) await play(portal, [{ transform: connectOverview }, { transform: connectApplications }], { duration: 850 });
      if (animate && step === 5) await play(img, [{ transform: 'scale(1)' }, { transform: 'scale(1.68)' }], { duration: 750 });
    });
    cleanup = () => { disposeSteps(); events.abort(); };
  },
  exit() { cleanup?.(); },
};
