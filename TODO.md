Must:
- [ ] Fix open on dezzer not working (in app)
- [ ] Retirer redirection 404 au fail d'un requete et mettre un autre message
- [ ] Adding an event with an old date should not set a default season (Adding it anyway then removing it ?)
- [ ] Fix wrong imports in backend (ESM/CommonJS)
- [ ] Search for TODO and WIP inside the codebase
- [ ] Create and implement email systeme with email.js with https://chatgpt.com/share/6807b762-e3c0-800a-a49c-ccc0a19c1ac9

Should:
- [ ] 'Add' button in item picker that allows to add a new item which will be automatically linked to item we are coming from
- [ ] Limites de longeurs de champs en front correspondent à celles de la BDD
- [ ] Test unitaires et d'intégration des contrôleurs, modèles et routes

Could:
- [ ] Merge manualUpdate and manualCreation on details pages
- [ ] Filter by Pill/Items on list pages
- [ ] Search including linked items
- [ ] Use https://chatgpt.com/share/689263d4-50c8-8008-a46b-f3584f60ed22 for item picker
- [ ] Faire un endpoint /search (pour item picker et searc page) au lieu de plusieurs appel à plusieurs endpoints

Won't:
- [ ] Faire listes/items differentes dans les stores pour chaque usage (use stores ? `lasts: {}`, `toAdd: {}` ?)
- [ ] Faire validator de données dans les stores ?
- [ ] Tests de bout en bout (faire de la création d'un utilisateur à son utilisation)
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Infinite scroll
- [ ] Faire en sorte qu'elle soit utilisable sans connection (store en persistant, liste de MAJ en FIFO...)
- [ ] Ajouter langue francaise