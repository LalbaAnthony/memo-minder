- [ ] Utiliser app et noter Problemes
- [ ] Truncate prod database from junk data before deploying for real
- [ ] Vérifier la présence de TODO
- [ ] Import my own data

Must:
- [ ] Ensure auth is secured (can a user access another user's data ?)
- [ ] Create and implement email systeme with back/src/helpers/email.js with https://chatgpt.com/share/6807b762-e3c0-800a-a49c-ccc0a19c1ac9

Should:
- [ ] Add smart link on music page with the platform logo button (!= link)
- [ ] Merge manualUpdate and manualCreation on details pages
- [ ] Limites de longeurs de champs en front correspondent à celles de la BDD
- [ ] Add loader on search page and item picker
- [ ] Check theme_color and background_color warning in console on production
- [ ] Test unitaires et d'intégration des contrôleurs, modèles et routes

Could:
- [ ] Fix wrong imports in backend (ESM/CommonJS)
- [ ] Faire un endpoint /search (pour item picker et searc page) au lieu de plusieurs appel à plusieurs endpoints
- [ ] Faire listes differentes dans les stores pour chaque usage (use stores ? `lasts: {}` ?)
- [ ] Ajouter un élément depuis item picker fait Oublier lemeent précédent (use stores ? `toAdd: {}` ?)
- [ ] Faire validator de données dans les stores ?
- [ ] Faire en sorte que les dates picker ne s'initalise pas toujours sur la date d'aujourd'hui (utile pour les musiques, …) + vérifier qu'il est ok avec une valeur vide et pas 1970
- [ ] make add button if no data on home page/lists

Won't:
- [ ] Tests de bout en bout (faire de la création d'un utilisateur à son utilisation)
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Inifinte scroll
- [ ] Faire en sorte qu'elle soit utilisable sans connection (store en persistant, liste de MAJ en FIFO...)
- [ ] Améliorer précision des spents, should not be upddated once a year
- [ ] Ajouter langue francaise