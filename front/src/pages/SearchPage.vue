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
    <div class="flex flex-row flex-wrap flexitems-center justify-center gap-2 mt-2 mx-4">
      <TransitionRoot :show="addButtons.season.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <Pill text="Add a as season" type="season" addable clickable
            @click="router.push({ path: '/seasons/add', query: { title: toAddString } })" />
        </TransitionChild>
      </TransitionRoot>
      <TransitionRoot :show="addButtons.event.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <Pill text="Add  as an event" type="event" addable clickable
            @click="router.push({ path: '/events/add', query: { title: toAddString } })" />
        </TransitionChild>
      </TransitionRoot>
      <TransitionRoot :show="addButtons.person.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <Pill text="Add as a person" type="person" addable clickable
            @click="router.push({ path: '/people/add', query: { name: toAddString } })" />
        </TransitionChild>
      </TransitionRoot>
      <TransitionRoot :show="addButtons.music.show">
        <TransitionChild as="div" enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <Pill text="Add as a music" type="music" addable clickable
            @click="router.push({ path: '/musics/add', query: { title: toAddString } })" />
        </TransitionChild>
      </TransitionRoot>
    </div>

    <!-- Nb of results -->
    <div v-if="search && results.length > 0">
      <p class="text-center text-gray-light text-sm p-4 pt-8">
        {{ results.length }} {{ results.length > 1 ? 'results' : 'result' }}
      </p>
    </div>

    <!-- Results -->
    <Grid v-if="search" :items="results" :enable-no-item="!searching">
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
import Pill from '@/components/PillComponent.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
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

const PER_PAGE = 2

const searching = ref(false)
const search = ref(route.query.search || '')
const results = ref([])

const addButtons = ref({
  season: { show: false },
  event: { show: false },
  person: { show: false },
  music: { show: false }
})

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

  searching.value = true

  results.value = []

  let promises = []

  // Events
  promises.push(async function () {
    return eventStore.fetchEvents({ search: search.value, perPage: PER_PAGE }).then(() => {
      results.value.push(...eventStore.events.data.map((event) => ({
        title: event.title,
        type: 'event',
        action: () => router.push(`/event/${event.eventId}`)
      })))
    })
  })

  // People
  promises.push(async function () {
    return personStore.fetchPeople({ search: search.value, perPage: PER_PAGE }).then(() => {
      results.value.push(...personStore.people.data.map((person) => ({
        title: person.name,
        type: 'person',
        action: () => router.push(`/person/${person.personId}`)
      })))
    })
  })

  // Musics
  promises.push(async function () {
    return musicStore.fetchMusics({ search: search.value, perPage: PER_PAGE }).then(() => {
      results.value.push(...musicStore.musics.data.map((music) => ({
        title: music.title,
        type: 'music',
        action: () => router.push(`/music/${music.musicId}`)
      })))
    })
  })

  // Seasons
  promises.push(async function () {
    return seasonStore.fetchSeasons({ search: search.value, perPage: PER_PAGE }).then(() => {
      results.value.push(...seasonStore.seasons.data.map((season) => ({
        title: season.title,
        type: 'season',
        action: () => router.push(`/season/${season.seasonId}`)
      })))
    })
  })

  await Promise.all(promises.map(p => p())).then(() => {
    searching.value = false
  })

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
  if (route.query.search) loadSearch()
})

// Watch search for changes
watch(() => search.value, loadSearch)

</script>