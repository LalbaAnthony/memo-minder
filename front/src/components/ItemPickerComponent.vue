<template>
  <TransitionRoot appear :show="props.show" as="template">
    <Dialog as="div" @close="emit('close', true)" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 opacity-90 bg-dark" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-dark-light p-6 transition-all">

              <div class="flex items-center justify-between gap-3">
                <MagnifyingGlassIcon class="size-10 text-gray-light hidden sm:block" />
                <input v-model="search" id="search" type="text" class="w-full p-2 rounded-lg bg-gray-dark text-light"
                  placeholder="Search..." />
                <XMarkIcon class="size-10 text-gray-light cursor-pointer" @click.stop="emit('close', true)" />
              </div>

              <!-- Results -->
              <TransitionRoot :show="search.length > 0" class="w-full mt-8">
                <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
                  leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                  <Grid :items="results" :max-height="isMobile() ? window.innerHeight - 200 : 0" clickables>
                    <template #item="{ item }">
                      <Result :item="item" icon="plus" />
                    </template>
                  </Grid>
                </TransitionChild>
              </TransitionRoot>

              <!-- Add buttons -->
              <div v-if="search.length > 0 && results.length === 0" class="mt-8">
                <span class="text-gray-light">Haven't found what your looking for ?</span>
                <div class="flex flex-row flex-wrap flexitems-center gap-2 mt-2">
                  <Pill v-if="props.types && props.types.includes('event')" text="Add an event" type="event" clickable
                    @click="router.push({ path: '/events/add', query: { title: search } }); emit('close', true)" />
                  <Pill v-if="props.types && props.types.includes('person')" text="Add a person" type="person" clickable
                    @click="router.push({ path: '/people/add', query: { name: search } }); emit('close', true)" />
                  <Pill v-if="props.types && props.types.includes('music')" text="Add a music" type="music" clickable
                    @click="router.push({ path: '/musics/add', query: { title: search } }); emit('close', true)" />
                  <Pill v-if="props.types && props.types.includes('season')" text="Add a season" type="season" clickable
                    @click="router.push({ path: '/seasons/add', query: { title: search } }); emit('close', true)" />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel
} from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import Grid from '@/components/GridComponent.vue'
import Result from '@/components/ResultItem.vue'
import Pill from '@/components/PillComponent.vue'
import { isMobile } from '@/helpers/helpers'
import { watch, ref } from 'vue'
import debounce from 'lodash/debounce'
import { useEventStore } from '@/stores/event'
import { useMusicStore } from '@/stores/music'
import { usePersonStore } from '@/stores/person'
import { useSeasonStore } from '@/stores/season'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  types: {
    type: Array,
    required: true
  }
})

const eventStore = useEventStore()
const musicStore = useMusicStore()
const personStore = usePersonStore()
const seasonStore = useSeasonStore()

const PER_PAGE = 10

const search = ref('')
const results = ref([])

const emit = defineEmits(['selected', 'close'])

const loadSearch = debounce(async () => {
  if (!search.value) return

  results.value = []

  let promises = []

  // Events
  if (props.types && props.types.includes('event')) {
    promises.push(async function () {
      return eventStore.fetchEvents({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...eventStore.events.data.map((event) => ({
          title: event.title,
          type: 'event',
          action: () => { emit('selected', { type: 'event', data: event }), emit('close', true) }
        })))
      })
    })
  }

  // People
  if (props.types && props.types.includes('person')) {
    promises.push(async function () {
      return personStore.fetchPeople({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...personStore.people.data.map((person) => ({
          title: person.name,
          type: 'person',
          action: () => { emit('selected', { type: 'person', data: person }), emit('close', true) }
        })))
      })
    })
  }

  // Musics
  if (props.types && props.types.includes('music')) {
    promises.push(async function () {
      return musicStore.fetchMusics({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...musicStore.musics.data.map((music) => ({
          title: music.title,
          type: 'music',
          action: () => { emit('selected', { type: 'music', data: music }), emit('close', true) }
        })))
      })
    })
  }

  // Seasons
  if (props.types && props.types.includes('season')) {
    promises.push(async function () {
      return seasonStore.fetchSeasons({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...seasonStore.seasons.data.map((season) => ({
          title: season.title,
          type: 'season',
          action: () => { emit('selected', { type: 'season', data: season }), emit('close', true) }
        })))
      })
    })
  }

  await Promise.all(promises.map(p => p()))

}, 1000)


// Watch search for changes
watch(() => search.value, loadSearch)

</script>
