<template>
  <!-- Go back button -->
  <div class="flex items-center justify-start cursor-pointer text-gray-light" @click="goBack()">
    <ChevronLeftIcon class="size-7" />
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

function goBack() {
  window.history.back()
}

</script>