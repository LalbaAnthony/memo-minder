import { defineStore } from 'pinia'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://quotes-api-self.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const useQuoteStore = defineStore('quote', {
  persist: true,
  state: () => ({
    quote: {
      loading: false,
      data: {},
    },
    lastFetch: null,
  }),

  actions: {
    async fetchQuote() {
      // Loading
      this.quote.loading = true

      // Data
      this.quote.data = {}

      const resp = await api.get('/quote')
      this.quote.data = resp.data || {};

      // If quote.data.quote contains a ", ', or ”, remove it
      if (this.quote.data.quote) {
        this.quote.data.quote = this.quote.data.quote.replace(/["'“”]/g, '')
      }

      // Last fetch
      this.lastFetch = new Date()

      // Loading
      this.quote.loading = false
    },

    async fetchQuoteIfTooOld() {
      const nowDate = new Date()
      const lastFetch = this.lastFetch ? new Date(this.lastFetch) : null

      // New fetch every 12 hours
      if (!this.lastFetch || (nowDate - lastFetch) > 43200000) {
        await this.fetchQuote()
      }
    },
  },
})
