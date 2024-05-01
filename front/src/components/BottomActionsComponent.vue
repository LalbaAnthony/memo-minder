<template>
  <div class="fixed bottom-0 right-0 z-30 flex flex-col justify-end gap-2 p-4">
    <div v-if="isMobile()" @click="goToTop()" class="flex items-center justify-center bg-dark-gray text-white rounded-full p-4">
      <ChevronUpIcon class="h-8 w-8" />
    </div>
    <router-link v-for="action in props.actions" :key="action.label" :to="action.to"
    class="flex items-center justify-center bg-dark-gray text-white rounded-full px-4 py-2 mx-2">
      {{ action.label }}
    </router-link>
  </div>
</template>

<script setup>
import { ChevronUpIcon } from '@heroicons/vue/24/solid'
import { isMobile } from '@/helpers/helpers.js'

const props = defineProps({
  actions: {
    type: Array,
    required: true,
  },
})

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

</script>