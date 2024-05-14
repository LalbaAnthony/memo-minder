<template>
  <div :class="['fixed right-0 z-20 flex flex-col justify-end gap-2 p-4', isMobile() ? 'bottom-20' : 'bottom-0']">
    <!-- Scroll to top -->
    <div v-if="isMobile()" @click="goTop()"
      class="flex items-center justify-center bg-dark-gray text-white rounded-full p-4 hover:scale-105 transition-transform duration-200 border border-dark-gray">
      <ChevronUpIcon class="size-8" />
    </div>

    <!-- Add button -->
    <router-link :to="`${route.path}/add`"
      class="flex items-center justify-center bg-primary text-white rounded-full p-4 hover:scale-105 transition-transform duration-200 border border-dark-gray">
      <PlusIcon class="size-8" />
    </router-link>
    
  </div>
</template>

<script setup>
import { ChevronUpIcon } from '@heroicons/vue/24/solid'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { isMobile } from '@/helpers/helpers.js'
import { useRoute, } from 'vue-router'

const route = useRoute()

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

</script>