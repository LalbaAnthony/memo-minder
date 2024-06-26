import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

export const useEventStore = defineStore('event', {
  state: () => ({
    events: {
      loading: true,
      data: [],
      pagination: { page: 1, per_page: 10, total: 1 },
    },
  }),

  actions: {
    async fetchEvents(givenParams = {}) {
      // Loading
      this.events.loading = true

      // Data
      this.events.data = []


      // Request
      const params = {
        user_id: authStore.user.user_id,
        page: this.events.pagination.page || 1,
        per_page: this.events.pagination.per_page || 10,
        sort: [
          { order: 'ASC', order_by: 'sort_order' },
          { order: 'DESC', order_by: 'stock_quantity' }
        ],
      }

      Object.assign(params, givenParams)


      const resp = await get('events', params);
      this.events.data = resp.data || [];
      this.events.pagination = resp.pagination || { page: 1, per_page: 10, total: 1 };

      // Loading
      this.events.loading = false
    },
  },
})
