<template>
  <div>

    <header class="flex justify-between items-center bg-light-dark border-b border-gray p-4 gap-3">
      <Bars3Icon class="size-10 text-light-gray hover:bg-dark-gray rounded-lg p-1 cursor-pointery" @click.stop="showSidebar = !showSidebar" />
      <router-link to="/">
        <h1 class="text-2xl font-bold text-light">
          {{ SITE_NAME }}
        </h1>
      </router-link>
      <MagnifyingGlassIcon class="size-10 text-light-gray hover:bg-dark-gray rounded-full p-1 cursor-pointer" @click.stop="focusSearchBar" />
    </header>

    <!-- Sidebar -->
    <TransitionRoot :show="showSidebar">
      <!-- Hide at click outside -->
      <TransitionChild v-click-outside="() => showSidebar = false" as="aside"
        enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full"
        class="fixed top-0 left-0 h-full w-72 bg-light-dark z-50 border-r border-gray">

        <!-- Close sidebar -->
        <div class="flex justify-end p-4">
          <XMarkIcon class="size-8 text-light-gray cursor-pointer" @click.stop="showSidebar = false" />
        </div>

        <!-- Search -->
        <div class="py-2 px-4">
          <form action="" @submit.prevent="triggerSearch">
            <input v-model="search" type="text" class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light"
              placeholder="Search..." />
          </form>
        </div>

        <!-- Navigation -->
        <nav class="py-2 px-4 flex flex-col gap-4">
          <router-link to="/" class="flex items-center text-light rounded-lg 
            hover:bg-dark-gray p-2" @click.stop="showSidebar = false">
            <ListBulletIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Home</span>
          </router-link>
          <hr>
          <router-link to="/time-spans" class="flex items-center text-light rounded-lg 
          hover:bg-dark-gray p-2" @click.stop="showSidebar = false">
            <FilmIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Time spans</span>
          </router-link>
          <router-link to="/events" class="flex items-center text-light rounded-lg 
        hover:bg-dark-gray p-2" @click.stop="showSidebar = false">
            <CalendarDaysIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Events</span>
          </router-link>
          <router-link to="/musics" class="flex items-center text-light rounded-lg 
      hover:bg-dark-gray p-2" @click.stop="showSidebar = false">
            <MusicalNoteIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Musics</span>
          </router-link>
          <hr>
          <router-link to="/account" class="flex items-center text-light rounded-lg 
    hover:bg-dark-gray p-2" @click.stop="showSidebar = false">
            <UserIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Account</span>
          </router-link>
        </nav>
      </TransitionChild>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { ListBulletIcon } from '@heroicons/vue/24/solid'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { UserIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { SITE_NAME } from '@/config';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const showSidebar = ref(false)
const search = ref('')

function focusSearchBar() {
  showSidebar.value = true
  setTimeout(() => {
    const input = document.querySelector('input')
    input.focus()
  }, 200) // wait for sidebar to be visible
}

function triggerSearch() {
  const query = { ...route.query }
  delete query.search
  if (search.value) {
    query.search = search.value
    search.value = ''
  }
  router.push({ path: route.path, query }) 
}

// Add shortcuts
window.addEventListener('keydown', (e) => {
  // ctrl + F short to focus search
  if (e.ctrlKey && e.key === 'f') {
    e.preventDefault()
    focusSearchBar()
  }
})

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