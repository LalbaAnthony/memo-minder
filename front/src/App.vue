<template>
  <div>
    <MainLayout v-if="authStore?.authenticated" />
    <main :class="[
      isMobile() && route.meta?.mobileMainClass ? route.meta?.mobileMainClass : '',
      !isMobile() && route.meta?.desktopMainClass ? route.meta?.desktopMainClass : '',
    ]">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { isMobile } from '@/composables/helpers'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

onMounted(async () => {
  await nextTick();

  // Remove pre-loader from index.html
  const preLoaderContainer = document.getElementById('pre-loader-container')
  if (preLoaderContainer) {
    preLoaderContainer.remove()
  }

  // Email verification
  setTimeout(() => { // For some reason, the authStore is not ready when the app is mounted so we wait a bit
    if (route.query.email && route.query.token) {
      authStore.verifyEmail(route.query.email, route.query.token)
    }
  }, 1000)
});
</script>
