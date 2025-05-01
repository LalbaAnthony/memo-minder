<template>
  <TransitionRoot appear :show="props.show" as="template">
    <Dialog as="div" @close="emit('closePicker', true)" class="relative z-20">
      <!-- Darken background -->
      <TransitionChild enter="transition ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="transition ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-dark bg-opacity-90 transition-opacity"></div>
      </TransitionChild>
      
      <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-y-full"
        enter-to="translate-y-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-y-0"
        leave-to="translate-y-full">
        <DialogPanel class="bg-dark-light border-t border-gray p-6 fixed inset-0 mt-64">
          <div class="flex items-center justify-between gap-3">
            <MagnifyingGlassIcon class="size-10 text-gray-light hidden sm:block" />
            <input v-model="search" id="search" type="text" class="w-full p-2 rounded-lg bg-gray-dark text-light"
              placeholder="Search..." />
            <XMarkIcon class="size-10 text-gray-light cursor-pointer" @click.stop="emit('closePicker', true)" />
          </div>

          <!-- Results -->
          <TransitionRoot :show="search.length > 0" class="w-full mt-4">
            <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
              leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
              <Grid :items="results" :enable-no-item="!searching" clickables
                :noItemPosition="isMobile() ? 'static' : 'absolute'">
                <template #item="{ item }">
                  <Result :item="item" icon="plus" />
                </template>
              </Grid>
            </TransitionChild>
          </TransitionRoot>
        </DialogPanel>
      </TransitionChild>
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
import { watch, ref } from 'vue'
import debounce from '@/composables/debounce.js'
import { useEventStore } from '@/stores/event'
import { useMusicStore } from '@/stores/music'
import { usePersonStore } from '@/stores/person'
import { useSeasonStore } from '@/stores/season'
import { isMobile } from '@/composables/helpers'

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

const PER_PAGE = 10

const searching = ref(false)
const search = ref('')
const results = ref([])

const emit = defineEmits(['add', 'closePicker'])

const loadSearch = debounce(async () => {
  if (!search.value) return

  searching.value = true

  results.value = []

  let promises = []

  // Events
  if (props.childrenTypes && props.childrenTypes.includes('event')) {
    promises.push(async function () {
      return eventStore.fetchItems({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...eventStore.items.data.map((event) => ({
          title: event.title,
          type: 'event',
          action: () => { emit('add', { type: 'event', data: event }), emit('closePicker', true) }
        })))
      })
    })
  }

  // People
  if (props.childrenTypes && props.childrenTypes.includes('person')) {
    promises.push(async function () {
      return personStore.fetchItems({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...personStore.items.data.map((person) => ({
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
      return musicStore.fetchItems({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...musicStore.items.data.map((music) => ({
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
      return seasonStore.fetchItems({ search: search.value, perPage: PER_PAGE }).then(() => {
        results.value.push(...seasonStore.items.data.map((season) => ({
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
