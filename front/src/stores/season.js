import { randomPastelColor } from '@/composables/helpers'
import { createBaseStore } from '@/composables/baseStore'

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
  },
  pagination: { page: 1, perPage: 20, total: 1 },
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
}

export const useSeasonStore = createBaseStore(config)
