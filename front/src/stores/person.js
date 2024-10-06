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
      personId = parseInt(personId)

      // Loading
      this.person.loading = true

      // If person is already loaded, we don't make the request
      if (this.person.data.personId !== personId) {
        // Before making the request, we check if the element is already in local
        const person = this.people.data.find(person => person.personId === personId)
        if (person) {
          this.person.data = person
        } else {
          const params = {
            userId: authStore.user.userId,
          }

          this.clearPerson()

          const resp = await get(`person/${personId}`, params);
          this.person.data = resp.data || {};
        }
      }

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

    changePage(page, scroll = true) {
      this.people.pagination.page = page
      this.fetchPeople()
      if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async deletePerson(personId) {
      // Remove in local
      this.people.data.splice(this.people.data.findIndex(person => person.personId === personId), 1)

      // Request
      await del(`person/${personId}`);
    },

    async createPerson(person) {
      // Loading
        this.person.loading = true
        
        // Request
        await post('people', person);
  
        // Loading
        this.person.loading = false
    },

    async updatePerson(person) {
      // Loading
      this.person.loading = true
      
      // Request
      await put(`person/${this.person.data.personId}`, person);

      // Loading
      this.person.loading = false
    },
  },
})
