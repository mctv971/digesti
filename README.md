# Présentation QIS

```sh
npm install
npm run dev
```

`npm run build` produit la version compilée. Vite est la seule dépendance du projet.

## Présenter

- **Flèche droite / Espace** : étape suivante, puis slide suivante.
- **Flèche gauche** : étape précédente, puis slide précédente.
- **Home / End** : première / dernière slide.
- Les boutons en bas des slides permettent la même navigation à la souris.
- L’application QIS dans Connect, l’événement « Incident Qlik téléphonie », l’œil de sa communication de 14:47
  et « Modifier les canaux de notifications » sont cliquables dans les démonstrations.

Il n'y a aucune progression automatique. Les transitions déclenchées par le
présentateur déplacent la souris simulée, ouvrent un écran ou agrandissent une zone.
Le hash `#1` à `#11` restaure la slide au rechargement, à sa première étape.
`window.deck.next()`, `prev()` et `goTo(index)` sont disponibles ; `goTo` utilise
un index de slide commençant à zéro et ignore les étapes intermédiaires.

## Modifier

Chaque slide possède son fichier JavaScript et son CSS dans `src/slides/`.
Le registre ordonné est `src/deck/slides.js`. La couverture est indépendante.
`shared.js` et `shared.css` regroupent les éléments réellement répétés : pied de
page, repère du parcours, ordinateur et lifecycle des étapes.

`presentSteps()` gère les boutons, les animations et leur annulation. Chaque
slide définit ses propres étapes et appelle le nettoyage dans `exit()`.
La réduction des mouvements conserve tous les contenus et toutes les étapes,
en remplaçant les mouvements par des changements immédiats.

Les captures sont importées directement depuis `SOURCE/screenQIS/` par Vite.
Remplacer un fichier dans ce dossier actualise donc la présentation en développement ;
le build inclut les captures avec une URL versionnée. Le cadrage CSS masque les
menus d’administration. Le logo QIS utilise `SOURCE/logoQIS.jpg`.
Les logos G2S restent dans `public/assets/` avec leur viewBox resserré.

La boussole commune est dans `src/deck/compass.js` et son CSS : rotation de 2,2 secondes suivie de 2,8 secondes de pause en boucle sur la couverture, un seul tour à l’entrée des autres slides, annulé à la sortie et désactivé en mouvement réduit.
La slide 7 présente aussi le cas d’erreur et la seconde Météo des gestionnaires.
La slide 8 montre les deux vues BAR (traitements et flux) ; la slide 9 reprend le socle Microsoft et la démarche projet, la trajectoire et les jalons sont en slide 10, puis la synthèse en slide 11.

La slide 5 réunit les règles d’accès et le choix des notifications. La slide 6
enchaîne directement sur les abonnements et la modification des canaux.

Le formulaire de notifications est une simulation locale de démonstration.
Ses modifications n'appellent aucun service QIS et ne sont pas persistées.
Un retour sur la slide réinitialise l'exemple.

Sur la slide architecture, chaque clic révèle une étape du projet au centre, puis
répartit les blocs déjà présents. Les icônes Microsoft sont stockées localement
dans `public/assets/microsoft/`, avec leurs sources dans `SOURCES.md`.

La timeline (`slide-trajectory.js` et son CSS) conserve les sept jalons de la
référence : tracé progressif, repères et deux pulsations autour d’Aujourd’hui.
L’animation se rejoue à l’entrée et devient statique en mouvement réduit.
