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

        await get('validate-token', { userId: this.user.userId, token: this.user.connection_token || this.token }).then(resp => {

          if (resp.status === 'error') {
            this.logout()
            notify(resp.message, 'error');
            return false;
          } else if (resp.status === 'success') {

            if (resp.data.connection_token !== this.token) {
              this.logout()
              notify('Invalid token', 'error');
              return false;
            }

            return true;
          }
        }).catch(error => {
          this.logout()
          notify(`An error occured: ${error}`, 'error');
          return false;
        });
      },

      async getUserInfos() {

        await get('user-infos', { email: this.user.email, token: this.user.connection_token || this.token }).then(resp => {

          if (resp.status === 'error') {
            notify(resp.message, 'error');
            return false;
          }

          this.user = resp.data
          this.token = resp.data.connection_token
          this.authenticated = true

          notify('You have been logged in', 'success');

          return true;
        }).catch(error => {
          this.logout()
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
          this.token = resp.data.connection_token
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