<template>
  <div class="fixed bottom-0 right-0 z-30 flex flex-col justify-end gap-2 p-4">
    <!-- Scroll to top -->
    <div v-if="isMobile()" @click="goToTop()"
      class="flex items-center justify-center bg-dark-gray text-white rounded-full p-4 hover:scale-105 transition-transform duration-200 border border-dark-gray">
      <ChevronUpIcon class="h-6 w-6" />
    </div>

    <!-- Add button -->
    <router-link :to="`${route.path}/add`"
      class="flex items-center justify-center bg-primary text-white rounded-full p-4 hover:scale-105 transition-transform duration-200 border border-dark-gray">
      <PlusIcon class="h-6 w-6" />
    </router-link>
    
  </div>
</template>

<script setup>
import { ChevronUpIcon } from '@heroicons/vue/24/solid'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { isMobile } from '@/helpers/helpers.js'
import { useRoute, } from 'vue-router'

const route = useRoute()

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

</script>