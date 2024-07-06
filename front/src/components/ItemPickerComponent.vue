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
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-light-dark p-6 transition-all">

              <div class="flex items-center justify-between gap-3">
                <MagnifyingGlassIcon class="size-10 text-light-gray hidden sm:block" />
                <input v-model="search" id="search" type="text" class="w-full p-2 rounded-lg bg-dark-gray text-light"
                  placeholder="Search..." />
                <XMarkIcon class="size-10 text-light-gray cursor-pointer" @click.stop="emit('close', true)" />
              </div>

              <!-- Results -->
              <TransitionRoot :show="search.length > 0" class="w-full">
                <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
                  leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                  <Grid :items="results">
                    <template #item="{ item }">
                      <Result :item="item" icon="plus" />
                    </template>
                  </Grid>
                </TransitionChild>
              </TransitionRoot>

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
import { watch, ref } from 'vue'
import debounce from 'lodash/debounce'
import { useEventStore } from '@/stores/event'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  types: {
    type: Array,
    required: false
  }
})

const search = ref('')
const results = ref([])

const eventStore = useEventStore()

const emit = defineEmits(['selected'])

const loadSearch = debounce(async () => {
  if (!search.value) return

  results.value = []

  console.log('Searching for:', search.value, 'with types:', props.types)

  // Events
  if (!props.types || (props.types &&  props.types.includes('event'))) {
    await eventStore.fetchEvents({ search: search.value }).then(() => {
      results.value.push(...eventStore.events.data.map((event) => ({
        title: event.title,
        type: 'event',
        action: () => emit('selected', event)
      })))
    })
  }

  // People
  // ...

  // Musics
  // ...

  // Seasons
  // ...
}, 1000)

// Watch search for changes
watch(() => search.value, loadSearch)

</script>
