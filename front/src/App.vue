<template>
  <div>
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import { notify } from '@/helpers/notif.js'

notify('tet', 'error')

</script>
