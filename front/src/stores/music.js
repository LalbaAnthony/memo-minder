import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api'
import { useAuthStore } from '@/stores/auth'
import { notify } from '@/helpers/notif.js'

const authStore = useAuthStore()

export const useMusicStore = defineStore('music', {
  state: () => ({
    musics: {
      loading: true,
      data: [],
      pagination: { page: 1, perPage: 10, total: 1 },
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

          const resp = await get(`music/${musicId}`, params)
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
        page: this.musics.pagination.page || 1,
        perPage: this.musics.pagination.perPage || 10,
        sort: [
          { order: 'DESC', orderBy: 'createdAt' },
        ],
      }

      Object.assign(params, givenParams)

      const resp = await get('musics', params)
      this.musics.data = resp.data.data || []
      this.musics.pagination = resp.pagination || { page: 1, perPage: 10, total: 1 }

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
      const resp = await del(`music/${musicId}`)

      if (resp.status !== 200) {
        notify(resp.data.message, 'error')
        return false
      }

      return true
    },

    async createMusic(music) {
      // Loading
      this.music.loading = true

      // Request
      const resp = await post('musics', music)

      if (resp.status !== 201) {
        notify(resp.data.message, 'error')
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
      const resp = await put(`music/${music.musicId}`, music)

      if (resp.status !== 201) {
        notify(resp.data.message, 'error')
        return false
      }

      // Loading
      this.music.loading = false

      return true
    },
  },
})
