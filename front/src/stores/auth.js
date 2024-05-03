import { defineStore } from 'pinia'
import { get, post } from '@/helpers/api';
import { notify } from '@/helpers/notif.js'
import router from '@/router';

export const useAuthStore = defineStore('auth',
  {
    persist: true,
    state: () => ({
      authenticated: true,
      token: null,
      user: {},
      authModal: {
        type: 'login',
        show: false,
      },
    }),

    actions: {

      toggleModal(el = 'login') {
        this.authModal.type = el;
        this.authModal.show = !this.authModal.show;
      },

      setModal(type) {
        this.authModal.type = type;
        this.authModal.show = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      async validateToken() {

        if (!this.authenticated) {
          router.push('/')
          return false;
        }

        // get('customer/validate-token', { email: this.user.email, token: this.token || this.user.connection_token }).then(resp => {

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

        if (!this.authenticated) {
          return false;
        }
        // get('customer/infos', { email: this.user.email, token: this.token || this.user.connection_token }).then(resp => {

        //   if (resp.error) {
        //     notify(resp.error, 'error');
        //     return false;
        //   }

        //   this.user = resp.data[0]
        //   this.token = resp.data[0].connection_token
        //   this.authenticated = true

        //   return true;
        // }).catch(error => {
        //   notify(`Une erreur est survenue: ${error}`, 'error');
        //   return false;
        // });
      },

      async verifyEmail(email, token) {

        if (!email || !token) {
          notify('Veuillez renseigner votre e-mail et token', 'error');
          return false;
        }

        // get('customer/verify-email', { email, token }).then(resp => {

        //   if (resp.error) {
        //     notify(resp.error, 'error');
        //     return false;
        //   }

        //   notify(`Votre e-mail a été vérifié avec succès !`, 'success');

        //   return true;
        // }).catch(error => {
        //   notify(`Une erreur est survenue: ${error}`, 'error');
        //   return false;
        // });
      },

      async forgotPassword(email) {

        if (!email) {
          notify('Veuillez renseigner votre email', 'error');
          return false;
        }

        // get('customer/forgot-password', { email }).then(resp => {

        //   if (resp.error) {
        //     notify(resp.error, 'error');
        //     return false;
        //   }

        //   notify(`Un code de réinitialisation vous a été envoyé par e-mail !`, 'success');

        //   return true;
        // }).catch(error => {
        //   notify(`Une erreur est survenue: ${error}`, 'error');
        //   return false;
        // });
      },

      async resetPassword(code, newPassword, email = this.fogotPasswordEmail) {

        let missing_fields = [];
        if (!email) missing_fields.push('Email');
        else email = email.trim();
        if (!code) missing_fields.push('code');
        if (!newPassword) missing_fields.push('Nouveau mot de passe');
        else newPassword = newPassword.trim();

        if (missing_fields.length > 0) {
          notify(`Veuillez renseigner les champs suivants: ${missing_fields.join(', ')}`, 'error');
          return false;
        }

        // post('customer/reset-password', { email, code, new_password: newPassword }).then(resp => {

        //   if (resp.error) {
        //     notify(resp.error, 'error');
        //     return false;
        //   }

        //   notify(`Votre mot de passe a été réinitialisé avec succès !`, 'success');
        //   this.setModal('login');

        //   return true;
        // }).catch(error => {
        //   notify(`Une erreur est survenue: ${error}`, 'error');
        //   return false;
        // });
      },

      async register(user, redirect = '/') {

        let missing_fields = [];
        if (!user.first_name) missing_fields.push('Prénom');
        else user.first_name = user.first_name.trim();
        if (!user.last_name) missing_fields.push('Nom');
        else user.last_name = user.last_name.trim();
        if (!user.email) missing_fields.push('Email');
        else user.email = user.email.trim();
        if (!user.password) missing_fields.push('Mot de passe');
        else user.password = user.password.trim();
        if (!user.collect_data) missing_fields.push('Accepter les conditions');

        if (missing_fields.length > 0) {
          notify(`Veuillez renseigner les champs suivants: ${missing_fields.join(', ')}`, 'error');
          return false;
        }

        // post('customer/register', { customer: user }).then(resp => {

        //   if (resp.error) {
        //     notify(resp.error, 'error');
        //     return false;
        //   }

        //   this.authenticated = false
        //   this.authModal.show = true
        //   this.authModal.type = 'login'

        //   notify(`Vous vous êtes inscrit avec succès !`, 'success');

        //   return true;
        // }).catch(error => {
        //   this.authenticated = false
        //   notify(`Une erreur est survenue: ${error}`, 'error');
        //   return false;
        // });

        if (redirect) {
          router.push(redirect)
        }
      },

      async login(email, password, redirect = '/') {

        if (!email || !password) {
          notify('Veuillez renseigner votre email et mot de passe', 'error');
          return false;
        }

        if (email) email = email.trim();
        if (password) password = password.trim();

        // get('customer/login', { password, email }).then(resp => {

        //   if (resp.error) {
        //     notify(resp.error, 'error');
        //     return false;
        //   }

        //   this.user = resp.data[0]
        //   this.token = resp.data[0].connection_token
        //   this.authenticated = true
        //   this.authModal.show = false
        //   notify(`${hello()} ! Vous êtes maintenant connecté`, 'success');

        //   return true;
        // }).catch(error => {
        //   this.authenticated = false
        //   notify(`Une erreur est survenue: ${error}`, 'error');
        //   return false;
        // });

        // if (redirect) {
        //   router.push(redirect)
        // }
      },

      logout(redirect = '/') {

        this.authenticated = false
        this.authModal.show = false

        this.user = {}
        if (redirect) {
          router.push(redirect)
        }
        notify('Vous avez été déconnecté !', 'info');
      },

    },
    getters: {
      cartSize() {
        return Object.keys(this.cart).length;
      },
      cartTotal() {
        return Object.values(this.cart).reduce((acc, curr) => acc + curr, 0);
      },
    }
  },
)