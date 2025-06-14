<template>
  <select v-model="languageKey" id="language" class="select sm:w-48 w-full px-4 p-2 rounded-lg bg-gray-dark text-light">
    <option value="" disabled>Language</option>
    <option v-for="(value, key) in allLanguages" :key="key" :value="key" :selected="key === languageKey">
      {{ isMobile ? value?.flag?.embeded : '' }}&nbsp;{{ value?.label }}
    </option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue'
import { allLanguages } from '@/composables/languages'
import { isMobile } from '@/composables/helpers'

const props = defineProps({
  value: {
    type: String,
    required: false,
  },
})

const languageKey = ref(props.value)

const emit = defineEmits(['update'])

watch(() => props.value, (newValue) => {
  if (newValue !== languageKey.value) {
    languageKey.value = newValue
  }
});

watch(() => languageKey.value, () => {
  emit('update', languageKey.value || null)
})

</script>
