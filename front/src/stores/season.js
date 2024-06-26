import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api';

export const useSeasonStore = defineStore('season', {
  state: () => ({
    seasons: {
      loading: true,
      data: [],
      pagination: { page: 1, perPage: 10, total: 1 },
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
            seasonId: 1,
            userId: 1,
            musicId: 1,
            moodId: 1,
            personId: 1,
            title: 'Spring 2021',
            color: '#ff0000',
            description: 'Spring 2021 description',
            dateStart: '2021-03-21',
            dateEnd: '2021-06-21',
            updatedAt: '2021-03-21',
            createdAt: '2021-03-21',
          },
          {
            seasonId: 2,
            userId: 1,
            musicId: 2,
            moodId: 2,
            personId: 2,
            title: 'Summer 2021',
            color: '#00ff00',
            description: 'Summer 2021 description',
            dateStart: '2021-06-21',
            dateEnd: '2021-09-21',
            updatedAt: '2021-06-21',
            createdAt: '2021-06-21',
          },
          {
            seasonId: 3,
            userId: 1,
            musicId: 3,
            moodId: 3,
            personId: 3,
            title: 'Autumn 2021',
            color: '#0000ff',
            description: 'Autumn 2021 description',
            dateStart: '2021-09-21',
            dateEnd: '2021-12-21',
            updatedAt: '2021-09-21',
            createdAt: '2021-09-21',
          },
          {
            seasonId: 4,
            userId: 1,
            musicId: 4,
            moodId: 4,
            personId: 4,
            title: 'Winter 2021',
            color: '#ff00ff',
            description: 'Winter 2021 description',
            dateStart: '2021-12-21',
            dateEnd: '2022-03-21',
            updatedAt: '2021-12-21',
            createdAt: '2021-12-21',
          },
        ]
        this.seasons.loading = false
      }, 1000);
    },
  },
})
