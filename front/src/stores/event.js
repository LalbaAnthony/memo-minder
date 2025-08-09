import { createBaseStore } from '@/composables/baseStore'
import { useSeasonStore } from '@/stores/season'

const seasonStore = useSeasonStore()

const config = {
  primaryKey: 'eventId',
  name: 'event',
  nicename: 'Event',
  endpoints: {
    create: 'events',
    update: 'event',
    delete: 'event',
    all: 'events',
    one: 'event',
  },
  pagination: { page: 1, perPage: 20, total: 1 },
  initItem: async (data) => {
    const today = new Date().toISOString().split('T')[0]
    data.date = today
    data.seasons = []
    data.people = []
    data.musics = []

    const currents = await seasonStore.getCurrent()
    if (currents.length) {
      data.seasons = currents
    }
  },
  mapRelations: (item) => {
    return {
      ...item,
      seasons: item.seasons?.map(season => season.seasonId) || [],
      people: item.people?.map(person => person.personId) || [],
      musics: item.musics?.map(event => event.musicId) || [],
    }
  },
}

export const useEventStore = createBaseStore(config)
