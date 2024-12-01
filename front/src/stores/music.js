import { defineStore } from 'pinia'
import { api } from '@/helpers/api'
import { useAuthStore } from '@/stores/auth'
import { notif } from '@/helpers/notif.js'

const authStore = useAuthStore()

const defaultPagination = { page: 1, perPage: 10, total: 1 }

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
      this.musics.pagination = resp.pagination || defaultPagination

      // Loading
      this.musics.loading = false
    },

    changePage(page, scroll = true) {
      this.musics.pagination.page = page
      this.fetchMusics()
      if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    async deleteMusic(musicId) {
      // Remove in local
      this.musics.data.splice(this.musics.data.findIndex(music => music.musicId === musicId), 1)

      // Request
      const resp = await api.del(`music/${musicId}`)

      if (resp.status !== 200) {
        notif.notify(resp.data.message, 'error')
        return false
      }

      return true
    },

    async createMusic(music) {
      // Loading
      this.music.loading = true

      // Request
      const resp = await api.post('musics', music)

      if (resp.status !== 201) {
        notif.notify(resp.data.message, 'error')
        return false
      }

      // Append in local
      this.musics.data.unshift(resp.data.data)

      // Loading
      this.music.loading = false

      return true
    },

    async updateMusic(music) {
      // Loading
      this.music.loading = true

      // Request
      const resp = await api.put(`music/${music.musicId}`, music)

      if (resp.status !== 201) {
        notif.notify(resp.data.message, 'error')
        return false
      }

      // Update in local list
      const index = this.musics.data.findIndex(item => item?.musicId && (item.musicId === music.musicId))
      this.musics.data.splice(index, 1, resp.data.data)

      // Loading
      this.music.loading = false

      return true
    },
  },
})
