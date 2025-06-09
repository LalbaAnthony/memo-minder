<template>
  <select v-model="moodId" id="mood" class="sm:w-48 w-full px-4 p-2 rounded-lg bg-gray-dark text-light">
    <option value="" disabled>Mood</option>
    <option v-for="(value, key) in moodStore.items.data" :key="key" :value="value.moodId"
      :selected="value.moodId === moodId">
      {{ value?.name }}</option>
  </select>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useMoodStore } from '@/stores/mood'

const props = defineProps({
  value: {
    type: Number,
    required: false,
  },
})

const moodStore = useMoodStore()

const moodId = ref(props.value)

const emit = defineEmits(['update'])

onMounted(() => {
  if (!moodStore.items.data || moodStore.items.data.length === 0) moodStore.fetchItems()
})

watch(() => props.value, (newValue) => {
  if (newValue !== moodId.value) {
    moodId.value = newValue
  }
});

watch(() => moodId.value, () => {
  emit('update', moodId.value || null)
})

</script>
