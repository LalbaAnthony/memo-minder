import { createBaseStore } from '@/composables/baseStore'

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
  initItem: (data) => {
    data.seasons = []
    data.people = []
    data.events = []
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
