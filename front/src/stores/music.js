import { defineStore } from 'pinia'
import { api } from '@/composables/api'
import { useAuthStore } from '@/stores/auth'
import { notif } from '@/composables/notif.js'

const authStore = useAuthStore()

const defaultPagination = { page: 1, perPage: 25, total: 1 }

export const useMusicStore = defineStore('music', {
  state: () => ({
    musics: {
      loading: true,
      data: [],
      pagination: defaultPagination
    },
    music: {
      loading: false,
      data: {},
    },
  }),

  actions: {
    clearMusic() {
      this.music.data = {}
    },

    resetPagination() {
      this.musics.pagination = defaultPagination
    },

    async fetchMusic(musicId) {
      musicId = parseInt(musicId)

      // Loading
      this.music.loading = true

      // If music is already loaded, we don't make the request
      if (this.music.data.musicId !== musicId) {
        // Before making the request, we check if the element is already in local
        const music = this.musics.data.find(music => music.musicId === musicId)
        if (music) {
          this.music.data = music
        } else {
          const params = {
            userId: authStore.user.userId,
          }

          this.clearMusic()

          const resp = await api.get(`music/${musicId}`, params)
          this.music.data = resp.data.data || {}
        }
      }

      // Loading
      this.music.loading = false
    },

    async fetchMusics(givenParams = {}) {
      // Loading
      this.musics.loading = true

      // Data
      this.musics.data = []

      // Request
      const params = {
        userId: authStore.user.userId,
        page: this.musics.pagination.page || defaultPagination.page,
        perPage: this.musics.pagination.perPage || defaultPagination.perPage,
        sort: [
          { order: 'DESC', orderBy: 'createdAt' },
        ],
      }

      Object.assign(params, givenParams)

      const resp = await api.get('musics', params)
      this.musics.data = resp.data.data || []
      this.musics.pagination = resp.data.pagination || defaultPagination

      // Loading
      this.musics.loading = false
    },

    changePage(page, scroll = true) {
      this.musics.pagination.page = page
      this.fetchMusics()
      if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    initMusic() {
      this.clearMusic()
      this.music.data.userId = authStore.user.userId
    },

    async deleteMusic(musicId, notify = false) {
      // Remove in local
      this.musics.data.splice(this.musics.data.findIndex(music => music.musicId === musicId), 1)

      // Request
      const resp = await api.del(`music/${musicId}`)

      if (resp.status !== 200) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Music deleted', 'success')
      }

      return true
    },

    async createMusic(item, notify = false) {
      const music = {
        ...item,
        seasons: item?.seasons.map(season => season.seasonId) || [],
        events: item?.events.map(event => event.eventId) || [],
        people: item?.people.map(person => person.personId) || [],
      }

      // Loading
      this.music.loading = true

      // Request
      const resp = await api.post('musics', music)

      if (resp.status !== 201) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Music created', 'success')
      }

      // Append in local
      this.musics.data.unshift(resp.data.data)

      // Loading
      this.music.loading = false

      return true
    },

    async updateMusic(item, notify = false) {
      const music = {
        ...item,
        seasons: item?.seasons.map(season => season.seasonId) || [],
        events: item?.events.map(event => event.eventId) || [],
        people: item?.people.map(person => person.personId) || [],
      }

      // Request
      const resp = await api.put(`music/${music.musicId}`, music)

      if (resp.status !== 200) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Music updated', 'success')
      }

      // Update in local list
      const index = this.musics.data.findIndex(item => item?.musicId && (item.musicId === music.musicId))
      this.musics.data.splice(index, 1, resp.data.data)

      return true
    },
  },
})
