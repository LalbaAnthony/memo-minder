import { createBaseStore } from '@/composables/baseStore.js'

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
}

export const usePersonStore = createBaseStore(config)
