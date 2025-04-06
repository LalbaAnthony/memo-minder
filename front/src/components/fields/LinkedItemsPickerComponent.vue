<template>
  <TransitionRoot appear :show="props.show" as="template">
    <Dialog as="div" @close="emit('closePicker', true)" class="relative z-20">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 opacity-90 bg-dark" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div :class="['flex items-center justify-center p-4 text-center', isMobile() ? 'h-1/7' : 'h-2/3']">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-dark-light p-6 transition-all">

              <div class="flex items-center justify-between gap-3">
                <MagnifyingGlassIcon class="size-10 text-gray-light hidden sm:block" />
                <input v-model="search" id="search" type="text" class="w-full p-2 rounded-lg bg-gray-dark text-light"
                  placeholder="Search..." />
                <XMarkIcon class="size-10 text-gray-light cursor-pointer" @click.stop="emit('closePicker', true)" />
              </div>

              <!-- Results -->
              <TransitionRoot :show="search.length > 0" class="w-full mt-8">
                <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
                  leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                  <Grid :items="results" :enable-no-item="!searching" :max-height="gridMaxHeight" clickables>
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
                  <Pill v-if="props.childrenTypes && props.childrenTypes.includes('season')" text="Add a season" type="season" clickable
                    addable
                    @click="router.push({ path: '/seasons/add', query: { title: search } }); emit('closePicker', true)" />
                  <Pill v-if="props.childrenTypes && props.childrenTypes.includes('event')" text="Add an event" type="event" clickable
                    addable
                    @click="router.push({ path: '/events/add', query: { title: search } }); emit('closePicker', true)" />
                  <Pill v-if="props.childrenTypes && props.childrenTypes.includes('person')" text="Add a person" type="person" clickable
                    addable
                    @click="router.push({ path: '/people/add', query: { name: search } }); emit('closePicker', true)" />
                  <Pill v-if="props.childrenTypes && props.childrenTypes.includes('music')" text="Add a music" type="music" clickable
                    addable
                    @click="router.push({ path: '/musics/add', query: { title: search } }); emit('closePicker', true)" />
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
import { isMobile } from '@/composables/helpers.js'
import Result from '@/components/ResultItem.vue'
import Pill from '@/components/PillComponent.vue'
import { computed, watch, ref } from 'vue'
import debounce from '@/composables/debounce.js'
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
  childrenTypes: {
    type: Array,
    required: false,
    default: () => {
      return ['event', 'music', 'person', 'season']
    }
  }
})

const eventStore = useEventStore()
const musicStore = useMusicStore()
const personStore = usePersonStore()
const seasonStore = useSeasonStore()

const PER_PAGE = 5

const searching = ref(false)
const search = ref('')
const results = ref([])

const emit = defineEmits(['add', 'closePicker'])

const gridMaxHeight = computed(() => {
  return isMobile() ? window.innerHeight - 400 : 0
})

const loadSearch = debounce(async () => {
  if (!search.value) return

  searching.value = true

  results.value = []

  let promises = []

  // Events
  if (props.childrenTypes && props.childrenTypes.includes('event')) {
    promises.push(async function () {
      return eventStore.fetchEvents({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...eventStore.events.data.map((event) => ({
          title: event.title,
          type: 'event',
          action: () => { emit('selected', { type: 'event', data: event }), emit('closePicker', true) }
        })))
      })
    })
  }

  // People
  if (props.childrenTypes && props.childrenTypes.includes('person')) {
    promises.push(async function () {
      return personStore.fetchPeople({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...personStore.people.data.map((person) => ({
          title: person.name,
          type: 'person',
          action: () => { emit('add', { type: 'person', data: person }), emit('closePicker', true) }
        })))
      })
    })
  }

  // Musics
  if (props.childrenTypes && props.childrenTypes.includes('music')) {
    promises.push(async function () {
      return musicStore.fetchMusics({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...musicStore.musics.data.map((music) => ({
          title: music.title,
          type: 'music',
          action: () => { emit('add', { type: 'music', data: music }), emit('closePicker', true) }
        })))
      })
    })
  }

  // Seasons
  if (props.childrenTypes && props.childrenTypes.includes('season')) {
    promises.push(async function () {
      return seasonStore.fetchSeasons({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...seasonStore.seasons.data.map((season) => ({
          title: season.title,
          type: 'season',
          action: () => { emit('add', { type: 'season', data: season }), emit('closePicker', true) }
        })))
      })
    })
  }

  await Promise.all(promises.map(p => p())).then(() => {
    searching.value = false
  })
}, 1000)


// Watch search for changes
watch(() => search.value, loadSearch)

</script>
