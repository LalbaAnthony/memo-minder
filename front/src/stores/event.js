import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

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
    async fetchEvent(idEvent) {
      // Loading
      this.event.loading = true

      // Data
      this.event.data = {}

      const params = {
        userId: authStore.user.userId,
      }

      const resp = await get(`event/${idEvent}`, params);
      this.event.data = resp.data || {};

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
        page: this.events.pagination.page || 1,
        perPage: this.events.pagination.perPage || 10,
        sort: [
          { order: 'DESC', orderBy: 'createdAt' },
        ],
      }

      Object.assign(params, givenParams)

      const resp = await get('events', params);
      this.events.data = resp.data || [];
      this.events.pagination = resp.pagination || { page: 1, perPage: 10, total: 1 };

      // Loading
      this.events.loading = false
    },

    async deleteEvent(idEvent) {

      // Remove in local
      this.events.data.splice(this.events.data.findIndex(event => event.idEvent === idEvent), 1)

      // Request
      console.log('delete idEvent', idEvent)
    },

    async createEvent(event) {
      // Request
      console.log('create event', event)
    },

    async updateEvent(event) {
      // Request
      console.log('update event', event)
    },
  },
})
