import { defineStore } from 'pinia'
import { api } from '@/composables/api'
import { randomPastelColor } from '@/composables/helpers.js'
import { useAuthStore } from '@/stores/auth'
import { notif } from '@/composables/notif.js'

const authStore = useAuthStore()

const defaultPagination = { page: 1, perPage: 25, total: 1 }

export const useSeasonStore = defineStore('season', {
  state: () => ({
    seasons: {
      loading: true,
      data: [],
      pagination: defaultPagination,
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

    resetPagination() {
      this.seasons.pagination = defaultPagination
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

          const resp = await api.get(`season/${seasonId}`, params)
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
        page: this.seasons.pagination.page || defaultPagination.page,
        perPage: this.seasons.pagination.perPage || defaultPagination.perPage,
        sort: [
          { order: 'DESC', orderBy: 'createdAt' },
        ],
      }

      Object.assign(params, givenParams)

      const resp = await api.get('seasons', params)
      this.seasons.data = resp.data.data || []
      this.seasons.pagination = resp.data.pagination || defaultPagination

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
      this.season.data.color = randomPastelColor()
      this.season.data.dateEnd = new Date().toISOString().split('T')[0]
      this.season.data.dateStart = new Date().toISOString().split('T')[0]
      this.season.data.userId = authStore.user.userId
    },

    async deleteSeason(seasonId, notify = true) {
      // Remove in local
      this.seasons.data.splice(this.seasons.data.findIndex(season => season.seasonId === seasonId), 1)

      // Request
      const resp = await api.del(`season/${seasonId}`)

      if (resp.status !== 200) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Season deleted', 'success')
      }

      return true
    },

    async createSeason(item, notify = false) {
      const season = {
        ...item
      }

      season.people =  item.people.map(person => person.personId) || [];
      season.events =  item.events.map(event => event.eventId) || [];
      season.musics =  item.musics.map(music => music.musicId) || [];

      // Loading
      this.season.loading = true

      // Request
      const resp = await api.post('seasons', season)

      if (resp.status !== 201) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Season created', 'success')
      }

      // Append in local
      if (resp.data?.data) {
        this.seasons.data.unshift(resp.data.data)
      } else {
        this.seasons.data.unshift(item)
      }

      // Loading
      this.season.loading = false

      return true
    },

    async updateSeason(item, notify = false) {
      const season = {
        ...item
      }

      season.people =  item.people.map(person => person.personId) || [];
      season.events =  item.events.map(event => event.eventId) || [];
      season.musics =  item.musics.map(music => music.musicId) || [];

      // Request
      const resp = await api.put(`season/${season.seasonId}`, season)

      if (resp.status !== 200) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Season updated', 'success')
      }

      // Update in local list
      const index = this.seasons.data.findIndex(item => item?.seasonId && (item.seasonId === season.seasonId))
      if (resp.data?.data) {
        this.seasons.data.splice(index, 1, resp.data.data)
      } else {
        this.seasons.data.splice(index, 1, item)
      }

      return true
    },
  },
})
