import { randomPastelColor } from '@/composables/helpers'
import { createBaseStore } from '@/composables/baseStore'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/composables/api'

const authStore = useAuthStore()

const config = {
  primaryKey: 'seasonId',
  name: 'season',
  nicename: 'Season',
  endpoints: {
    create: 'seasons',
    update: 'season',
    delete: 'season',
    all: 'seasons',
    one: 'season',
    current: 'season/current',
  },
  pagination: { page: 1, perPage: 4, total: 1 },
  initItem: (data) => {
    const today = new Date().toISOString().split('T')[0]
    data.color = randomPastelColor()
    data.dateStart = today
    data.dateEnd = today
    data.musics = []
    data.people = []
    data.events = []
  },
  mapRelations: (item) => {
    return {
      ...item,
      people: item.people?.map(person => person.personId) || [],
      events: item.events?.map(event => event.eventId) || [],
      musics: item.musics?.map(music => music.musicId) || [],
    }
  },
  actions: {
    getCurrent: async function () {
      const params = {
        userId: authStore.user.userId,
      }

      const resp = await api.get(`${config.endpoints.current}`, params)
      return resp.data.data || []
    }
  }
}

export const useSeasonStore = createBaseStore(config)
