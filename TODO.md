Must:
- [ ] Traiter TODO et WIP du code (dont les bdays)
- [ ] Reparer soucis cache upcoming bdays
- [ ] Make a prepoduction
- [ ] Create and implement email systeme with email.js with https://chatgpt.com/share/6807b762-e3c0-800a-a49c-ccc0a19c1ac9

Should:
- [x] Make mood selector a classic select + add gray text on left like others fields
- [ ] Chg play icon on musics with an "open in new tab" icon if no actual link saved since cliking on it will trigger a search
- [ ] Add more mood to seeders and to production
- [ ] Add emoji to moods (stored in HTML)
- [ ] Make language picker a component
- [ ] Make streaming platform picker a component
- [ ] Use https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template on home page
- [ ] Re-add today as the default date on some date picker (just the event one). Make sure the date isnt half set like back in the days.
- [ ] Scroll à la bonne hauteur à l'ouverture de item picker
- [ ] Wipe notif enable side menu
- [ ] Limites de longeurs de champs en front correspondent à celles de la BDD
- [ ] Test unitaires et d'intégration des contrôleurs, modèles et routes

Could:
- [ ] Ajout champ birthdate dans les personnes + affichage dans les items + fonction de rappel de date d'anniversaire avec endpoint dedié
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