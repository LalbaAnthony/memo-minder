<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <button
        class="inline-flex w-full justify-center items-center rounded-full px-3 py-1 text-md font-medium text-light bg-primary"
        :style="mood ? `background-color: ${mood?.color} !important;` : ''" @click.stop="show = !show">
        {{ mood?.name || 'Mood' }}
        <ChevronDownIcon
          :class="['ml-2 h-5 w-5 text-light transform transition-transform duration-200', show ? 'rotate-180' : '']"
          aria-hidden="true" />
      </button>
    </div>
    <TransitionRoot :show="show">
      <!-- Hide at click outside -->
      <TransitionChild v-click-outside="() => show = false" as="div" enter="transition ease-out duration-100 transform"
        enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform" leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
        class="origin-top-right absolute mt-2 w-48 rounded-lg bg-gray z-10 overflow-auto py-2">
        <div class="flex flex-col gap-2 p-4">
          <button v-for="mood in moodStore.moods.data" :key="mood.moodId"
            class="flex items-center justify-between rounded-md w-full px-2 py-1 text-light hover:bg-light-gray"
            @click="setMood(mood.moodId)">
            <span>{{ mood.name }}</span>
          </button>
        </div>
      </TransitionChild>
    </TransitionRoot>
  </Menu>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Menu, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import vClickOutside from '@/directives/clickOutside.js'
import { useMoodStore } from '@/stores/mood'

const props = defineProps({
  value: {
    type: Number,
    required: false,
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
  emit('update', moodId.value)
})

</script>
