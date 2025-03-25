import { defineStore } from 'pinia'
import axios from 'axios'

const quotesApi = axios.create({
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
    lifeTime: 1000 * 60 * 60 * 24, // 24 hours
  }),

  actions: {
    async fetchQuote() {
      // Loading
      this.quote.loading = true

      // Data
      this.quote.data = {}

      const resp = await quotesApi.get('/quote')
      this.quote.data = resp.data || {}

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

      if (!this.lastFetch || ((nowDate - lastFetch) > this.lifeTime) || !this.quote?.data?.quote) {
        await this.fetchQuote()
      }
    },
  },
})
