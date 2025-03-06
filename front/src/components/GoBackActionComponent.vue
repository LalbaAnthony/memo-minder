<template>
  <!-- Go back button -->
  <div v-if="route.name.includes('details')" @click="goBack()"
    class="flex items-center justify-start cursor-pointer text-gray-light">
    <ChevronLeftIcon class="size-6" />
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { useRoute, } from 'vue-router'

const route = useRoute()

function goBack() {
  window.history.back()
}

</script>