import { createBaseStore } from '@/composables/baseStore'
import { useSeasonStore } from '@/stores/season'

const seasonStore = useSeasonStore()

const config = {
  primaryKey: 'musicId',
  name: 'music',
  nicename: 'Music',
  endpoints: {
    create: 'musics',
    update: 'music',
    delete: 'music',
    all: 'musics',
    one: 'music',
  },
  pagination: { page: 1, perPage: 20, total: 1 },
  initItem: async (data) => {
    data.seasons = []
    data.people = []
    data.events = []

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
      events: item.events?.map(event => event.eventId) || [],
    }
  },
}

export const useMusicStore = createBaseStore(config)
