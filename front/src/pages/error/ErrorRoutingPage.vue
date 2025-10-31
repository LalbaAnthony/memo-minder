<template>
  <div class="fixed inset-0 flex flex-col items-center justify-center gap-4">
    <div class="flex flex-col items-center gap-2 pb-4">
      <p class="text-2xl font-bold text-light">Page Not Found</p>
      <p class="text-center text-lg text-gray-light">What the heck are you looking for?</p>
    </div>
    <button
    class="bg-dark-light text-light p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-dark"
    @click="goBack()">
      <span class="mx-2 my-0.5">Go back</span>
    </button>
  </div>
</template>

<script setup>
import { routing } from '@/composables/routing';
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  routing.goBackSafe(router)
}

</script>