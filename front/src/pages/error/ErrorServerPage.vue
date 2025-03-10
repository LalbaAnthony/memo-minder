<template>
  <div class="fixed inset-0 flex flex-col items-center justify-center gap-4">
    <div class="flex flex-col items-center gap-2 pb-4">
      <p class="text-2xl font-bold text-light">Server is unreachable</p>
      <p class="text-center text-lg text-gray-light">Either your internet connection is made of potatoes or the server is down.</p>
    </div>
    <button
      class="bg-dark-light text-light p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-dark"
      @click="tryAgagin()">
      <span class="mx-2 my-0.5">Try again</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function tryAgagin() {
  router.push('/')
}

</script>