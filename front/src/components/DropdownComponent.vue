<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <button
        class="inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-lg font-medium text-light transition-colors duration-200 hover:bg-gray-dark"
        @click.stop="show = !show">
        {{ props.title }}
        <ChevronDownIcon
          :class="['ml-2 size-7 text-light transform transition-transform duration-200', show ? 'rotate-180' : '']"
          :aria-hidden="show || 'true'" />
      </button>
    </div>
    <TransitionRoot :show="show">
      <TransitionChild v-click-outside="() => show = false" as="div"
        enter="transition ease-out duration-100 transform" enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100" leave="transition ease-in duration-75 transform"
        leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
        :class="['origin-top-right absolute', props.side === 'right' ? 'right-0' : 'left-0', 'mt-2 w-56 rounded-lg bg-gray-dark py-4 px-3 z-10']"
        >
        <slot></slot>
      </TransitionChild>
    </TransitionRoot>
  </Menu>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import vClickOutside from '@/composables/clickOutside.js'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: false,
    default: 'left',
  },
})

const show = ref(false)
</script>