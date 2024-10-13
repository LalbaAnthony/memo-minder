import { defineStore } from 'pinia'
import { notify, clearNotifications } from '@/helpers/notif.js'
import router from '@/router'
import { get, post, put } from '@/helpers/api'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    authenticated: false,
    token: null,
    user: {},
    fogotPasswordEmail: '',
  }),

  actions: {
    async validateToken() {

      if (!this.authenticated || !(this.user.connectionToken || this.token)) {
        this.logout()
        return false
      }

      await post('validate-token', { userId: this.user.userId, token: this.user.connectionToken || this.token }).then(resp => {
        if (resp.status === 200) {
          return true
        } else {
          this.logout()
          return false
        }
      }).catch(error => {
        notify(`An error occured: ${error}`, 'error')
        return false
      })
    },

    async fetchUserInfos() {

      await get(`user-infos/${this.user.userId}`).then(resp => {

        if (resp.status !== 200) {
          notify(resp.data.message, 'error')
          return false
        }

        this.user = resp.data.data
        this.token = resp.data.data.connectionToken
        this.authenticated = true

        return true
      }).catch(error => {
        this.logout()
        notify(`An error occured: ${error}`, 'error')
        return false
      })
    },

    async updateUserInfos() {

      const userPayload = this.user
      delete userPayload.connectionToken
      delete userPayload.password

      await put(`user-update/${this.user.userId}`, userPayload).then(resp => {

        if (resp.status === 'error') {
          notify(resp.data.message, 'error')
          return false
        }

        // notify('Your informations have been updated', 'success')

        return true
      }).catch(error => {
        notify(`An error occured: ${error}`, 'error')
        return false
      })
    },

    async verifyEmail(email, token) {
      // TODO: WIP
      console.log('verifyEmail', email, token)
    },

    async forgotPassword(email) {
      // TODO: WIP
      console.log('forgotPassword', email)
    },

    async resetPassword(code, newPassword, email = this.fogotPasswordEmail) {
      // TODO: WIP
      console.log('resetPassword', code, newPassword, email)
    },

    async deleteAccount() {
      // TODO: WIP
      console.log('deleteAccount')
    },

    async register(user, redirect = '/auth') {

      this.logout()

      await post('register', user).then(resp => {

        if (resp.status !== 201) {
          notify(resp.data.message, 'error')
          return false
        }

        notify(`You have been registered`, 'success')

        return true
      }).catch(error => {
        notify(`An error occured: ${error}`, 'error')
        return false
      })

      if (redirect) {
        router.push(redirect)
      }
    },

    async login(email, password, redirect = '/') {

      await post('login', { email, password }).then(resp => {

        if (resp.status !== 200) {
          notify(resp.data.message, 'error')
          return false
        }

        this.user = resp.data.data
        this.token = resp.data.data.connectionToken
        this.authenticated = true

        notify('You have been logged in', 'success')

        return true
      }).catch(error => {
        notify(`An error occured: ${error}`, 'error')
        return false
      })

      if (redirect) {
        router.push(redirect)
      }
    },

    logout(redirect = '/auth') {

      this.authenticated = false
      this.user = {}
      this.token = null

      if (redirect) {
        router.push(redirect)
      }
      clearNotifications()
      notify('You have been logged out', 'info')
    },
  },
},
)