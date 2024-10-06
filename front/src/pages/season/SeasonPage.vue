<template>
  <div>
    <Loader v-if="seasonStore.season?.loading" />
    <div v-else>
      <!-- Title and date section -->
      <section>
        <div v-if="seasonStore.season?.data?.updatedAt">
          <span class="text-gray">Updated the {{ dateToNiceDate(seasonStore.season?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="seasonStore.season.data.title" type="text" class="rounded-lg bg-dark text-light text-2xl"
            placeholder="Season title" />
        </div>
      </section>
      
      <!-- Dates section -->
      <section>
        <div class="flex flex-wrap items-center justify-start gap-4">
          <span>From</span>
          <DatePicker class="max-w-48" :value="seasonStore.season?.data?.dateStart"
            @update="(v) => { seasonStore.season.data.dateStart = v }" />
          <span>To</span>
          <DatePicker class="max-w-48" :value="seasonStore.season?.data?.dateEnd"
            @update="(v) => { seasonStore.season.data.dateEnd = v }" />
        </div>
      </section>

      <!-- Color section -->
      <section>
        <div class="flex items-center justify-start gap-4">
          <span>Color:</span>
          <input v-model="seasonStore.season.data.color" type="color" />
        </div>
      </section>

      <!-- Description & Mood section -->
      <section>
        <div class="flex items-center justify-start pb-4">
          <MoodPicker :value="seasonStore.season.data.moodId" @update="(v) => { seasonStore.season.data.mood = v }" />
        </div>
        <textarea v-model="seasonStore.season.data.description" class="w-full p-2 rounded-lg bg-gray-dark text-light"
          rows="10" placeholder="..."> </textarea>
      </section>

      <!-- Pills section -->
      <section>
        <h4 class="text-lg font-semibold text-light mb-4">Linked items</h4>
        <div class="flex justify-start flex-wrap items-center w-full my-4 gap-4">
          <Pill v-if="seasonStore.season?.data?.music" :text="seasonStore.season?.data?.music?.title" type="music"
            deleteable @delete="deleteMusic()" clickable
            @click="router.push(`/music/${seasonStore.season?.data?.musicId}`)" />
          <Pill v-if="seasonStore.season?.data?.person" :text="seasonStore.season?.data?.person?.name" type="person"
            deleteable @delete="deletePerson()" clickable
            @click="router.push(`/person/${seasonStore.season?.data?.personId}`)" />
          <div v-if="!seasonStore.season?.data?.music || !seasonStore.season?.data?.person"
            class="flex items-center justify-center rounded-full px-16 py-0.5 border-dashed border-2 cursor-pointer border-gray hover:border-gray-light transition-all transition-200"
            @click="showItemPicker = true">
            <PlusIcon class="size-6 text-gray-light" />
          </div>
        </div>
      </section>

      <!-- Actions section -->
      <section>
        <div v-if="route.params.seasonId" class="gap-4 flex items-center justify-between">
          <button
            class="text-light p-2 rounded-lg cursor-pointer bg-danger hover:bg-danger-dark transition-colors duration-200"
            @click="seasonStore.deleteSeason(seasonStore.season.data.seasonId)">
            <span class="mx-2 my-0.5">Delete</span>
          </button>
          <button
            class="text-light p-2 rounded-lg cursor-pointer bg-primary hover:bg-primary-dark transition-colors duration-200"
            @click="seasonStore.updateSeason(seasonStore.season.data); debouncedUpdate.cancel()">
            <span class="mx-4 my-0.5">Update</span>
          </button>
        </div>
        <div v-else class="gap-4 flex items-center justify-end">
          <button
            class="text-light p-2 rounded-lg cursor-pointer bg-primary hover:bg-primary-dark transition-colors duration-200"
            @click="seasonStore.createSeason(seasonStore.season.data)">
            <span class="mx-4 my-0.5">Create</span>
          </button>
        </div>
      </section>
    </div>
    <ItemPicker :show="showItemPicker" :types="availablesTypes" @close="showItemPicker = false"
      @selected="(object) => { addItem(object) }" />
    <BottomActions />
  </div>
</template>

<script setup>
import DatePicker from '@/components/DatePickerComponent.vue'
import ItemPicker from '@/components/ItemPickerComponent.vue'
import Loader from '@/components/LoaderComponent.vue'
import MoodPicker from '@/components/MoodPickerComponent.vue'
import Pill from '@/components/PillComponent.vue'
import BottomActions from '@/components/BottomActionsComponent.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { useRoute, useRouter } from 'vue-router'
import { useSeasonStore } from '@/stores/season'
import { dateToNiceDate } from '@/helpers/helpers.js'
import { computed, ref, watch, onBeforeUnmount, onMounted } from 'vue'
import debounce from 'lodash/debounce'

const route = useRoute()
const router = useRouter()
const seasonStore = useSeasonStore()

const showItemPicker = ref(false)

function loadOrInitSeason() {
  if (route.params.seasonId) {
    seasonStore.fetchSeason(route.params.seasonId)
  } else {
    seasonStore.initSeason()
    if (route.query.title) seasonStore.season.data.title = route.query.title // From the search page
  }
}

function deleteMusic() {
  seasonStore.season.data.music = null
  seasonStore.season.data.musicId = null
}

function deletePerson() {
  seasonStore.season.data.person = null
  seasonStore.season.data.personId = null
}

function addItem(object) {
  if (object.type === 'music') {
    seasonStore.season.data.music = object.data
    seasonStore.season.data.musicId = object.data.musicId
  } else if (object.type === 'person') {
    seasonStore.season.data.person = object.data
    seasonStore.season.data.personId = object.data.personId
  }
}

const availablesTypes = computed(() => {
  let types = []

  if (!seasonStore.season.data.music) types.push('music')
  if (!seasonStore.season.data.person) types.push('person')

  return types
})

const debouncedUpdate = debounce(() => {
  if (route.params.seasonId) seasonStore.updateSeason(seasonStore.season.data)
}, 3000)

onMounted(() => {
  loadOrInitSeason()
})

onBeforeUnmount(() => {
  if (route.params.seasonId) seasonStore.updateSeason(seasonStore.season.data)
});

watch(() => route.params.seasonId, () => {
  loadOrInitSeason()
})

watch(() => seasonStore.season.data,
  debouncedUpdate
  , { deep: true })

</script>