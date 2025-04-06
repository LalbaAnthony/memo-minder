- [ ] Utiliser app et noter Problemes
- [ ] Truncate prod database from junk data before deploying for real
- [ ] Vérifier la présence de TODO
- [ ] Import my own data

Must:
- [ ] Faire du many to many partout
  - [ ] Faire en sorte qu'on ne puissse pas ajouter deux fois le même item dans linked items
- [ ] Check why new user cant click anywhere
- [ ] Ensure auth is secured (can a user access another user's data ?)
- [ ] Create and implement email systeme with back/src/helpers/email.js (or remove emails ?)
- [ ] Email validation not always working
- [ ] Limites de longeurs de champs en front correspondent à celles de la BDD

Important:
- [ ] Add loader on search page and item picker
- [ ] Use search queries in external URL as test?q=ezdedze for Spotify etc (default link ?)

Medium:
- [ ] Faire en sorte que les dates picker ne s'initalise pas toujours sur la date d'aujourd'hui (utile pour les musiques, …) + vérifier qu'il est ok avec une valeur vide et pas 1970
- [ ] make add button if no data on home page/lists
- [ ] Les couleurs par default de color picker doivent être pastel

Low:
- [ ] Tests unitaires et d'intégration (faire de la création d'un utilisateur à son utilisation)
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Ajouter un élément depuis item picker fait Oublier lemeent précédent (use stores ? `toAddSeason: {}` ?)
- [ ] Inifinte scroll
- [ ] Faire en sorte qu'elle soit utilisable sans connection (store en persistant, ...)
- [ ] Faire listes differentes dans les stores pour chaque usage ?
- [ ] Ajouter langue francaise