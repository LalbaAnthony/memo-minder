import { defineStore } from 'pinia'
import { api } from '@/composables/api'

export const useMoodStore = defineStore('mood', {
  persist: true,
  state: () => ({
    items: {
      loading: true,
      data: [],
    },
  }),

  actions: {
    async fetchItems() {
      this.items.loading = true

      this.items.data = []

      const resp = await api.get('moods')
      this.items.data = resp.data.data || []

      this.items.loading = false
    },
  },
})
