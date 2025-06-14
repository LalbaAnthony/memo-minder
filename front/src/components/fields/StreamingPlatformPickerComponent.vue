<template>
  <select v-model="streamingPlatformKey" id="streamingPlatform"
    class="select sm:w-48 w-full px-4 p-2 rounded-lg bg-gray-dark text-light">
    <option value="" disabled>Platform</option>
    <option v-for="(value, key) in allStreamingPlatforms" :key="key" :value="key"
      :selected="key === streamingPlatformKey">
      {{ value?.label }}</option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue'
import { allStreamingPlatforms } from '@/composables/streamingPlatform'

const props = defineProps({
  value: {
    type: String,
    required: false,
  },
})

const streamingPlatformKey = ref(props.value)

const emit = defineEmits(['update'])

watch(() => props.value, (newValue) => {
  if (newValue !== streamingPlatformKey.value) {
    streamingPlatformKey.value = newValue
  }
});

watch(() => streamingPlatformKey.value, () => {
  emit('update', streamingPlatformKey.value || null)
})

</script>
