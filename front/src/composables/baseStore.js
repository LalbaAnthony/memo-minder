import { defineStore } from 'pinia'
import { api } from '@/composables/api'
import { useAuthStore } from '@/stores/auth'
import { notif } from '@/composables/notif.js'

const authStore = useAuthStore()

export function createBaseStore(config) {
    return defineStore(config.name, {
        state: () => ({
            primaryKey: config?.primaryKey || 'id',
            nicename: config?.nicename || 'Item',
            items: {
                loading: true,
                data: [],
                pagination: config.pagination,
            },
            item: {
                loading: true,
                data: {},
            },

            ...config?.state || {},
        }),

        actions: {
            clearItem() {
                this.item.data = {}
                this.item.loading = true
            },

            clearItems() {
                this.items.data = []
                this.items.loading = true
                this.items.pagination = config.pagination
            },

            resetPagination() {
                this.items.pagination = config.pagination
            },

            async fetchItem(itemId) {
                itemId = parseInt(itemId)

                this.item.loading = true

                // If the record is already loaded, we don’t fetch again.
                if (this.item.data[this.primaryKey] !== itemId) {
                    const found = this.items.data.find(i => i[this.primaryKey] === itemId)
                    if (found) {
                        this.item.data = found
                    } else {
                        const params = { userId: authStore.user.userId }
                        this.clearItem()
                        const resp = await api.get(`${config.endpoints.one}/${itemId}`, params)
                        this.item.data = resp.data.data || {}
                    }
                }

                this.item.loading = false
            },

            async fetchItems(givenParams = {}) {
                this.items.loading = true

                // Clear the local list before fetching
                this.clearItems()

                const params = {
                    userId: authStore.user.userId,
                    page: this.items.pagination.page || config.pagination.page,
                    perPage: this.items.pagination.perPage || config.pagination.perPage,
                }

                // Merge custom parameters
                Object.assign(params, givenParams)

                const resp = await api.get(`${config.endpoints.all}`, params)
                this.items.data = resp.data.data || []
                this.items.pagination = resp.data.pagination || config.pagination

                this.items.loading = false
            },

            changePage(page, scroll = true) {
                this.items.pagination.page = page
                this.fetchItems()
                if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' })
            },

            initItem() {
                this.clearItem()

                if (typeof config.initItem === 'function') {
                    config.initItem(this.item.data)
                }

                this.item.data.userId = authStore.user.userId
            },

            async deleteItem(itemId, notify = true) {
                // Remove from local list using the id key
                const index = this.items.data.findIndex(i => i[this.primaryKey] === itemId)
                if (index !== -1) this.items.data.splice(index, 1)

                const resp = await api.del(`${config.endpoints.delete}/${itemId}`)
                if (resp.status !== 200) {
                    notif.notify(resp.data.message, 'error')
                    return false
                } else if (notify) {
                    notif.notify(`${this.nicename} deleted`, 'success')
                }

                return true
            },

            async createItem(item, notify = false) {
                // Clone the item to allow modifications
                let newItem = { ...item }

                // Use the mapping function to convert relationships if provided
                if (typeof config.mapRelations === 'function') {
                    newItem = config.mapRelations(newItem)
                }

                const resp = await api.post(`${config.endpoints.create}`, newItem)
                if (resp.status !== 201) {
                    notif.notify(resp.data.message, 'error')
                    return false
                } else if (notify) {
                    notif.notify(`${this.nicename} created`, 'success')
                }

                // Append the created item to the local list
                if (resp.data?.data) {
                    this.items.data.unshift(resp.data.data)
                } else {
                    this.items.data.unshift(newItem)
                }

                return true
            },

            async updateItem(item, notify = false) {
                // Clone the item to allow modifications
                let updatedItem = { ...item }

                if (typeof config.mapRelations === 'function') {
                    updatedItem = config.mapRelations(updatedItem)
                }

                const resp = await api.put(`${config.endpoints.update}/${item[this.primaryKey]}`, updatedItem)
                if (resp.status !== 200) {
                    notif.notify(resp.data.message, 'error')
                    return false
                } else if (notify) {
                    notif.notify(`${this.nicename} updated`, 'success')
                }

                // Update the local list
                const index = this.items.data.findIndex(i => i[this.primaryKey] === item[this.primaryKey])
                if (resp.data?.data) {
                    this.items.data.splice(index, 1, resp.data.data)
                } else {
                    this.items.data.splice(index, 1, updatedItem)
                }

                return true
            },

            ...config?.actions || {},
        },

        getters: {
            ...config?.getters || {},
        },
    })
}
