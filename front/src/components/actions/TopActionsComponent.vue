<template>
  <div class="flex items-center justify-start mt-2">
    <!-- Go back button -->
    <div v-if="props.goBackButton" class="cursor-pointer text-gray-light" @click="goBack()">
      <ChevronLeftIcon class="size-7" />
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { routing } from '@/composables/routing';

const router = useRouter()

const props = defineProps({
  goBackButton: {
    type: Boolean,
    required: false,
    default: false,
  },
})

function goBack() {
  routing.goBackSafe(router)
}

</script>