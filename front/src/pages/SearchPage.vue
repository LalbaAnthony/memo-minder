<template>
  <div>
    <!-- Search bar -->
    <div class="py-2 px-4">
      <form action="" @submit.prevent="loadSearch()">
        <input v-model="search" id="search" type="search" class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light"
          placeholder="Search">
      </form>
    </div>

    <!-- Add buttons -->
    <div class="py-2 px-4 btn-grid">
      <TransitionRoot :show="addButtons.season.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <router-link :to="{ path: `${'seasons'}/add`, query: { title: toAddString } }"
            class="flex justify-center items-center bg-dark-light text-light p-2 rounded-lg cursor-pointer hover:bg-gray-dark">
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
          <router-link :to="{ path: `${'events'}/add`, query: { title: toAddString } }"
            class="flex justify-center items-center bg-dark-light text-light p-2 rounded-lg cursor-pointer hover:bg-gray-dark">
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
          <router-link :to="{ path: `${'people'}/add`, query: { name: search } }"
            class="flex justify-center items-center bg-dark-light text-light p-2 rounded-lg cursor-pointer hover:bg-gray-dark">
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
          <router-link :to="{ path: `${'musics'}/add`, query: { title: toAddString } }"
            class="flex justify-center items-center bg-dark-light text-light p-2 rounded-lg cursor-pointer hover:bg-gray-dark">
            <PlusIcon class="size-6 text-primary mr-3" />
            <MusicalNoteIcon class="size-6 text-light" />
            <span class="ml-3 mt-0.5">Add as a music</span>
          </router-link>
        </TransitionChild>
      </TransitionRoot>
    </div>

    <!-- Nb of results -->
    <div v-if="results.length > 0">
      <p class="text-center text-gray-light text-sm p-4 pt-8">
        {{ results.length }} {{ results.length > 1 ? 'results' : 'result' }}
      </p>
    </div>

    <!-- Results -->
    <Grid :items="results">
      <template #item="{ item }">
        <Result :item="item" />
      </template>
    </Grid>
  </div>
</template>

<script setup>
import { watch, onMounted, ref, computed } from 'vue'
import debounce from 'lodash/debounce'
import { useRoute, useRouter } from 'vue-router'
import Grid from '@/components/GridComponent.vue'
import Result from '@/components/ResultItem.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useEventStore } from '@/stores/event'
import { useMusicStore } from '@/stores/music'
import { usePersonStore } from '@/stores/person'
import { useSeasonStore } from '@/stores/season'

const route = useRoute()
const router = useRouter()

const eventStore = useEventStore()
const musicStore = useMusicStore()
const personStore = usePersonStore()
const seasonStore = useSeasonStore()

const addButtons = ref({
  season: { show: false },
  event: { show: false },
  person: { show: false },
  music: { show: false }
})
const search = ref(route.query.search || '')
const results = ref([])

const toAddString = computed(() => {
  let string = search.value

  string = string.trim()
  string = string.toLocaleLowerCase()
  string = string.replace('add', '')
  string = string.replace('season', '')
  string = string.replace('event', '')
  string = string.replace('person', '')
  string = string.replace('music', '')
  string = string.replace(/^\w/, (c) => c.toUpperCase())

  return string
});

const loadSearch = debounce(async () => {
  if (!search.value) return

  results.value = []

  let promises = []

  // Events
  promises.push(function () {
    return eventStore.fetchEvents({ search: search.value, perPage: 2 }).then(() => {
      results.value.push(...eventStore.events.data.map((event) => ({
        title: event.title,
        type: 'event',
        action: () => router.push(`/event/${event.eventId}`)
      })))
    })
  })

  // People
  promises.push(function () {
    return personStore.fetchPeople({ search: search.value, perPage: 2 }).then(() => {
      results.value.push(...personStore.people.data.map((person) => ({
        title: person.name,
        type: 'person',
        action: () => router.push(`/person/${person.personId}`)
      })))
    })
  })

  // Musics
  promises.push(function () {
    return musicStore.fetchMusics({ search: search.value, perPage: 2 }).then(() => {
      results.value.push(...musicStore.musics.data.map((music) => ({
        title: music.title,
        type: 'music',
        action: () => router.push(`/music/${music.musicId}`)
      })))
    })
  })

  // Seasons
  promises.push(function () {
    return seasonStore.fetchSeasons({ search: search.value, perPage: 2 }).then(() => {
      results.value.push(...seasonStore.seasons.data.map((season) => ({
        title: season.title,
        type: 'season',
        action: () => router.push(`/season/${season.seasonId}`)
      })))
    })
  })

  await Promise.all(promises.map(p => p()))

  // Trigger add buttons
  if (results.value.length === 0 || search.value.toLowerCase().includes('season')) addButtons.value.season.show = true
  if (results.value.length === 0 || search.value.toLowerCase().includes('event')) addButtons.value.event.show = true
  if (results.value.length === 0 || search.value.toLowerCase().includes('person')) addButtons.value.person.show = true
  if (results.value.length === 0 || search.value.toLowerCase().includes('music')) addButtons.value.music.show = true

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
        type: 'page',
        action: () => router.push(route.path)
      })
    }
  })

}, 1000)

onMounted(() => {
  setTimeout(() => {
    const input = document.getElementById('search')
    input.focus()
  }, 200)
  loadSearch()
})

// Watch search for changes
watch(() => search.value, loadSearch)

</script>

<style scoped>
.btn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
}
</style>