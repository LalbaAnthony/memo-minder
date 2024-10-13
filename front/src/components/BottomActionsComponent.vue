<template>
  <div :class="['fixed right-0 z-20 flex flex-col justify-end gap-2 p-3', isMobile() ? 'bottom-20' : 'bottom-0']">
    <!-- Scroll to top -->
    <TransitionRoot :show="props.goTopButton && route.name.includes('list') && isMobile() && enableGoTop"
      @click="goTop()">
      <TransitionChild as="div" enter="transition ease-out duration-100 transform" enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100" leave="transition ease-in duration-100 transform"
        leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
        class="flex items-center justify-center cursor-pointer bg-gray-dark text-white rounded-xl p-2 hover:scale-105 transition-transform duration-200 border-2 border-gray-dark">
        <ChevronUpIcon class="size-6" />
      </TransitionChild>
    </TransitionRoot>

    <!-- Adjustments button -->
    <div v-if="props.adjustmentsButton && route.name.includes('list')" @click="triggerAdjustments()"
      class="flex items-center justify-center cursor-pointer bg-gray-dark text-white rounded-xl p-2 hover:scale-105 transition-transform duration-200 border-2 border-gray-dark">
      <AdjustmentsHorizontalIcon class="size-10" />
    </div>

    <!-- Search button -->
    <router-link v-if="props.searchButton  && route.name.includes('list')" to="/search"
    class="flex items-center justify-center cursor-pointer bg-gray-dark text-white rounded-xl p-2 hover:scale-105 transition-transform duration-200 border-2 border-gray-dark">
    <MagnifyingGlassIcon class="size-10" />
    </router-link>

    <!-- Add button -->
    <router-link v-if="props.addButton && route.name.includes('list')" :to="`${route.path}/add`"
      class="flex items-center justify-center cursor-pointer bg-primary text-white rounded-xl p-2 hover:scale-105 transition-transform duration-200 border-2 border-gray-dark">
      <PlusIcon class="size-10" />
    </router-link>

  </div>
</template>

<script setup>
import { ChevronUpIcon } from '@heroicons/vue/24/solid'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { isMobile } from '@/helpers/helpers.js'
import { useRoute, } from 'vue-router'
import debounce from 'lodash/debounce'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ref } from 'vue'

const route = useRoute()

const props = defineProps({
  goTopButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  adjustmentsButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  addButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  searchButton: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const enableGoTop = ref(false)

const emit = defineEmits(['triggerAdjustments'])

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function triggerAdjustments() {
  emit('triggerAdjustments', true)
}

// Enable go top button when scrolling
window.addEventListener('scroll', debounce(() => {
  enableGoTop.value = window.scrollY > 100
}, 100))

</script>