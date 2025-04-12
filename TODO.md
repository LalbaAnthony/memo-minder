- [ ] Utiliser app et noter Problemes
- [ ] Truncate prod database from junk data before deploying for real
- [ ] Vérifier la présence de TODO
- [ ] Import my own data

Must:
- [ ] Mood picker change de taille en fonction de contenu
- [x] Rajouter un shadow sur les dropdown
- [ ] Mettre alerte si changement de page sans sauvagarder ?
- [x] Augmenter la durée de lanimation d'apparition/disparition du item picker car on comprend pas d'ou il vient 
- [ ] Merge codes des stores à la manière de basController ?
  - [ ] Chg nomage pr moins explicite genre items/items?
  - [ ] Faire validator de données dans le stores ?
  - [ ] En profiter pour rework fonction de LinkedItemsWrapperComponent qui sont incompréhensibles au possible
  - [ ] Limites de longeurs de champs en front correspondent à celles de la BDD
  - [ ] Ajouter un élément depuis item picker fait Oublier lemeent précédent (use stores ? `toAddSeason: {}` ?)
  - [ ] Faire listes differentes dans les stores pour chaque usage ?
- [ ] Check why new user cant click anywhere
- [ ] Rework back controller using OOP and childs/parent ?
- [ ] Ensure auth is secured (can a user access another user's data ?)
- [ ] Create and implement email systeme with back/src/helpers/email.js (or remove emails ?)
- [ ] Email validation not always working

Important:
- [ ] Add loader index index.html and remove it on App mount (https://www.instagram.com/reel/DHs5i6STCYU/)
- [ ] Add loader on search page and item picker
- [ ] Use search queries in external URL as test?q=ezdedze for Spotify etc (default link ?)

Medium:
- [ ] Faire en sorte que les dates picker ne s'initalise pas toujours sur la date d'aujourd'hui (utile pour les musiques, …) + vérifier qu'il est ok avec une valeur vide et pas 1970
- [ ] make add button if no data on home page/lists

Low:
- [ ] Tests unitaires et d'intégration (faire de la création d'un utilisateur à son utilisation)
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Inifinte scroll
- [ ] Faire en sorte qu'elle soit utilisable sans connection (store en persistant, ...)
- [ ] Ajouter langue francaise