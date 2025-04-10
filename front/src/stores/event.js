import { defineStore } from 'pinia'
import { api } from '@/composables/api'
import { useAuthStore } from '@/stores/auth'
import { notif } from '@/composables/notif.js'

const authStore = useAuthStore()

const defaultPagination = { page: 1, perPage: 25, total: 1 }

export const useEventStore = defineStore('event', {
  state: () => ({
    events: {
      loading: true,
      data: [],
      pagination: { page: 1, perPage: 10, total: 1 },
    },
    event: {
      loading: false,
      data: {},
    },
  }),

  actions: {
    clearEvent() {
      this.event.data = {}
    },

    resetPagination() {
      this.events.pagination = defaultPagination
    },

    async fetchEvent(eventId) {
      eventId = parseInt(eventId)

      // Loading
      this.event.loading = true

      // If event is already loaded, we don't make the request
      if (this.event.data.eventId !== eventId) {
        // Before making the request, we check if the element is already in local
        const event = this.events.data.find(event => event.eventId === eventId)
        if (event) {
          this.event.data = event
        } else {
          const params = {
            userId: authStore.user.userId,
          }

          this.clearEvent()

          const resp = await api.get(`event/${eventId}`, params)
          this.event.data = resp.data.data || {}
        }
      }

      // Loading
      this.event.loading = false
    },

    async fetchEvents(givenParams = {}) {
      // Loading
      this.events.loading = true

      // Data
      this.events.data = []

      // Request
      const params = {
        userId: authStore.user.userId,
        page: this.events.pagination.page || defaultPagination.page,
        perPage: this.events.pagination.perPage || defaultPagination.perPage,
        sort: [
          { order: 'DESC', orderBy: 'createdAt' },
        ],
      }

      Object.assign(params, givenParams)

      const resp = await api.get('events', params)
      this.events.data = resp.data.data || []
      this.events.pagination = resp.data.pagination || defaultPagination

      // Loading
      this.events.loading = false
    },

    changePage(page, scroll = true) {
      this.events.pagination.page = page
      this.fetchEvents()
      if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    initEvent() {
      this.clearEvent()
      this.event.data.date = new Date().toISOString().split('T')[0]
      this.event.data.userId = authStore.user.userId
    },

    async deleteEvent(eventId, notify = false) {
      // Remove in local
      this.events.data.splice(this.events.data.findIndex(event => event.eventId === eventId), 1)

      // Request
      const resp = await api.del(`event/${eventId}`)

      if (resp.status !== 200) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Event deleted', 'success')
      }

      return true
    },

    async createEvent(item, notify = false) {
      const music = {
        ...item
      }

      music.seasons = item?.seasons.map(season => season.seasonId) || [];
      music.people = item?.people.map(person => person.personId) || [];
      music.events = item?.events.map(event => event.eventId) || [];

      // Loading
      this.event.loading = true

      // Request
      const resp = await api.post('events', event)

      if (resp.status !== 201) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Event created', 'success')
      }

      // Append in local
      if (resp.data?.data) {
        this.events.data.unshift(resp.data.data)
      } else {
        this.events.data.unshift(item)
      }

      // Loading
      this.event.loading = false

      return true
    },

    async updateEvent(item, notify = false) {
      const music = {
        ...item
      }

      music.seasons = item?.seasons.map(season => season.seasonId) || [];
      music.people = item?.people.map(person => person.personId) || [];
      music.events = item?.events.map(event => event.eventId) || [];

      // Request
      const resp = await api.put(`event/${event.eventId}`, event)

      if (resp.status !== 200) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Event updated', 'success')
      }

      // Update in local list
      const index = this.events.data.findIndex(item => item?.eventId && (item.eventId === event.eventId))
      if (resp.data?.data) {
        this.events.data.splice(index, 1, resp.data.data)
      } else {
        this.events.data.splice(index, 1, item)
      }

      return true
    },
  },
})
