<template>
  <div>
    <AppLayout v-if="authStore?.authenticated" />
    Add more bottom padding if 
    <main :class="[isMobile() && route?.name && (route.name.includes('details') || route.name.includes('add') || route.name == 'account') ? 'min-h-screen pb-48' : '']">
      <GoBackAction
        v-if="route?.name && (route.name.includes('details') || route.name.includes('add') || route.name === 'infos' || route.name == 'account' ||route.name === 'terms-and-conditions')" />
      <RouterView />
    </main>
    <Footer v-if="route.name === 'home'" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
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
