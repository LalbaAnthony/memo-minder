<template>
  <div :class="['fixed right-0 z-20 flex flex-col justify-end gap-2 p-3', isMobile() ? 'bottom-24' : 'bottom-0']">
    <!-- Scroll to top -->
    <TransitionRoot :show="props.goTopButton && route.name.includes('list') && isMobile() && enableGoTop"
      @click="goTop()">
      <TransitionChild as="div" enter="transition ease-out duration-100 transform" enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100" leave="transition ease-in duration-100 transform"
        leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
        class="flex items-center justify-center cursor-pointer text-gray-light bg-dark-light shadow-xl rounded-2xl p-2 hover:scale-105 transition-transform duration-200">
        <ChevronUpIcon class="size-6" />
      </TransitionChild>
    </TransitionRoot>

    <!-- Create button -->
    <div v-if="props.createButton && route.name.includes('add')" @click="triggerCreate()"
      class="flex items-center justify-center cursor-pointer text-success-light bg-dark-light shadow-xl rounded-2xl p-2 hover:scale-105 transition-transform duration-200">
      <CheckIcon class="size-11" />
    </div>

    <!-- Update button -->
    <div v-if="props.updateButton && route.name.includes('details')" @click="triggerUpdate()"
      class="flex items-center justify-center cursor-pointer text-success-light bg-dark-light shadow-xl rounded-2xl p-2 hover:scale-105 transition-transform duration-200">
      <CheckIcon class="size-11" />
    </div>

    <!-- Delete button -->
    <div v-if="props.deleteButton && route.name.includes('details')" @click="triggerDelete()"
      class="flex items-center justify-center cursor-pointer text-danger bg-dark-light shadow-xl rounded-2xl p-2 hover:scale-105 transition-transform duration-200">
      <TrashIcon class="size-8" />
    </div>

    <!-- Specific add button -->
    <router-link v-if="props.addButton && route.name.includes('list')" :to="`${route.path}/add`"
      class="flex items-center justify-center cursor-pointer text-primary bg-dark-light shadow-xl rounded-2xl p-2 hover:scale-105 transition-transform duration-200">
      <PlusIcon class="size-11" />
    </router-link>

    <!-- Global add button -->
    <div v-if="props.addButton && route.name === 'home'">
      <TransitionRoot :show="showAddSelector">
        <!-- Hide at click outside -->
        <TransitionChild v-click-outside="() => showAddSelector = false" as="div"
          enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 translate-y-1/4" enter-to="translate-y-0 opacity-100"
          leave="transition ease-in-out duration-300 transform" leave-from="translate-y-0 opacity-100" leave-to="opacity-0 translate-y-1/4"
          class="origin-top flex flex-col items-center justify-center gap-1 bg-dark-light rounded-t-2xl px-1 py-2 z-10">
          <router-link to="/seasons/add" class="text-primary p-2 rounded-xl hover:bg-gray-dark">
            <FilmIcon class="size-8 text-gray-light" />
          </router-link>
          <router-link to="/events/add" class="text-primary p-2 rounded-xl hover:bg-gray-dark">
            <CalendarDaysIcon class="size-8 text-gray-light" />
          </router-link>
          <router-link to="/people/add" class="text-primary p-2 rounded-xl hover:bg-gray-dark">
            <UserIcon class="size-8 text-gray-light" />
          </router-link>
          <router-link to="/musics/add" class="text-primary p-2 rounded-xl hover:bg-gray-dark">
            <MusicalNoteIcon class="size-8 text-gray-light" />
          </router-link>
        </TransitionChild>
      </TransitionRoot>
      <div
        :class="[showAddSelector ? 'rounded-b-2xl' : 'rounded-2xl', 'flex items-center justify-center cursor-pointer text-primary bg-dark-light shadow-xl p-2 transition-all duration-200 delay-100']"
        @click.stop="showAddSelector = !showAddSelector">
        <PlusIcon class="size-11" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronUpIcon } from '@heroicons/vue/24/solid'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { CheckIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UserIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { isMobile } from '@/helpers/functions.js'
import { useRoute, } from 'vue-router'
import debounce from 'lodash/debounce'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ref } from 'vue'
import vClickOutside from '@/directives/clickOutside.js'

const route = useRoute()

const props = defineProps({
  goTopButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  createButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  updateButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  deleteButton: {
    type: Boolean,
    required: false,
    default: true,
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
const showAddSelector = ref(false)

const emit = defineEmits(['triggerCreate', 'triggerUpdate', 'triggerDelete', 'triggerAddTypePicker'])

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function triggerCreate() {
  emit('triggerCreate', true)
}

function triggerUpdate() {
  emit('triggerUpdate', true)
}

function triggerDelete() {
  emit('triggerDelete', true)
}

// Enable go top button when scrolling
window.addEventListener('scroll', debounce(() => {
  enableGoTop.value = window.scrollY > 100
}, 100))

</script>