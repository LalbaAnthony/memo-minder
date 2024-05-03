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
          {
            season_id: 3,
            user_id: 1,
            music_id: 3,
            mood_id: 3,
            person_id: 3,
            title: 'Autumn 2021',
            color: '#0000ff',
            description: 'Autumn 2021 description',
            date_start: '2021-09-21',
            date_end: '2021-12-21',
            updated_at: '2021-09-21',
            created_at: '2021-09-21',
          },
          {
            season_id: 4,
            user_id: 1,
            music_id: 4,
            mood_id: 4,
            person_id: 4,
            title: 'Winter 2021',
            color: '#ff00ff',
            description: 'Winter 2021 description',
            date_start: '2021-12-21',
            date_end: '2022-03-21',
            updated_at: '2021-12-21',
            created_at: '2021-12-21',
          },
        ]
        this.seasons.loading = false
      }, 1000);
    },
  },
})
