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

    // TODO: Use a dedicated endpoint to fetch the current season instead of fetching all seasons
    // Find the first season where the start date is before today and the end date is after today
    await seasonStore.fetchItems()
    const suggestedSeasons = seasonStore.items.data.filter(season => {
      const todayDate = new Date()
      const dateStart = new Date(season.dateStart)
      const dateEnd = new Date(season.dateEnd)
      return dateStart && dateStart <= todayDate && dateEnd && dateEnd >= todayDate
    })
    if (suggestedSeasons.length) data.seasons = suggestedSeasons
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
