<template>

  <Dropdown v-if="moodStore?.moods?.data" side="right" button-style="bg-gray-dark" content-style="bg-gray">
    <template #button>
      <div class="inline-flex gap-2">
        <HeartIcon :class="['size-7 transition-color duration-500', mood?.name ? 'text-primary' : 'text-gray']" />
        <span>{{ mood?.name || 'Mood' }}</span>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2 px-4 py-2">
        <button v-for="mood in moodStore.moods.data" :key="mood.moodId"
          class="flex items-center justify-between rounded-md w-full px-2 py-1 text-light hover:bg-gray-light"
          @click="setMood(mood.moodId)">
          <span>{{ mood.name }}</span>
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
import Dropdown from '@/components/DropdownComponent.vue'
import { onMounted, ref, watch } from 'vue'
import { HeartIcon } from '@heroicons/vue/24/solid'
import { useMoodStore } from '@/stores/mood'

const props = defineProps({
  value: {
    type: Number,
    required: false,
  },
  enableColor: {
    type: Boolean,
    default: false,
  },
})

const moodStore = useMoodStore()

const show = ref(false)
const moodId = ref(props.value)
const mood = ref({})

const emit = defineEmits(['update'])

function setMood(id) {
  moodId.value = id
  show.value = false
  mood.value = moodStore.moods.data.find((mood) => mood.moodId === moodId.value)
}

onMounted(() => {
  if (!moodStore.moods.data || moodStore.moods.data.length === 0) {
    moodStore.fetchMoods().then(() => {
      setMood(moodId.value)
    })
  }
  else {
    setMood(moodId.value)
  }
})

watch(() => moodId.value, () => {
  emit('update', moodId.value || null)
})

</script>
