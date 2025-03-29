- [ ] Utiliser app et noter Problemes
- [ ] Vérifier la présence de TODO et de WIP dans le code
- [ ] Import my own data

Must:
- [x] Make sure DB isnt empty on prod since the pipe remove the back folder: use https://chatgpt.com/share/67dfcc33-e8bc-8008-b9ca-39b3b008ca32
- [ ] Ensure auth is secured
- [ ] A la sauvegarde d'un element, ses données dans la liste disparaissent 
- [ ] Create and implement email systeme with back/src/helpers/email.js (or remove emails ?)
- [ ] Maj account params + mdp oublié + delete account

Important:
- [x] Add a confirm on delete button on detail page 
- [ ] Add loader on search page and item picker
- [ ] loading isn't centered on Y axis + no loading in search and item picker
- [ ] Faire en sorte qu'on puisse relier les items dans les deux sens (pas que depuis le maitre)
- [ ] Faire du many to many partout
- [ ] Logo des item music de la mauvaise couleur au survol
- [ ] Pas assez de bottom margin dans le corps des page de modif: superposition buttons
- [ ] Add save btn on account page
- [ ] Default value of date picker is set to 1970

Medium:
- [ ] Bug: si date de naissance en 1910,stats sont cassés
- [ ] Rework animation add button
- [ ] Tests unitaires et d'intégration (faire de la création d'un utilisateur à son utilisation)
- [ ] make add button if no data on home page/lists
- [ ] Fill infos page
- [ ] Add unit test
- [ ] Set a limit to number of notification En même temps (auto clear si > 5 (?)) 

Low:
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Trop de scroll quand barre de recherche item picker est vide
- [ ] Ajouter un élément depuis item picker fait Oublier lemeent précédent (use stores ? `toAddSeason: {}` ?)
- [ ] Inifinte scroll
- [ ] Faire listes differentes dans les stores pour chaque usage ?
- [ ] Ajouter langue francaise
- [ ] Fill terms-and-conditions page and add in the infos page