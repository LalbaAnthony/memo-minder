<template>
  <div :class="['fixed right-0 z-20 flex flex-col justify-end gap-2 p-3', isMobile() ? 'bottom-20' : 'bottom-0']">
    <!-- Scroll to top -->
    <TransitionRoot :show="props.goTopButton && route.name.includes('list') && isMobile() && enableGoTop"
      @click="goTop()">
      <TransitionChild as="div" enter="transition ease-out duration-100 transform" enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100" leave="transition ease-in duration-100 transform"
        leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
        class="flex items-center justify-center cursor-pointer bg-dark-gray text-white rounded-2xl p-2 hover:scale-105 transition-transform duration-200 border-2 border-dark-gray">
        <ChevronUpIcon class="size-6" />
      </TransitionChild>
    </TransitionRoot>

    <!-- Adjustments button -->
    <!-- <div v-if="props.adjustmentsButton && route.name.includes('list')" @click="ToggleAdjustments()"
      class="flex items-center justify-center cursor-pointer bg-dark-gray text-white rounded-2xl p-2 hover:scale-105 transition-transform duration-200 border-2 border-dark-gray">
      <AdjustmentsHorizontalIcon class="size-10" />
    </div> -->

    <!-- Add button -->
    <router-link v-if="props.addButton && route.name.includes('list')" :to="`${route.path}/add`"
      class="flex items-center justify-center cursor-pointer bg-primary text-white rounded-2xl p-2 hover:scale-105 transition-transform duration-200 border-2 border-dark-gray">
      <PlusIcon class="size-10" />
    </router-link>

  </div>
</template>

<script setup>
import { ChevronUpIcon } from '@heroicons/vue/24/solid'
import { PlusIcon } from '@heroicons/vue/24/solid'
// import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
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
  // adjustmentsButton: {
  //   type: Boolean,
  //   required: false,
  //   default: true,
  // },
  addButton: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const enableGoTop = ref(false)

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// Enable go top button when scrolling
window.addEventListener('scroll', debounce(() => {
  console.log(window.scrollY)
  enableGoTop.value = window.scrollY > 100
}, 100))

</script>