<template>
  <div>
    <!-- Desktop header -->
    <header v-if="!isMobile()" class="flex justify-between items-center bg-dark-light p-4 gap-3">
      <Bars3Icon class="size-10 text-gray-light rounded-lg p-1 cursor-pointer" @click.stop="toggleSidebar()" />
      <router-link :to="route.path">
        <h1 class="text-2xl font-bold text-light">
          {{ route.meta.title }}
        </h1>
      </router-link>
      <MagnifyingGlassIcon class="size-10 text-gray-light rounded-full p-1.5 cursor-pointer"
        @click.stop="focusSearchBar" />
    </header>

    <!-- Sidebar -->
    <TransitionRoot :show="showSidebar">
      <TransitionChild enter="transition ease-in-out duration-0" enter-from="opacity-0" enter-to="opacity-100"
        leave="transition ease-in-out duration-0" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-dark bg-opacity-90 transition-opacity z-40"></div>
      </TransitionChild>
      <TransitionChild v-click-outside="() => hideSidebar()" as="aside"
        enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full"
        class="fixed top-0 left-0 h-full w-72 bg-dark-light z-50">

        <!-- Close sidebar -->
        <div class="flex justify-end p-4">
          <XMarkIcon class="size-8 text-gray-light cursor-pointer" @click.stop="hideSidebar()" />
        </div>

        <!-- Search -->
        <div v-if="!isMobile()" class="py-2 px-4">
          <form action="" @submit.prevent="triggerSearch()">
            <input v-model="search" id="layoutSearch" type="search"
              class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Search">
          </form>
        </div>

        <!-- Navigation -->
        <nav class="py-2 px-4 flex flex-col gap-4">
          <router-link v-if="!isMobile()" to="/"
            :class="[route.name.includes('home') ? 'bg-gray-dark' : '', 'flex items-center cursor-pointer rounded-lg hover:bg-gray-dark p-2']"
            @click.stop="hideSidebar()">
            <HomeIcon class="size-7 text-gray-light" />
            <span class="ml-3 mt-0.5 text-md text-light">Home</span>
          </router-link>
          <router-link to="/infos"
            :class="[route.name.includes('infos') ? 'bg-gray-dark' : '', 'flex items-center cursor-pointer rounded-lg hover:bg-gray-dark p-2']"
            @click.stop="hideSidebar()">
            <InformationCircleIcon class="size-7 text-gray-light" />
            <span class="ml-3 mt-0.5 text-md text-light">Infos</span>
          </router-link>
          <hr>
          <router-link to="/seasons"
            :class="[route.name.includes('season') ? 'bg-gray-dark' : '', 'flex items-center cursor-pointer rounded-lg hover:bg-gray-dark p-2']"
            @click.stop="hideSidebar()">
            <FilmIcon class="size-7 text-gray-light" />
            <span class="ml-3 mt-0.5 text-md text-light">Seasons</span>
          </router-link>
          <router-link to="/events"
            :class="[route.name.includes('event') ? 'bg-gray-dark' : '', 'flex items-center cursor-pointer rounded-lg hover:bg-gray-dark p-2']"
            @click.stop="hideSidebar()">
            <CalendarDaysIcon class="size-7 text-gray-light" />
            <span class="ml-3 mt-0.5 text-md text-light">Events</span>
          </router-link>
          <router-link to="/people"
            :class="[route.name.includes('people') || route.name.includes('person') ? 'bg-gray-dark' : '', 'flex items-center cursor-pointer rounded-lg hover:bg-gray-dark p-2']"
            @click.stop="hideSidebar()">
            <UsersIcon class="size-7 text-gray-light" />
            <span class="ml-3 mt-0.5 text-md text-light">People</span>
          </router-link>
          <router-link to="/musics"
            :class="[route.name.includes('music') ? 'bg-gray-dark' : '', 'flex items-center cursor-pointer rounded-lg hover:bg-gray-dark p-2']"
            @click.stop="hideSidebar()">
            <MusicalNoteIcon class="size-7 text-gray-light" />
            <span class="ml-3 mt-0.5 text-md text-light">Musics</span>
          </router-link>
          <hr>
          <router-link to="/account"
            :class="[route.name.includes('account') ? 'bg-gray-dark' : '', 'flex items-center cursor-pointer rounded-lg hover:bg-gray-dark p-2']"
            @click.stop="hideSidebar()">
            <UserCircleIcon class="size-7 text-gray-light" />
            <span class="ml-3 mt-0.5 text-md text-light">Account</span>
          </router-link>
          <div class="flex items-center cursor-pointer rounded-lg hover:bg-gray p-2" @click.stop="authStore.logout()">
            <ArrowLeftEndOnRectangleIcon class="size-8 text-danger" />
            <span class="ml-3 mt-0.5 text-md text-danger-light">Log out</span>
          </div>
        </nav>
        <div class="text-gray-light mb-2 mr-4 absolute bottom-0 right-0">
          Version {{ VITE_APP_VERSION }}
        </div>
      </TransitionChild>
    </TransitionRoot>

    <!-- Mobile bottom menu -->
    <nav v-if="isMobile()"
      class="fixed bottom-0 left-0 z-20 w-full flex justify-around items-center bg-dark-light py-2 px-6 sm:px-32 gap-3">
      <div
        class="flex flex-col items-center text-light transition-colors duration-200 ease-in-out rounded-lg px-2.5 py-1"
        @click.stop="toggleSidebar()">
        <Bars3Icon class="size-9 text-gray-light rounded-full p-1 cursor-pointer" />
        <span class="text-xs text-gray font-semibold">More</span>
      </div>
      <router-link to="/"
        :class="[route.name === 'home' && !showSidebar ? 'bg-gray-dark' : '', 'flex flex-col items-center text-light transition-colors duration-200 ease-in-out rounded-lg px-2.5 py-1']">
        <HomeIcon class="size-9 text-gray-light rounded-full p-1 cursor-pointer" />
        <span
          :class="[route.name === 'home' && !showSidebar ? 'text-gray-light' : 'text-gray', 'text-xs font-semibold']">Home</span>
      </router-link>
      <router-link to="/search"
        :class="[route.name === 'search' && !showSidebar ? 'bg-gray-dark' : '', 'flex flex-col items-center text-light transition-colors duration-200 ease-in-out rounded-lg px-2.5 py-1']">
        <MagnifyingGlassIcon class="size-9 text-gray-light rounded-full p-1 cursor-pointer" />
        <span
          :class="[route.name === 'search' && !showSidebar ? 'text-gray-light' : 'text-gray', 'text-xs font-semibold']">Search</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { isMobile } from '@/composables/helpers.js'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { HomeIcon } from '@heroicons/vue/24/outline'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useRoute, useRouter } from 'vue-router'
