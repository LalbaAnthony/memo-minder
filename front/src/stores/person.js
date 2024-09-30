import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

export const usePersonStore = defineStore('person', {
  state: () => ({
    people: {
      loading: true,
      data: [],
      pagination: { page: 1, perPage: 10, total: 1 },
    },
    person: {
      loading: false,
      data: {},
    },
  }),

  actions: {
    clearPerson() {
      this.person.data = {}
    },

    async fetchPerson(personId) {
      // Loading
      this.person.loading = true

      // Data
      this.person.data = {}

      const params = {
        userId: authStore.user.userId,
      }

      const resp = await get(`person/${personId}`, params);
      this.person.data = resp.data || {};

      // Loading
      this.person.loading = false
    },

    async fetchPeople(givenParams = {}) {
      // Loading
      this.people.loading = true

      // Data
      this.people.data = []

      // Request
      const params = {
        userId: authStore.user.userId,
        page: this.people.pagination.page || 1,
        perPage: this.people.pagination.perPage || 10,
        sort: [
          { order: 'DESC', orderBy: 'createdAt' },
        ],
      }

      Object.assign(params, givenParams)

      const resp = await get('people', params);
      this.people.data = resp.data || [];
      this.people.pagination = resp.pagination || { page: 1, perPage: 10, total: 1 };

      // Loading
      this.people.loading = false
    },

    async deletePerson(personId) {

      // Remove in local
      this.people.data.splice(this.people.data.findIndex(person => person.personId === personId), 1)

      // Request
      console.log('delete personId', personId)
    },

    async createPerson(person) {
      // Request
      console.log('create person', person)
    },

    async updatePerson(person) {
      // Request
      console.log('update person', person)
    },
  },
})
