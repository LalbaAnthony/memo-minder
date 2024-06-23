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
          router.push('/auth')
          return false;
        }

        // get('validate-token', { email: this.user.email, token: this.token || this.user.connection_token }).then(resp => {

        //   if (resp.error) {
        //     this.logout()
        //     notify(resp.error, 'error');
        //     return false;
        //   }

        //   if (!resp.data[0].token_ok) {
        //     this.logout()
        //     return false;
        //   }

        //   return true;
        // }).catch(error => {
        //   this.logout()
        //   notify(`Une erreur est survenue: ${error}`, 'error');
        //   return false;
        // });
      },

      async getUserInfos() {
        console.log('getUserInfos');
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

      async register(user, redirect = '/') {
        console.log('register', user, redirect);

        if (redirect) {
          router.push(redirect)
        }
      },

      async login(email, password, redirect = '/') {

        post('login', {
          email,
          password,
        }).then(resp => {

          if (resp.error) {
            notify(resp.error, 'error');
            return false;
          }

          this.user = resp.data
          this.token = resp.data.connection_token
          this.authenticated = true
          notify('You have been logged in', 'success');

          return true;
        }).catch(error => {
          this.authenticated = false
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
        notify('You have been logged out', 'success');
      },

    },
  },
)