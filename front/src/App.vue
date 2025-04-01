<template>
  <div>
    <AppLayout v-if="authStore?.authenticated" />
    <main :class="[
      isMobile() ? 'min-h-screen' : '',
      isMobile() && route.meta?.mobileMainClass ? route.meta?.mobileMainClass : '',
      !isMobile() && route.meta?.desktopMainClass ? route.meta?.desktopMainClass : '',
    ]">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { isMobile } from '@/composables/helpers.js'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  if (route.query.email && route.query.token) {
    authStore.verifyEmail(route.query.email, route.query.token)
  }
});
</script>
