<template>
  <div class="select sm:w-48 w-full rounded-lg bg-gray-dark text-light flex items-center justify-start gap-2 px-3">
    <!-- <div :style="`background-color: ${mood?.color}`" v-if="mood?.color" class="w-6 h-5 py-2 rounded-full">
    </div> -->
    <HeartIcon  class="size-6 text-primary-light" />
    <select v-model="moodId" id="mood" class="w-full">
      <option value="" disabled>Mood</option>
      <option v-for="(value, key) in moodStore.items.data" :key="key" :value="value.moodId"
        :selected="value.moodId === moodId">
        {{ value?.name }}</option>
    </select>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { HeartIcon } from '@heroicons/vue/24/solid'
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

// const mood = computed(() => {
//   return moodStore.items.data.find(item => item.moodId === moodId.value)
// })

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
