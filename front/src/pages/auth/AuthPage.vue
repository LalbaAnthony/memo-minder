<template>
  <div class="rounded-lg border border-gray p-4 max-w-md mx-auto mt-8">
    <h2 class="text-center text-light text-2xl font-semibold mt-4 mb-8">{{ tabs[authStore.tab].title }}</h2>
    <component :is="tabs[authStore.tab].component">
      <div class="flex flex-row-reverse align-items-center justify-between m-4">
        <button v-if="authStore.tab === 'login' || authStore.tab === 'register'" class="text-light transition-colors duration-200 hover:text-gray-light cursor-pointer"
          @click="authStore.tab = 'forgotPassword'">Forgot password ?</button>
        <button v-if="authStore.tab === 'forgotPassword'" class="text-light transition-colors duration-200 hover:text-gray-light cursor-pointer"
          @click="authStore.tab = 'login'">Back</button>
        <button v-if="authStore.tab === 'resetPassword'" class="text-light transition-colors duration-200 hover:text-gray-light cursor-pointer"
          @click="authStore.tab = 'forgotPassword'">Back</button>
      </div>
    </component>
  </div>
</template>

<script setup>
import AuthLogin from '@/components/auth/AuthLogin.vue'
import AuthRegister from '@/components/auth/AuthRegister.vue'
import AuthForgotPassword from '@/components/auth/AuthForgotPassword.vue'
import AuthResetPassword from '@/components/auth/AuthResetPassword.vue'
import { ref, shallowRef } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const tabs = ref({
  login: {
    title: 'Login',
    component: shallowRef(AuthLogin),
  },
  register: {
    title: 'Register',
    component: shallowRef(AuthRegister),
  },
  forgotPassword: {
    title: 'Forgot Password ?',
    component: shallowRef(AuthForgotPassword),
  },
  resetPassword: {
    title: 'Reset your Password',
    component: shallowRef(AuthResetPassword),
  }
})

</script>