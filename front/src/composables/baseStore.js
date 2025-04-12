import { defineStore } from 'pinia'
import { api } from '@/composables/api'
import { useAuthStore } from '@/stores/auth'
import { notif } from '@/composables/notif.js'

const authStore = useAuthStore()
const defaultPagination = { page: 1, perPage: 20, total: 1 }

export function createBaseStore(entityConfig) {
    return defineStore(entityConfig.name, {
        state: () => ({
            items: {
                loading: true,
                data: [],
                pagination: defaultPagination,
            },
            item: {
                loading: false,
                data: {},
            },
        }),

        actions: {
            clearItem() {
                this.item.data = {}
                this.item.loading = false
            },

            clearItems() {
                this.items.data = []
                this.items.loading = false
                this.items.pagination = defaultPagination
            },

            resetPagination() {
                this.items.pagination = defaultPagination
            },

            async fetchItem(itemId) {
                itemId = parseInt(itemId)

                this.item.loading = true

                const idKey = entityConfig?.idKey || 'id'

                // If the record is already loaded, we don’t fetch again.
                if (this.item.data[idKey] !== itemId) {
                    const found = this.items.data.find(i => i[idKey] === itemId)
                    if (found) {
                        this.item.data = found
                    } else {
                        const params = { userId: authStore.user.userId }
                        this.clearItem()
                        const resp = await api.get(`${entityConfig.endpoint}/${itemId}`, params)
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
                    page: this.items.pagination.page || defaultPagination.page,
                    perPage: this.items.pagination.perPage || defaultPagination.perPage,
                    sort: [
                        { order: 'DESC', orderBy: 'createdAt' },
                    ],
                }

                // Merge custom parameters
                Object.assign(params, givenParams)

                const resp = await api.get(`${entityConfig.endpoint}s`, params)
                this.items.data = resp.data.data || []
                this.items.pagination = resp.data.pagination || defaultPagination

                this.items.loading = false
            },

            changePage(page, scroll = true) {
                this.items.pagination.page = page
                this.fetchItems()
                if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' })
            },

            initItem() {
                this.clearItem()

                if (typeof entityConfig.initItem === 'function') {
                    entityConfig.initItem(this.item.data)
                }

                this.item.data.userId = authStore.user.userId
            },

            async deleteItem(itemId, notify = true) {
                // Remove from local list using the id key
                const idKey = entityConfig.idKey
                const index = this.items.data.findIndex(i => i[idKey] === itemId)
                if (index !== -1) this.items.data.splice(index, 1)

                const resp = await api.del(`${entityConfig.endpoint}/${itemId}`)
                if (resp.status !== 200) {
                    notif.notify(resp.data.message, 'error')
                    return false
                } else if (notify) {
                    notif.notify(`${entityConfig?.nicename || 'Item'} deleted`, 'success')
                }

                return true
            },

            async createItem(item, notify = false) {
                this.item.loading = true

                // Clone the item to allow modifications
                let newItem = { ...item }

                // Use the mapping function to convert relationships if provided
                if (typeof entityConfig.mapRelations === 'function') {
                    newItem = entityConfig.mapRelations(newItem)
                }

                const resp = await api.post(`${entityConfig.endpoint}s`, newItem)
                if (resp.status !== 201) {
                    notif.notify(resp.data.message, 'error')
                    this.item.loading = false
                    return false
                } else if (notify) {
                    notif.notify(`${entityConfig?.nicename || 'Item'} created`, 'success')
                }

                // Append the created item to the local list
                if (resp.data?.data) {
                    this.items.data.unshift(resp.data.data)
                } else {
                    this.items.data.unshift(item)
                }

                this.item.loading = false

                return true
            },

            async updateItem(item, notify = false) {
                this.item.loading = true

                // Clone the item to allow modifications
                let updatedItem = { ...item }

                if (typeof entityConfig.mapRelations === 'function') {
                    updatedItem = entityConfig.mapRelations(updatedItem)
                }

                const idKey = entityConfig.idKey
                const resp = await api.put(`${entityConfig.endpoint}/${item[idKey]}`, updatedItem)
                if (resp.status !== 200) {
                    notif.notify(resp.data.message, 'error')
                    return false
                } else if (notify) {
                    notif.notify(`${entityConfig?.nicename || 'Item'} updated`, 'success')
                }

                // Update the local list
                const index = this.items.data.findIndex(i => i[idKey] === item[idKey])
                if (resp.data?.data) {
                    this.items.data.splice(index, 1, resp.data.data)
                } else {
                    this.items.data.splice(index, 1, item)
                }

                return true
            },
        },
    })
}
