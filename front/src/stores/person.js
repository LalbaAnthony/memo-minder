import { createBaseStore } from '@/composables/baseStore.js'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/composables/api'

const authStore = useAuthStore()

const config = {
  primaryKey: 'personId',
  name: 'person',
  nicename: 'Person',
  endpoints: {
    create: 'people',
    update: 'person',
    delete: 'person',
    all: 'people',
    one: 'person',
    upcomingBirthdays: 'people/upcoming-birthdays',
  },
  pagination: { page: 1, perPage: 20, total: 1 },
  initItem: (data) => {
    data.seasons = []
    data.musics = []
    data.events = []
  },
  mapRelations: (item) => {
    return {
      ...item,
      events: item.events?.map(event => event.eventId) || [],
      musics: item.musics?.map(music => music.musicId) || [],
      seasons: item.seasons?.map(season => season.seasonId) || [],
    }
  },

  actions: {
    fetchUpcomingBirthdays: async function (givenParams) {
      this.items.loading = true

      // Clear the local list before fetching
      this.clearItems()

      const params = {
        userId: authStore.user.userId,
        page: this.items.pagination.page || config.pagination.page,
        perPage: this.items.pagination.perPage || config.pagination.perPage,
      }

      // Merge custom parameters
      Object.assign(params, givenParams)

      const resp = await api.get(`${config.endpoints.upcomingBirthdays}`, params)
      this.items.data = resp.data.data || []
      this.items.pagination = resp.data.pagination || config.pagination

      this.items.loading = false
    }
  }
}

export const usePersonStore = createBaseStore(config)
