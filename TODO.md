- [ ] Utiliser app et noter Problemes
- [ ] Truncate prod database from junk data before deploying for real
- [ ] Vérifier la présence de TODO
- [ ] Import my own data

Must:
- [ ] Check why new user cant click anywhere
- [ ] Ensure auth is secured (can a user access another user's data ?)
- [ ] A la sauvegarde d'un element, ses données dans la liste disparaissent 
- [ ] Create and implement email systeme with back/src/helpers/email.js (or remove emails ?)

Important:
- [ ] Faire en sorte que les dates picker ne s'initalise pas toujours sur la date d'aujourd'hui (utile pour les musiques, …) + vérifier qu'il est ok avec une valeur vide et pas 1970
- [ ] Add loader on search page and item picker
- [ ] Rework label + fields on details pages
- [ ] loading isn't centered on Y axis + no loading in search and item picker
- [ ] Faire en sorte qu'on puisse relier les items dans les deux sens (pas que depuis le maitre)
- [ ] Faire du many to many partout

Medium:
- [ ] Remove lodash and create a vustom debounce function instead ?
- [ ] Tests unitaires et d'intégration (faire de la création d'un utilisateur à son utilisation)
- [ ] make add button if no data on home page/lists
- [ ] Add unit test
- [ ] Use search queries in external URL as test?q=ezdedze for Spotify etc (default link ?)
- [ ] Placeholder aléatoire pour les descrs des event/seasons/people

Low:
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Trop de scroll quand barre de recherche item picker est vide
- [ ] Hraminiser longueur et choix des mots dans les liens de /infos
- [ ] Ajouter un élément depuis item picker fait Oublier lemeent précédent (use stores ? `toAddSeason: {}` ?)
- [ ] Inifinte scroll
- [ ] Faire en sorte qu'elle soit utilisable sans connection (store en persistant, ...)
- [ ] Faire listes differentes dans les stores pour chaque usage ?
- [ ] Ajouter langue francaise