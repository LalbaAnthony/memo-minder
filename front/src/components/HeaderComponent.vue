<template>
  <div>

    <header class="flex justify-between items-center bg-light-dark border-b border-gray p-4 gap-3">
      <Bars3Icon class="size-8 text-light-gray" @click="isShowing = !isShowing" />
      <h1 class="text-2xl font-bold text-light">Memo M<span
          class="text-primary text-2xl font-bold text-light">i</span>nder
      </h1>
      <MagnifyingGlassIcon class="size-8 text-light-gray" />
    </header>

    <!-- Sidebar -->
    <TransitionRoot :show="isShowing">
      <!-- Hide at click outside -->
      <TransitionChild as="aside" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full"
        enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
        leave-to="-translate-x-full" class="fixed top-0 left-0 h-full w-64 bg-light-dark z-50 border-r border-gray">

        <!-- Close sidebar -->
        <div class="flex justify-end p-4">
          <XMarkIcon class="size-8 text-light-gray cursor-pointer" @click="isShowing = !isShowing" />
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col gap-4 p-4">
          <router-link to="/" class="flex items-center text-light rounded-lg 
            hover:bg-dark-gray p-2">
            <ChartPieIcon class="size-8 text-light-gray" />
            <span class="ml-3 mt-1">Overview</span>
          </router-link>
          <router-link to="/events" class="flex items-center text-light rounded-lg 
            hover:bg-dark-gray p-2">
            <CalendarDaysIcon class="size-8 text-light-gray" />
            <span class="ml-3 mt-1">Event</span>
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
import { ChartPieIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'

const isShowing = ref(true)

const menu = [
  { name: 'Overview', icon: ChartPieIcon, path: '/' },
]

</script>