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
- Le numéro de slide dans la pagination est saisissable : entrer un numéro et
  valider avec **Entrée** pour y accéder directement. **Échap** annule la saisie.
- L’application QIS dans Connect, l’événement « Incident Qlik téléphonie », l’œil de sa communication de 14:47
  et « Modifier les canaux de notifications » sont cliquables dans les démonstrations.

Il n'y a aucune progression automatique. Les transitions déclenchées par le
présentateur déplacent la souris simulée, ouvrent un écran ou agrandissent une zone.
Le hash `#1` à `#14` restaure la slide au rechargement, à sa première étape.
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

Les captures sont importées directement depuis `SOURCE/screenQIS/` et
`SOURCE/screenPerception/` par Vite.
Remplacer un fichier dans ce dossier actualise donc la présentation en développement ;
le build inclut les captures avec une URL versionnée. Le cadrage CSS masque les
menus d’administration. Le logo QIS utilise `SOURCE/logoQIS.jpg`.
Les logos G2S restent dans `public/assets/` avec leur viewBox resserré.

La boussole commune est dans `src/deck/compass.js` et son CSS : rotation de 2,2 secondes suivie de 2,8 secondes de pause en boucle sur la couverture, un seul tour à l’entrée des autres slides, annulé à la sortie et désactivé en mouvement réduit.
L’ordre de présentation est : couverture (1), centralisation (2), parcours (3),
architecture (4), communications (5), accès et notifications (6), démonstration des
abonnements et notifications (7), Météo (8), BAR (9), Perception+ : contexte (10),
saisie (11), visualisation et bénéfices (12), trajectoire (13), synthèse (14).
Les identifiants et noms de fichiers restent stables ; le registre définit l’ordre.

La slide 5 affiche d’abord Connect en entier. Suivant zoome sur Mes Applications,
puis le clic suivant ouvre QIS.
La slide 7 comporte deux étapes : abonnements, puis réglage des canaux avec
Communications sur Mail et Météo sur Aucune notification.
La slide 8 inclut le cas d’erreur et la seconde Météo des gestionnaires.
La slide 9 conserve uniquement la vue des traitements BAR.

Les trois slides Perception+ sont dans `slide-perception-intro.js`,
`slide-perception-entry.js` et `slide-perception-review.js`. Elles partagent
`perception.css` et quelques helpers locaux dans `perception-shared.js`.
La slide 10 présente les deux regards sur la qualité, le rythme hebdomadaire,
les retours Excel puis les ateliers avec trois caisses (quatre étapes).
La slide 11 parcourt la saisie, les incidents, leur qualification et le ressenti
(sept étapes). La slide 12 parcourt la carte, le détail d’une caisse et les
bénéfices (cinq étapes). Tous les changements et zooms sont manuels.
Le crayon P1, la ligne d’incident et la région mise en évidence sont cliquables.
Ces démonstrations utilisent les captures fournies et ne modifient aucune donnée.
La capture finale affiche GGE malgré son nom de fichier `5_perception_visu_gne.png` ;
elle est conservée telle quelle et présentée comme un exemple de caisse.

Le formulaire de notifications est une simulation locale de démonstration.
Ses modifications n'appellent aucun service QIS et ne sont pas persistées.
Un retour sur la slide réinitialise l'exemple.

Sur la slide architecture, chaque clic révèle une étape du projet au centre, puis
répartit les blocs déjà présents. Les icônes Microsoft sont stockées localement
dans `public/assets/microsoft/`, avec leurs sources dans `SOURCES.md`.

La timeline (`slide-trajectory.js` et son CSS) conserve les sept jalons de la
référence : tracé progressif, repères et deux pulsations autour d’Aujourd’hui.
L’animation se rejoue à l’entrée et devient statique en mouvement réduit.
