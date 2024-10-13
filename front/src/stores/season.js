import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api'
import { randomColor } from '@/helpers/helpers.js'
import { useAuthStore } from '@/stores/auth'
import { notify } from '@/helpers/notif.js'

const authStore = useAuthStore()

export const useSeasonStore = defineStore('season', {
  state: () => ({
    seasons: {
      loading: true,
      data: [],
      pagination: { page: 1, perPage: 10, total: 1 },
    },
    season: {
      loading: false,
      data: {},
    },
  }),

  actions: {
    clearSeason() {
      this.season.data = {}
    },

    async fetchSeason(seasonId) {
      seasonId = parseInt(seasonId)

      // Loading
      this.season.loading = true

      // If season is already loaded, we don't make the request
      if (this.season.data.seasonId !== seasonId) {
        // Before making the request, we check if the element is already in local
        const season = this.seasons.data.find(season => season.seasonId === seasonId)
        if (season) {
          this.season.data = season
        } else {
          const params = {
            userId: authStore.user.userId,
          }

          this.clearSeason()

          const resp = await get(`season/${seasonId}`, params)
          this.season.data = resp.data.data || {}
        }
      }

      // Loading
      this.season.loading = false
    },

    async fetchSeasons(givenParams = {}) {
      // Loading
      this.seasons.loading = true

      // Data
      this.seasons.data = []

      // Request
      const params = {
        userId: authStore.user.userId,
        page: this.seasons.pagination.page || 1,
        perPage: this.seasons.pagination.perPage || 10,
        sort: [
          { order: 'DESC', orderBy: 'createdAt' },
        ],
      }

      Object.assign(params, givenParams)

      const resp = await get('seasons', params)
      this.seasons.data = resp.data.data || []
      this.seasons.pagination = resp.pagination || { page: 1, perPage: 10, total: 1 }

      // Loading
      this.seasons.loading = false
    },

    changePage(page, scroll = true) {
      this.season.pagination.page = page
      this.fetchSeason()
      if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    initSeason() {
      this.clearSeason()
      this.season.data.color = randomColor()
      this.season.data.dateEnd = new Date().toISOString()
      this.season.data.dateStart = new Date().toISOString()
      this.season.data.userId = authStore.user.userId
    },

    async deleteSeason(seasonId) {
      // Remove in local
      this.seasons.data.splice(this.seasons.data.findIndex(season => season.seasonId === seasonId), 1)

      // Request
      const resp = await del(`season/${seasonId}`)

      if (resp.status !== 200) {
        notify(resp.data.message, 'error')
        return false
      }

      return true
    },

    async createSeason(season) {
      // Loading
      this.season.loading = true

      // Request
      const resp = await post('seasons', season)

      if (resp.status !== 201) {
        notify(resp.data.message, 'error')
        return false
      }

      // Append in local
      this.seasons.data.unshift(resp.data.data)

      // Loading
      this.season.loading = false

      return true
    },

    async updateSeason(season) {
      // Loading
      this.season.loading = true

      // Request
      const resp = await put(`season/${season.seasonId}`, season)

      if (resp.status !== 201) {
        notify(resp.data.message, 'error')
        return false
      }

      // Loading
      this.season.loading = false

      return true
    },
  },
})
