- [ ] Utiliser app et noter Problemes
- [ ] Truncate prod database from junk data before deploying for real
- [ ] Vérifier la présence de TODO
- [ ] Import my own data

Must:
- [ ] When date picker has a default date, the return value is actually null so it is not saved
- [ ] Item picker cant be scrolled
- [ ] Ensure auth is secured (can a user access another user's data ?)
- [ ] Create and implement email systeme with back/src/helpers/email.js (or remove emails ?)

Important:
- [ ] Improve seed so it can be easily triggered in dev without being able to run in prod to avoid data loss
- [ ] Test unitaires et d'intégration + ajouter à CI/CD
- [ ] Music links
  - [ ] Find a way to retrieve Icon component in MusicItem
  - [ ] Store a default plateform in DB/account parameters as a select
  - [ ] Use it to compute a link if no streamingLink in openStreamingLink
  - [ ] Copy/reuse openStreamingLink into the music detail page
- [ ] Merge manualUpdate and manualCreation on details pages
- [ ] Limites de longeurs de champs en front correspondent à celles de la BDD
- [ ] Filter by date doesnt work (lasts and first added return the same)
- [ ] Add loader on search page and item picker
- [ ] Check theme_color and background_color warning in console on production

Medium:
- [ ] Ne pas faire erreur 500 mais erreur XXX
- [ ] Faire listes differentes dans les stores pour chaque usage (use stores ? `lasts: {}` ?)
- [ ] Ajouter un élément depuis item picker fait Oublier lemeent précédent (use stores ? `toAdd: {}` ?)
- [ ] Faire validator de données dans les stores ?
- [ ] Faire en sorte que les dates picker ne s'initalise pas toujours sur la date d'aujourd'hui (utile pour les musiques, …) + vérifier qu'il est ok avec une valeur vide et pas 1970
- [ ] make add button if no data on home page/lists

Low:
- [ ] Tests de bout en bout (faire de la création d'un utilisateur à son utilisation)
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Inifinte scroll
- [ ] Faire en sorte qu'elle soit utilisable sans connection (store en persistant, ...)
- [ ] Ajouter langue francaise