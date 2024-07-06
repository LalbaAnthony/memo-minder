<template>
  {{ selected }}
  <Combobox v-model="selected">
    <div class="relative w-48 cursor-default">
      <!-- :displayValue="((mood) => mood.name)" -->
      <ComboboxInput class="w-48 py-2 pl-3 pr-10 bg-dark-gray text-light rounded-lg"
        @change="search = $event.target.value" />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon class="size-6 text-light-gray" aria-hidden="true" />
      </ComboboxButton>
    </div>
    <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
      @after-leave="search = ''">
      <ComboboxOptions class="absolute mt-2 max-h-60 w-48 overflow-auto rounded-lg bg-dark-gray text-light">
        <ComboboxOption v-for="mood in filteredMoods" :key="mood.id" :value="mood" v-slot="{ active }">
          <li :class="['flex justify-right p-2 cursor-pointer', active ? 'bg-primary' : '']">
            <span>{{ mood.name }}</span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </TransitionRoot>
  </Combobox>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/24/solid'
import { useMoodStore } from '@/stores/mood'

const moodStore = useMoodStore()

if (!moodStore.moods.data || moodStore.moods.data.length === 0) moodStore.fetchMoods()

const emit = defineEmits(['update'])

const search = ref('')
const selected = ref(moodStore.moods.data[0] || null)

const filteredMoods = computed(() =>
  search.value === ''
    ? moodStore.moods.data
    : moodStore.moods.data.filter((mood) =>
      mood.name.toLowerCase().replace(/\s+/g, '').includes(search.value.toLowerCase().replace(/\s+/g, ''))
    )
)
watch(() => selected.value, () => {
  emit('update', selected.value.moodId)
})

</script>
