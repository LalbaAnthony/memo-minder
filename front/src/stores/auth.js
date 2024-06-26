import { defineStore } from 'pinia'
import { notify } from '@/helpers/notif.js'
import router from '@/router';
import { get, post, put, del } from '@/helpers/api';

export const useAuthStore = defineStore('auth',
  {
    persist: true,
    state: () => ({
      authenticated: false,
      token: null,
      user: {},
      fogotPasswordEmail: '',
    }),

    actions: {
      async validateToken() {

        if (!this.authenticated) {
          this.logout()
          return false;
        }

        await post('validate-token', { userId: this.user.userId, token: this.user.connectionToken || this.token }).then(resp => {

          if (resp.status === 'error') {
            this.logout()
            notify(resp.message, 'error');
            return false;
          } else if (resp.status === 'success') {
            return true;
          }
        }).catch(error => {
          this.logout()
          notify(`An error occured: ${error}`, 'error');
          return false;
        });
      },

      async fetchUserInfos() {

        await get(`user-infos/${this.user.userId}`).then(resp => {

          if (resp.status === 'error') {
            notify(resp.message, 'error');
            return false;
          }

          this.user = resp.data
          this.token = resp.data.connectionToken
          this.authenticated = true

          return true;
        }).catch(error => {
          this.logout()
          notify(`An error occured: ${error}`, 'error');
          return false;
        });
      },

      async updateUserInfos() {

        await put(`user-update/${this.user.userId}`, this.user).then(resp => {

          if (resp.status === 'error') {
            notify(resp.message, 'error');
            return false;
          }

          notify('Your informations have been updated', 'success');

          return true;
        }).catch(error => {
          notify(`An error occured: ${error}`, 'error');
          return false;
        });
      },

      async verifyEmail(email, token) {
        console.log('verifyEmail', email, token);
      },

      async forgotPassword(email) {
        console.log('forgotPassword', email);
      },

      async resetPassword(code, newPassword, email = this.fogotPasswordEmail) {
        console.log('resetPassword', code, newPassword, email);
      },

      async register(user, redirect = '/auth') {

        this.logout()

        await post('register', user).then(resp => {

          if (resp.status === 'error') {
            notify(resp.message, 'error');
            return false;
          }

          notify(`You have been registered`, 'success');

          return true;
        }).catch(error => {
          notify(`An error occured: ${error}`, 'error');
          return false;
        });

        if (redirect) {
          router.push(redirect)
        }
      },

      async login(email, password, redirect = '/') {

        await post('login', { email, password }).then(resp => {

          if (resp.status === 'error') {
            notify(resp.message, 'error');
            return false;
          }

          this.user = resp.data
          this.token = resp.data.connectionToken
          this.authenticated = true

          notify('You have been logged in', 'success');

          return true;
        }).catch(error => {
          this.logout()
          notify(`An error occured: ${error}`, 'error');
          return false;
        });

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
        notify('You have been logged out', 'info');
      },
    },
  },
)