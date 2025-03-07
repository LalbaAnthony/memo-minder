<template>
  <div class="rounded-lg border border-gray p-4 max-w-md mx-auto mt-8">

    <h2 class="text-center text-light text-2xl font-semibold mt-4 mb-8">{{ tabs[type].title }}</h2>

    <component :is="tabs[type].component" @set-auth-type="(type) => changeTab(type)">
      <div class="flex flex-row-reverse align-items-center justify-between m-4">
        <button v-if="type === 'login' || type === 'register'" class="text-light transition-colors duration-200 hover:text-gray-light cursor-pointer"
          @click="changeTab('forgotPassword')">Forgot password ?</button>
        <button v-if="type === 'forgotPassword'" class="text-light transition-colors duration-200 hover:text-gray-light cursor-pointer"
          @click="changeTab('login')">Back</button>
        <button v-if="type === 'resetPassword'" class="text-light transition-colors duration-200 hover:text-gray-light cursor-pointer"
          @click="changeTab('forgotPassword')">Back</button>
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

const type = ref('login') // 'login' or 'register' or 'forgotPassword' or 'resetPassword'

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

function changeTab(t = 'login') {
  if (tabs.value[t]) {
    type.value = t
  }
}

</script>