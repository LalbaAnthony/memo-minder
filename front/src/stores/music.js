import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api';
import { useAuthStore } from '@/stores/auth'

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
    async fetchMusic(musicId) {
      // Loading
      this.music.loading = true

      // Data
      this.music.data = {}

      const params = {
        userId: authStore.user.userId,
      }

      const resp = await get(`music/${musicId}`, params);
      this.music.data = resp.data || {};

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

      const resp = await get('musics', params);
      this.musics.data = resp.data || [];
      this.musics.pagination = resp.pagination || { page: 1, perPage: 10, total: 1 };

      // Loading
      this.musics.loading = false
    },

    async deleteMusic(musicId) {

      // Remove in local
      this.musics.data.splice(this.musics.data.findIndex(music => music.musicId === musicId), 1)

      // Request
      console.log('delete musicId', musicId)
    },

    async createMusic(music) {
      // Request
      console.log('create music', music)
    },

    async updateMusic(music) {
      // Request
      console.log('update music', music)
    },
  },
})
