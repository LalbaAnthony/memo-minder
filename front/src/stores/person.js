import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api'
import { useAuthStore } from '@/stores/auth'
import { notify } from '@/helpers/notif.js'

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

          const resp = await get(`person/${personId}`, params)
          this.person.data = resp.data.data || {}
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

      const resp = await get('people', params)
      this.people.data = resp.data.data || []
      this.people.pagination = resp.pagination || { page: 1, perPage: 10, total: 1 }

      // Loading
      this.people.loading = false
    },

    changePage(page, scroll = true) {
      this.people.pagination.page = page
      this.fetchPeople()
      if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    async deletePerson(personId) {
      // Remove in local
      this.people.data.splice(this.people.data.findIndex(person => person.personId === personId), 1)

      // Request
      const resp = await del(`person/${personId}`)

      if (resp.status !== 200) {
        notify(resp.data.message, 'error')
        return false
      }

      return true
    },

    async createPerson(person) {
      // Loading
      this.person.loading = true

      // Request
      const resp = await post('people', person)

      if (resp.status !== 201) {
        notify(resp.data.message, 'error')
        return false
      }

      // Append in local
      this.people.data.unshift(resp.data.data)

      // Loading
      this.person.loading = false

      return true
    },

    async updatePerson(person) {
      // Loading
      this.person.loading = true

      // Request
      const resp = await put(`person/${person.personId}`, person)

      if (resp.status !== 201) {
        notify(resp.data.message, 'error')
        return false
      }

      // Update in local list
      const index = this.people.data.findIndex(p => p.personId === person.personId)
      this.people.data.splice(index, 1, resp.data.data)

      // Loading
      this.person.loading = false

      return true
    },
  },
})
