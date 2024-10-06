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
    clearEvent() {
      this.event.data = {}
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

          const resp = await get(`event/${eventId}`, params);
          this.event.data = resp.data || {};
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

    changePage(page, scroll = true) {
      this.events.pagination.page = page
      this.fetchEvents()
      if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    initEvent() {
      this.event.data.date = new Date().toISOString()
      this.event.data.userId = authStore.user.userId
    },

    async deleteEvent(eventId) {

      // Remove in local
      this.events.data.splice(this.events.data.findIndex(event => event.eventId === eventId), 1)

      // Request
      await del(`event/${eventId}`);
    },

    async createEvent(event) {
        
        // Loading
        this.event.loading = true
        
        // Request
        await post('events', event);
  
        // Loading
        this.event.loading
    },

    async updateEvent(event) {
      
      // Loading
      this.event.loading = true
      
      // Request
      await put(`event/${this.event.data.eventId}`, event);

      // Loading
      this.event.loading = false
    },
  },
})
