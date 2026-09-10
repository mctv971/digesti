import { header, footer, journey, highlightJourney, laptop, capture, presentSteps } from './shared.js';
import './slide-06.css';

let cleanup;
export const slide06 = {
  id: 'slide-06',
  render: () => `
    ${header(7, 'Démonstration · abonnements & notifications', 'Mes abonnements. <em>Mes choix de notification.</em>')}
    ${journey(2, 'Mes périmètres')}
    <div class="notification-demo"><aside class="demo-copy"><span class="demo-number"></span><h2></h2><p></p><div class="demo-note" aria-live="polite"></div></aside>
    ${laptop(`${capture('qis_liste_abo.png', 'Mes abonnements avec le bouton Modifier les canaux de notifications.', 'crop-app notification-list')}${capture('qis_abo_notif.png', 'Panneau des canaux de notification de RIVAGESI.', 'notification-background')}
      <button class="screen-action open-notifications" aria-label="Modifier les canaux de notifications"></button>
      <form class="notification-panel" aria-label="Exemple de préférences de notification" hidden>
        <h3>Modification des canaux de notification du périmètre RIVAGESI</h3>
        <label for="communication-channel">Canal communication</label><select id="communication-channel" name="communication"><option value="Mail">Mail</option><option value="Aucune notification">Aucune notification</option></select>
        <label for="weather-channel">Canal météo</label><select id="weather-channel" name="weather"><option value="Mail">Mail</option><option value="Aucune notification">Aucune notification</option></select>
        <p class="preference-status" role="status"></p><div class="panel-actions"><button type="button" class="reset-preferences">Annuler</button><button type="submit">Enregistrer</button></div>
      </form>`, 'Mes abonnements / Notifications')}
      <p class="topic-note">Pour un Domaine : Communications uniquement.<br />À l’initialisation, les canaux Mail reprennent autant que possible les listes existantes.</p>
    </div>
    ${footer(7)}
  `,
  enter(context) {
    const el = context.element;
    const events = new AbortController();
    const form = el.querySelector('form');
    const communication = form.elements.communication;
    const weather = form.elements.weather;
    const status = el.querySelector('.preference-status');
    el.querySelector('.open-notifications').addEventListener('click', context.next, { signal: events.signal });
    const updateExample = () => {
      const note = el.querySelector('.demo-note');
      note.replaceChildren();
      const title = document.createElement('strong');
      title.textContent = 'Exemple : RIVAGESI';
      note.append(title, document.createElement('br'), `Communications : ${communication.value}`, document.createElement('br'), `Météo : ${weather.value}`, document.createElement('br'), 'Mon accès reste identique.');
    };
    form.addEventListener('change', () => { status.textContent = ''; updateExample(); }, { signal: events.signal });
    form.addEventListener('submit', (event) => { event.preventDefault(); updateExample(); status.textContent = 'Préférences de l’exemple mises à jour.'; }, { signal: events.signal });
    el.querySelector('.reset-preferences').addEventListener('click', () => { communication.value = 'Mail'; weather.value = 'Aucune notification'; status.textContent = ''; updateExample(); }, { signal: events.signal });

    const disposeSteps = presentSteps(context, ['Modifier mes notifications', 'Consulter la Météo'], async ({ step, animate, cursor }) => {
      if (step === 1 && animate && !await cursor(1134, 25, true)) return;
      el.querySelector('.notification-list').hidden = step >= 1;
      el.querySelector('.open-notifications').hidden = step !== 0;
      highlightJourney(el, step === 0 ? 2 : 4);
      el.querySelector('.notification-background').hidden = step < 1;
      form.hidden = step < 1;
      status.textContent = '';
      communication.value = 'Mail';
      weather.value = step === 1 ? 'Aucune notification' : 'Mail';
      el.querySelector('.demo-cursor').style.opacity = '0';
      el.querySelector('.demo-number').textContent = step === 0 ? '01 / MES ABONNEMENTS' : '02 / DEUX CANAUX';
      el.querySelector('.demo-copy h2').innerHTML = step === 0 ? 'Mes abonnements.<br />Mes notifications.' : 'Deux réglages<br />indépendants.';
      el.querySelector('.demo-copy > p').textContent = step === 0 ? 'Je consulte mes périmètres, puis je modifie leurs canaux de notification directement depuis cet écran.' : 'Je règle séparément les deux canaux : Communications par Mail, Météo sans notification. Mon accès à QIS reste identique.';
      if (step === 0) el.querySelector('.demo-note').innerHTML = '<strong>Pour chaque abonnement SI</strong><br />Communications : Mail ou aucune notification.<br />Météo : Mail ou aucune notification.';
      else updateExample();
    });
    cleanup = () => { disposeSteps(); events.abort(); };
  },
  exit() { cleanup?.(); },
};
