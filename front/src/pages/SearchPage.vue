<template>
  <div>
    <!-- Search bar -->
    <div class="py-2 px-4">
      <form action="" @submit.prevent="loadSearch()">
        <input v-model="search" id="search" type="search" class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light"
          placeholder="Search..." @input="loadSearch()">
      </form>
    </div>




    <!-- Add buttons -->
    <div class="py-2 px-4 grid">
      <TransitionRoot :show="addButtons.season.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <router-link :to="{ path: `${'season'}/add`, query: { title: search } }"
            class="flex justify-center items-center bg-light-dark text-light p-2 rounded-lg cursor-pointer hover:bg-dark-gray">
            <PlusIcon class="size-6 text-primary mr-3" />
            <FilmIcon class="size-6 text-light" />
            <span class="ml-3 mt-0.5">Add as a seaon</span>
          </router-link>
        </TransitionChild>
      </TransitionRoot>
      <TransitionRoot :show="addButtons.event.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <router-link :to="{ path: `${'event'}/add`, query: { title: search } }"
            class="flex justify-center items-center bg-light-dark text-light p-2 rounded-lg cursor-pointer hover:bg-dark-gray">
            <PlusIcon class="size-6 text-primary mr-3" />
            <CalendarDaysIcon class="size-6 text-light" />
            <span class="ml-3 mt-0.5">Add as an event</span>
          </router-link>
        </TransitionChild>
      </TransitionRoot>
      <TransitionRoot :show="addButtons.person.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <router-link :to="{ path: `${'person'}/add`, query: { name: search } }"
            class="flex justify-center items-center bg-light-dark text-light p-2 rounded-lg cursor-pointer hover:bg-dark-gray">
            <PlusIcon class="size-6 text-primary mr-3" />
            <UsersIcon class="size-6 text-light" />
            <span class="ml-3 mt-0.5">Add as a person</span>
          </router-link>
        </TransitionChild>
      </TransitionRoot>
      <TransitionRoot :show="addButtons.music.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <router-link :to="{ path: `${'music'}/add`, query: { title: search } }"
            class="flex justify-center items-center bg-light-dark text-light p-2 rounded-lg cursor-pointer hover:bg-dark-gray">
            <PlusIcon class="size-6 text-primary mr-3" />
            <MusicalNoteIcon class="size-6 text-light" />
            <span class="ml-3 mt-0.5">Add as a music</span>
          </router-link>
        </TransitionChild>
      </TransitionRoot>
    </div>

    <!-- Nb of results -->
    <div v-if="results.length > 0">
      <p class="text-center text-light-gray text-sm p-4 pt-8">
        {{ results.length }} {{ results.length > 1 ? 'results' : 'result' }}
      </p>
    </div>

    <!-- Results -->
    <Grid :items="results">
      <template #item="{ item }">
        <router-link :to="item.path" class="item block p-4 border-b border-gray flex items-center justify-between"
          :style="['animation-delay: 0.' + randomInt(1, 10) / 15 + 's;']">
          <DocumentTextIcon v-if="item.type === 'page'" class="size-8 text-light-gray" />
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <ArrowLongRightIcon
            class="arrow size-8 text-primary ml-2 hover:text-light transition ease-in-out duration-300 transform" />
        </router-link>
      </template>
    </Grid>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Grid from '@/components/GridComponent.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { DocumentTextIcon } from '@heroicons/vue/24/solid'
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { randomInt } from '@/helpers/helpers.js'

const route = useRoute()
const router = useRouter()

const search = ref(route.query.search)
const results = ref([])
const addButtons = ref({
  season: { show: false },
  event: { show: false },
  person: { show: false },
  music: { show: false }
})

function loadSearch() {
  if (!search.value) return

  results.value = []

  // Show add buttons
  if (search.value.toLowerCase().includes('season')) addButtons.value.season.show = true
  if (search.value.toLowerCase().includes('event')) addButtons.value.event.show = true
  if (search.value.toLowerCase().includes('person')) addButtons.value.person.show = true
  if (search.value.toLowerCase().includes('music')) addButtons.value.music.show = true

  // Pages
  router.options.routes.forEach((route) => {
    if (
      route.meta &&
      route.meta.displayInSearch &&
      route.path &&
      (route.meta.title || route.meta.name) &&
      (
        (route.path && route.path.toLowerCase().includes(search.value.toLowerCase())) ||
        (route.name && route.name.toLowerCase().includes(search.value.toLowerCase())) ||
        (route.meta.name && route.meta.name.toLowerCase().includes(search.value.toLowerCase())) ||
        (route.meta.tags && route.meta.tags.includes(search.value.toLowerCase()))
      )
    ) {
      results.value.push({
        title: route.meta.title || route.name,
        path: route.path,
        type: 'page'
      })
    }
  })

  // Musics
  // ...

}

onMounted(() => {
  setTimeout(() => {
    const input = document.getElementById('search')
    input.focus()
  }, 200)
  loadSearch()
})

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
}

.item:hover .arrow {
  /* transform: translateX(10px); */
}

.item {
  animation-name: slide-in;
  animation-duration: 0.3s;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>