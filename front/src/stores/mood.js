import { defineStore } from 'pinia'
import { get } from '@/helpers/api';

export const useMoodStore = defineStore('mood', {
  state: () => ({
    moods: {
      loading: true,
      data: [],
    },
    mood: {
      loading: false,
      data: {},
    },
  }),

  actions: {
    async fetchMood(moodId) {
      // Loading
      this.mood.loading = true

      // Data
      this.mood.data = {}

      const resp = await get(`mood/${moodId}`);
      this.mood.data = resp.data || {};

      // Loading
      this.mood.loading = false
    },

    async fetchMoods(givenParams = {}) {
      // Loading
      this.moods.loading = true

      // Data
      this.moods.data = []

      // Request
      const params = {
        // ...
      }

      Object.assign(params, givenParams)

      const resp = await get('moods', params);
      this.moods.data = resp.data || [];

      // Loading
      this.moods.loading = false
    },
  },
})
