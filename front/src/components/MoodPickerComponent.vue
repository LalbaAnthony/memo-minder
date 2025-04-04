<template>
  <Menu v-if="moodStore?.moods?.data" as="div" class="relative inline-block text-left">
    <div>
      <button
        class="inline-flex w-full gap-2 justify-center items-center rounded-lg px-4 py-2 text-md font-medium text-light bg-gray-dark"
        :style="mood && props.enableColor ? `background-color: ${mood?.color} !important;` : ''"
        @click.stop="show = !show">
        <HeartIcon :class="['size-6 transition-color duration-500', mood?.name ? 'text-primary' : 'text-gray']" />
        <span>{{ mood?.name || 'Mood' }}</span>
        <ChevronDownIcon
          :class="['size-5 text-light transform transition-transform duration-200', show ? 'rotate-180' : '']"
          :aria-hidden="show || 'true'" />
      </button>
    </div>
    <TransitionRoot :show="show">
      <TransitionChild v-click-outside="() => show = false" as="div" enter="transition ease-out duration-100 transform"
        enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform" leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
        class="origin-top-right absolute mt-2 w-48 rounded-lg bg-gray z-10 overflow-auto py-2">
        <div class="flex flex-col gap-2 px-4 py-2">
          <button v-for="mood in moodStore.moods.data" :key="mood.moodId"
            class="flex items-center justify-between rounded-md w-full px-2 py-1 text-light hover:bg-gray-light"
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
import { HeartIcon } from '@heroicons/vue/24/solid'
import vClickOutside from '@/composables/clickOutside.js'
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
