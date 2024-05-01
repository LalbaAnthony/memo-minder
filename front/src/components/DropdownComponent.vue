<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-light hover:bg-dark-gray"
        @click.stop="showDropdown = !showDropdown">
        {{ props.title }}
        <ChevronDownIcon
          :class="['ml-2 h-5 w-5 text-light transform transition-transform', showDropdown ? 'rotate-180' : '']"
          aria-hidden="true" />
      </MenuButton>
    </div>
    <TransitionRoot :show="showDropdown">
      <!-- Hide at click outside -->
      <TransitionChild v-click-outside="() => showDropdown = false" as="div"
        enter="transition ease-out duration-100 transform" enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100" leave="transition ease-in duration-75 transform"
        leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-lg bg-gray p-4 z-20">
        <slot></slot>
      </TransitionChild>
    </TransitionRoot>
  </Menu>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const showDropdown = ref(false)

// Directive click outside
const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>