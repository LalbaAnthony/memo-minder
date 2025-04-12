- [ ] Utiliser app et noter Problemes
- [ ] Truncate prod database from junk data before deploying for real
- [ ] Vérifier la présence de TODO
- [ ] Import my own data

Must:
- [ ] Added season appear twice in the list
- [ ] Check on home load we cant click anywhere
- [ ] When date picker has a default date, the return value is actually null so it is not saved
- [ ] Item picker cant be scrolled
- [ ] Ensure auth is secured (can a user access another user's data ?)
- [ ] Create and implement email systeme with back/src/helpers/email.js (or remove emails ?)

Important:
- [ ] Limites de longeurs de champs en front correspondent à celles de la BDD
- [ ] Add loader on search page and item picker
- [ ] Merge manualUpdate and manualCreation on details pages

Medium:
- [ ] Faire listes differentes dans les stores pour chaque usage (use stores ? `lasts: {}` ?)
- [ ] Ajouter un élément depuis item picker fait Oublier lemeent précédent (use stores ? `toAdd: {}` ?)
- [ ] Faire validator de données dans les stores ?
- [ ] Faire en sorte que les dates picker ne s'initalise pas toujours sur la date d'aujourd'hui (utile pour les musiques, …) + vérifier qu'il est ok avec une valeur vide et pas 1970
- [ ] make add button if no data on home page/lists

Low:
- [ ] Use search queries in external URL as test?q=ezdedze for Spotify etc (default link ?)
- [ ] Tests unitaires et d'intégration (faire de la création d'un utilisateur à son utilisation)
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Inifinte scroll
- [ ] Faire en sorte qu'elle soit utilisable sans connection (store en persistant, ...)
- [ ] Ajouter langue francaise