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
- L’événement « Incident Qlik téléphonie », l’œil de sa communication de 14:47
  et « Modifier les canaux de notifications » sont cliquables dans les démonstrations.

Il n'y a aucune progression automatique. Les transitions déclenchées par le
présentateur déplacent la souris simulée, ouvrent un écran ou agrandissent une zone.
Le hash `#1` à `#8` restaure la slide au rechargement, à sa première étape.
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

Les captures réelles sont copiées dans `public/assets/qis/`. Leur cadrage CSS
masque les menus d'administration sans modifier les fichiers source. Les logos
proviennent de `SOURCE/logoG2S/` ; seul le viewBox des copies publiques a été
resserré pour retirer les marges transparentes.

La slide 5 réunit les règles d’accès et le choix des notifications. La slide 6
enchaîne directement sur les abonnements et la modification des canaux.

Le formulaire de notifications est une simulation locale de démonstration.
Ses modifications n'appellent aucun service QIS et ne sont pas persistées.
Un retour sur la slide réinitialise l'exemple.
