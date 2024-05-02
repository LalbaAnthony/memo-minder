<template>
  <div class="fixed bottom-0 right-0 z-30 flex flex-col justify-end gap-2 p-4">
    <div v-if="isMobile()" @click="goToTop()"
      class="flex items-center justify-center bg-dark-gray text-white rounded-full p-4 hover:scale-105 transition-transform duration-200">
      <ChevronUpIcon class="h-8 w-8" />
    </div>
    <router-link :to="`${route.path}/add`"
      class="flex items-center justify-center bg-primary text-white rounded-full p-4 hover:scale-105 transition-transform duration-200">
      <PlusIcon class="h-8 w-8" />
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