import vClickOutside from '@/composables/clickOutside.js'
import { useAuthStore } from '@/stores/auth'
import { VITE_APP_VERSION } from '@/config';
import { useSwipe } from '@/composables/useSwipe';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const showSidebar = ref(false)
const search = ref('')

function hideSidebar() {
  showSidebar.value = false
}

function revealSidebar() {
  showSidebar.value = true
}

function toggleSidebar() {
  if (showSidebar.value) {
    hideSidebar()
  } else {
    revealSidebar()
  }
}

function focusSearchBar() {
  revealSidebar()
  setTimeout(() => {
    const input = document.getElementById('layoutSearch')
    input.focus()
  }, 200) // wait for sidebar to be visible
}

function triggerSearch() {
  const query = { ...route.query }
  delete query.search
  if (search.value) {
    query.search = search.value
    search.value = ''
    hideSidebar()
    router.push({ path: '/search', query })
  }
}

useSwipe((direction) => {
  if (!isMobile()) return
  if (direction === 'left') {
    hideSidebar()
  } else if (direction === 'right') {
    revealSidebar()
  }
});

onMounted(() => {
  // Add shortcuts
  if (!isMobile()) {
    window.addEventListener('keydown', (e) => {
      // Ctrl + K to focus search
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        focusSearchBar()
      }

      // Esc to hide sidebar
      if (e.key === 'Escape') {
        e.preventDefault()
        hideSidebar()
      }

      // Ctrl + Shift + S to show sidebar
      if (e.ctrlKey && e.shiftKey && e.key === 's') {
        e.preventDefault()
        revealSidebar()
      }
    })
  }
})
</script>