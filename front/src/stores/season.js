import { defineStore } from 'pinia'
import { get } from '@/helpers/api';

export const useSeasonStore = defineStore('season', {
  state: () => ({
    seasons: {
      loading: true,
      data: [],
      pagination: { page: 1, per_page: 10, total: 1 },
    },
  }),

  actions: {
    async fetchSeasons() {
      // Loading
      this.seasons.loading = true

      // Data
      this.seasons.data = []

      // const resp = await get('seasons');
      // this.seasons.data = resp.data || [];

      // as
      // season_id INT AUTO_INCREMENT NOT NULL UNIQUE,
      // user_id INT NOT NULL,
      // music_id INT,
      // mood_id INT,
      // person_id INT,
      // title VARCHAR (50) NOT NULL,
      // color VARCHAR (7) NOT NULL DEFAULT '#000000',
      // description VARCHAR (1000),
      // date_start DATE NOT NULL,
      // date_end DATE,
      // is_deleted BOOLEAN NOT NULL DEFAULT 0,
      // updated_at DATETIME NOT NULL DEFAULT NOW(),
      // created_at DATETIME NOT NULL DEFAULT NOW(),
      // CONSTRAINT season_PK PRIMARY KEY (season_id),
      // CONSTRAINT season_user_FK FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
      // CONSTRAINT season_music_FK FOREIGN KEY (music_id) REFERENCES music(music_id),
      // CONSTRAINT season_mood_FK FOREIGN KEY (mood_id) REFERENCES mood(mood_id),
      // CONSTRAINT season_person_FK FOREIGN KEY (person_id) REFERENCES person(person_id)
      // Fake data fetch for demo
      setTimeout(() => {
        this.seasons.data = [
          {
            season_id: 1,
            user_id: 1,
            music_id: 1,
            mood_id: 1,
            person_id: 1,
            title: 'Spring 2021',
            color: '#ff0000',
            description: 'Spring 2021 description',
            date_start: '2021-03-21',
            date_end: '2021-06-21',
            updated_at: '2021-03-21',
            created_at: '2021-03-21',
          },
          {
            season_id: 2,
            user_id: 1,
            music_id: 2,
            mood_id: 2,
            person_id: 2,
            title: 'Summer 2021',
            color: '#00ff00',
            description: 'Summer 2021 description',
            date_start: '2021-06-21',
            date_end: '2021-09-21',
            updated_at: '2021-06-21',
            created_at: '2021-06-21',
          },
        ]
        this.seasons.loading = false
      }, 1000);
    },
  },
})
