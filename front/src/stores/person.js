import { defineStore } from 'pinia'
import { api } from '@/helpers/api'
import { useAuthStore } from '@/stores/auth'
import { notif } from '@/helpers/notif.js'

const authStore = useAuthStore()

const defaultPagination = { page: 1, perPage: 10, total: 1 }

export const usePersonStore = defineStore('person', {
  state: () => ({
    people: {
      loading: true,
      data: [],
      pagination: defaultPagination,
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

          const resp = await api.get(`person/${personId}`, params)
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
        page: this.people.pagination.page || defaultPagination.page,
        perPage: this.people.pagination.perPage || defaultPagination.perPage,
        sort: [
          { order: 'DESC', orderBy: 'createdAt' },
        ],
      }

      Object.assign(params, givenParams)

      const resp = await api.get('people', params)
      this.people.data = resp.data.data || []
      this.people.pagination = resp.data.pagination || defaultPagination

      // Loading
      this.people.loading = false
    },

    changePage(page, scroll = true) {
      this.people.pagination.page = page
      this.fetchPeople()
      if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    initPerson() {
      this.clearPerson()
      this.person.data.userId = authStore.user.userId
    },

    async deletePerson(personId, notify = false) {
      // Remove in local
      this.people.data.splice(this.people.data.findIndex(person => person.personId === personId), 1)

      // Request
      const resp = await api.del(`person/${personId}`)

      if (resp.status !== 200) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Person deleted', 'success')
      }

      return true
    },

    async createPerson(person, notify = false) {
      // Loading
      this.person.loading = true

      // Request
      const resp = await api.post('people', person)

      if (resp.status !== 201) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Person created', 'success')
      }

      // Append in local
      this.people.data.unshift(resp.data.data)

      // Loading
      this.person.loading = false

      return true
    },

    async updatePerson(person, notify = false) {
      // Loading
      this.person.loading = true

      // Request
      const resp = await api.put(`person/${person.personId}`, person)

      if (resp.status !== 201) {
        notif.notify(resp.data.message, 'error')
        return false
      } else if (notify) {
        notif.notify('Person updated', 'success')
      }

      // Update in local list
      const index = this.people.data.findIndex(item => item?.personId && (item.personId === person.personId))
      this.people.data.splice(index, 1, resp.data.data)

      // Loading
      this.person.loading = false

      return true
    },
  },
})
