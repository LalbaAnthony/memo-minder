Must:
- [x] Search isnt working anymore
- [ ] Traiter todo du code (dont les birthday)
- [ ] Make a prepoduction
- [ ] Create and implement email systeme with email.js with https://chatgpt.com/share/6807b762-e3c0-800a-a49c-ccc0a19c1ac9

Should:
- [ ] Re-add today as the default date on some date picker (just the event one). Make sure the date isnt half set like back in the days. 
- [ ] Check theme colors
- [ ] Scroll à la bonne hauteur à l'ouverture de item picker
- [ ] Wipe notif enable side menu
- [ ] Limites de longeurs de champs en front correspondent à celles de la BDD
- [ ] Test unitaires et d'intégration des contrôleurs, modèles et routes

Could:
- [ ] Merge manualUpdate and manualCreation on details pages
- [ ] Faire validator de données dans les stores ?
- [ ] Filter by Pill/Items on list pages
- [ ] Fix wrong imports in backend (ESM/CommonJS)
- [ ] Search including linked items
- [ ] Faire un endpoint /search (pour item picker et searc page) au lieu de plusieurs appel à plusieurs endpoints
- [ ] Faire listes/items differentes dans les stores pour chaque usage (use stores ? `lasts: {}`, `toAdd: {}` ?)

Won't:
- [ ] Tests de bout en bout (faire de la création d'un utilisateur à son utilisation)
- [ ] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
- [ ] Inifinte scroll
- [ ] Faire en sorte qu'elle soit utilisable sans connection (store en persistant, liste de MAJ en FIFO...)
- [ ] Ajouter langue francaise