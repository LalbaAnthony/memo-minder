import { defineStore } from 'pinia'
import { get } from '@/helpers/api'

export const useMoodStore = defineStore('mood', {
  persist: true,
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
    clearMood() {
      this.mood.data = {}
    },

    async fetchMood(moodId) {
      moodId = parseInt(moodId)

      // Loading
      this.mood.loading = true

      // If mood is already loaded, we don't make the request
      if (this.mood.data.moodId !== moodId) {
        // Before making the request, we check if the element is already in local
        const mood = this.moods.data.find(mood => mood.moodId === moodId)
        if (mood) {
          this.mood.data = mood
        } else {
          this.clearMood()

          const resp = await get(`mood/${moodId}`)
          this.mood.data = resp.data.data || {}
        }
      }

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

      const resp = await get('moods', params)
      this.moods.data = resp.data.data || []

      // Loading
      this.moods.loading = false
    },
  },
})
