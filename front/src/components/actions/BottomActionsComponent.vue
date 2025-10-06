<template>
  <div
    :class="['fixed z-20 flex flex-col-reverse justify-end gap-2 m-3 rounded-2xl darken-arround-shadow darken-arround-background', isMobile() ? 'bottom-20 right-0' : 'bottom-0 right-0']">
    <!-- Create button -->
    <div v-if="props.createButton" @click="triggerCreate()"
      class="flex items-center justify-center cursor-pointer text-light bg-primary shadow-xl rounded-2xl p-2 hover:scale-105 transition-transform duration-300">
      <CheckIcon class="size-10" />
    </div>

    <!-- Update button -->
    <div v-if="props.updateButton" @click="triggerUpdate()"
      class="flex items-center justify-center cursor-pointer text-light bg-primary shadow-xl rounded-2xl p-2 hover:scale-105 transition-transform duration-300">
      <CheckIcon class="size-10" />
    </div>

    <!-- Delete button -->
    <div v-if="props.deleteButton" @click="triggerDelete()"
      class="flex items-center justify-center cursor-pointer text-light bg-danger shadow-xl rounded-2xl p-3 hover:scale-105 transition-transform duration-300">
      <TrashIcon class="size-8" />
    </div>

    <!-- Add button -->
    <router-link v-if="props.addButton && route.name.includes('season')" to="/seasons/add"
      class="rounded-2xl z-20 flex items-center justify-center cursor-pointer text-light bg-primary shadow-xl p-2">
      <PlusIcon class="size-10" />
    </router-link>
    <router-link v-else-if="props.addButton && route.name.includes('event')" to="/events/add"
      class="rounded-2xl z-20 flex items-center justify-center cursor-pointer text-light bg-primary shadow-xl p-2">
      <PlusIcon class="size-10" />
    </router-link>
    <router-link v-else-if="props.addButton && route.name.includes('people')" to="/people/add"
      class="rounded-2xl z-20 flex items-center justify-center cursor-pointer text-light bg-primary shadow-xl p-2">
      <PlusIcon class="size-10" />
    </router-link>
    <router-link v-else-if="props.addButton && route.name.includes('music')" to="/musics/add"
      class="rounded-2xl z-20 flex items-center justify-center cursor-pointer text-light bg-primary shadow-xl p-2">
      <PlusIcon class="size-10" />
    </router-link>
    <div v-else-if="props.addButton"
      :class="[showAddSelector ? 'bg-gray-dark' : '', 'rounded-2xl ease-in-out duration-300 transition-all']">
      <TransitionRoot style="z-index: 10" :show="showAddSelector">
        <TransitionChild v-click-outside="() => showAddSelector = false" as="div" style="z-index: 10"
          enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 " enter-to="opacity-100"
          leave="transition ease-in-out duration-300 transform" leave-from="opacity-100" leave-to="opacity-0 "
          class="z-10 origin-top flex flex-col items-center justify-center gap-1 bg-gray-dark rounded-2xl px-1 py-2">
          <router-link to="/seasons/add" class="p-2 rounded-xl hover:bg-gray">
            <FilmIcon class="size-8 text-light" />
          </router-link>
          <router-link to="/events/add" class="p-2 rounded-xl hover:bg-gray">
            <CalendarDaysIcon class="size-8 text-light" />
          </router-link>
          <router-link to="/people/add" class="p-2 rounded-xl hover:bg-gray">
            <UserIcon class="size-8 text-light" />
          </router-link>
          <router-link to="/musics/add" class="p-2 rounded-xl hover:bg-gray">
            <MusicalNoteIcon class="size-8 text-light" />
          </router-link>
        </TransitionChild>
      </TransitionRoot>
      <div
        class="rounded-2xl z-20 flex items-center justify-center cursor-pointer text-light bg-primary shadow-xl p-2 transition-all duration-300 delay-100"
        @click.stop="showAddSelector = !showAddSelector">
        <PlusIcon class="size-10" />
      </div>
    </div>

    <!-- Scroll to top -->
    <TransitionRoot :show="props.goTopButton && enableGoTop" @click="goTop()">
      <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0"
        enter-to="opacity-100" leave="transition ease-in-out duration-300 transform" leave-from=" opacity-100"
        leave-to="opacity-0"
        class="flex items-center justify-center cursor-pointer text-gray-light bg-dark-light shadow-xl rounded-2xl p-2 hover:scale-105 transition-transform duration-300">
        <ChevronUpIcon class="size-6" />
      </TransitionChild>
    </TransitionRoot>
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
import { isMobile } from '@/composables/helpers'
import debounce from '@/composables/debounce'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { onMounted, ref } from 'vue'
import vClickOutside from '@/composables/clickOutside'
import { useRoute } from 'vue-router'

const props = defineProps({
  goTopButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  createButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  updateButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  deleteButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  addButton: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const route = useRoute()

const enableGoTop = ref(false)
const showAddSelector = ref(false)

const emit = defineEmits(['triggerCreate', 'triggerUpdate', 'triggerDelete', 'triggerAddTypePicker'])

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

  enableGoTop.value = false
}

function triggerCreate() {
  emit('triggerCreate', true)
}

function triggerUpdate() {
  emit('triggerUpdate', true)
}

function triggerDelete() {
  if (confirm('Are you sure you want to delete this item?')) emit('triggerDelete', true)
}

onMounted(() => {
  // Enable go top button when scrolling
  window.addEventListener('scroll', debounce(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const scrolledOverHalf = scrollPosition > pageHeight * 0.5

    enableGoTop.value = scrolledOverHalf && window.scrollY > 100
  }, 100))
})

</script>

<style scoped>

.darken-arround-shadow {
  box-shadow: 0px 0px 30px 5px var(--dark);
}

.darken-arround-background {
  background: rgba(17, 24, 39, 0.83); /* 'dark' color */
}

</style>