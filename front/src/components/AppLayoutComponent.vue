<template>
  <div>

    <!-- Mobile bottom menu -->
    <div v-if="isMobile()"
      class="fixed bottom-0 left-0 z-20 w-full flex justify-around items-center bg-light-dark border-t border-gray p-4 gap-3">
      <Bars3Icon class="size-12 text-light-gray hover:bg-dark-gray rounded-lg p-1 cursor-pointer"
        @click.stop="showSidebar = !showSidebar" />
      <FilmIcon class="size-12 text-light-gray hover:bg-dark-gray rounded-lg p-1 cursor-pointer"
        @click.stop="goTo('/seasons')" />
      <MagnifyingGlassIcon class="size-12 text-light-gray hover:bg-dark-gray rounded-full p-1 cursor-pointer"
        @click.stop="focusSearchBar" />
    </div>

    <!-- Desktop header -->
    <header v-else class="flex justify-between items-center bg-light-dark border-b border-gray p-4 gap-3">
      <Bars3Icon class="size-10 text-light-gray hover:bg-dark-gray rounded-lg p-1 cursor-pointer"
        @click.stop="showSidebar = !showSidebar" />
      <router-link to="/">
        <h1 class="text-2xl font-bold text-light">
          {{ route.meta.title }}
        </h1>
      </router-link>
      <MagnifyingGlassIcon class="size-10 text-light-gray hover:bg-dark-gray rounded-full p-1.5 cursor-pointer"
        @click.stop="focusSearchBar" />
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
          <form action="" @submit.prevent="triggerSearch()">
            <input v-model="search" id="search" type="search" class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light"
              placeholder="Search..." />
          </form>
        </div>

        <!-- Navigation -->
        <nav class="py-2 px-4 flex flex-col gap-4">
          <router-link to="/" class="flex items-center cursor-pointer text-light rounded-lg hover:bg-dark-gray p-2"
            @click.stop="showSidebar = false">
            <ListBulletIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Home</span>
          </router-link>
          <router-link to="/infos" class="flex items-center cursor-pointer text-light rounded-lg hover:bg-dark-gray p-2"
            @click.stop="showSidebar = false">
            <InformationCircleIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Infos</span>
          </router-link>
          <hr>
          <router-link to="/seasons" class="flex items-center cursor-pointer text-light rounded-lg hover:bg-dark-gray p-2"
            @click.stop="showSidebar = false">
            <FilmIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Seasons</span>
          </router-link>
          <router-link to="/events" class="flex items-center cursor-pointer text-light rounded-lg hover:bg-dark-gray p-2"
            @click.stop="showSidebar = false">
            <CalendarDaysIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Events</span>
          </router-link>
          <router-link to="/people" class="flex items-center cursor-pointer text-light rounded-lg hover:bg-dark-gray p-2"
            @click.stop="showSidebar = false">
            <UsersIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">People</span>
          </router-link>
          <router-link to="/musics" class="flex items-center cursor-pointer text-light rounded-lg hover:bg-dark-gray p-2"
            @click.stop="showSidebar = false">
            <MusicalNoteIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Musics</span>
          </router-link>
          <hr>
          <router-link to="/account" class="flex items-center cursor-pointer text-light rounded-lg hover:bg-dark-gray p-2"
            @click.stop="showSidebar = false">
            <UserCircleIcon class="size-6 text-light-gray" />
            <span class="ml-3 mt-0.5">Account</span>
          </router-link>
          <div class="flex items-center cursor-pointer text-light-danger rounded-lg hover:bg-gray p-2"
            @click.stop="showSidebar = false">
            <ArrowLeftEndOnRectangleIcon class="size-6 text-danger" />
            <span class="ml-3 mt-0.5">Log out</span>
          </div>
        </nav>
      </TransitionChild>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { isMobile } from '@/helpers/helpers.js'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { ListBulletIcon } from '@heroicons/vue/24/solid'
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useRoute, useRouter } from 'vue-router'
import vClickOutside from '@/directives/clickOutside.js'

const route = useRoute()
const router = useRouter()

const showSidebar = ref(false)
const search = ref('')

function focusSearchBar() {
  showSidebar.value = true
  setTimeout(() => {
    const input = document.getElementById('search')
    input.focus()
  }, 200) // wait for sidebar to be visible
}

function triggerSearch() {
  const query = { ...route.query }
  delete query.search
  if (search.value) {
    query.search = search.value
    search.value = ''
    showSidebar.value = false
    router.push({ path: '/search', query })
  }
}

function goTo(path = '/') {
  router.push(path)
}

// Add shortcuts
if (!isMobile()) {
  window.addEventListener('keydown', (e) => {
    // ctrl + F short to focus search
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault()
      focusSearchBar()
    }
  })
}

</script>