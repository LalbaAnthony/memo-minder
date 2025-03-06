<template>
  <div>
    <AppLayout v-if="authStore.authenticated" />
    <main>
      <GoBackAction />
      <RouterView />
    </main>
    <Footer v-if="route.name === 'home'" />
    <div v-if="isMobile()" class="h-24"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppLayout from '@/components/AppLayoutComponent.vue'
import GoBackAction from '@/components/GoBackActionComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import { isMobile } from '@/helpers/functions.js'
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
