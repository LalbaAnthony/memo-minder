<template>
  <div>
    <Loader v-if="eventStore.event?.loading" />
    <div v-else>

      <!-- Title and date section -->
      <section>
        <div v-if="eventStore.event?.data?.updatedAt">
          <span class="text-gray">Updated the {{ dateToNiceDate(eventStore.event?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="confirmPassword" type="text"
            class="px-4 p-2 rounded-lg bg-dark text-light text-2xl hover:border-none focus:border-none"
            placeholder="Event title" />
          <div>
            <DatePicker :value="eventStore.event?.data?.date" @update="(v) => { eventStore.event.data.date = v }" />
          </div>
        </div>
      </section>

      <!-- Location section -->
      <section>
        <div class="flex items-center justify-center gap-2">
          <MapPinIcon
            :class="['size-6 text-gray', eventStore.event?.data?.location ? 'hover:text-gray-light cursor-pointer' : '']"
            @click="openMaps()" />
          <input v-model="eventStore.event.data.location" id="location"
            class="w-full sm:w-2/3 md:w-1/2 p-2 rounded-lg bg-gray-dark text-light" placeholder="Location" />
        </div>
      </section>

      <!-- Description & Mood section -->
      <section>
        <div class="flex items-center justify-start pb-4">
          <MoodPicker :value="eventStore.event.data.moodId" @update="(v) => { eventStore.event.data.mood = v }" />
        </div>
        <textarea v-model="eventStore.event.data.description" class="w-full p-2 rounded-lg bg-gray-dark text-light"
          rows="10" placeholder="..."> </textarea>
      </section>

      <!-- Pills section -->
      <section>
        <h4 class="text-lg font-semibold text-light mb-4">Linked items</h4>
        <div class="flex justify-start flex-wrap items-center w-full my-4 gap-4">
          <Pill v-if="eventStore.event?.data?.season" :text="eventStore.event?.data?.season?.title" type="season"
            deleteable @delete="deleteSeason()" clickable
            @click="router.push(`/season/${eventStore.event?.data?.seasonId}`)" />
          <Pill v-if="eventStore.event?.data?.music" :text="eventStore.event?.data?.music?.title" type="music"
            deleteable @delete="deleteMusic()" clickable
            @click="router.push(`/music/${eventStore.event?.data?.musicId}`)" />
          <Pill v-if="eventStore.event?.data?.person" :text="eventStore.event?.data?.person?.name" type="person"
            deleteable @delete="deletePerson()" clickable
            @click="router.push(`/person/${eventStore.event?.data?.personId}`)" />
          <div
            v-if="!eventStore.event?.data?.season || !eventStore.event?.data?.music || !eventStore.event?.data?.person"
            class="flex items-center justify-center rounded-full px-16 py-0.5 border-dashed border-2 cursor-pointer border-gray-light hover:border-light transition-all transition-200"
            @click="showItemPicker = true">
            <PlusIcon class="size-6 text-light" />
          </div>
        </div>
      </section>

      <!-- Actions section -->
      <section>
        <!-- Either the event is new or it's an existing one -->
        <div :class="['gap-4 flex items-center ', route.params?.eventId ? 'justify-start' : 'justify-end']">
          <!-- If it's an old event, show the delete button -->
          <button v-if="route.params.eventId"
            class="text-light p-2 rounded-lg cursor-pointer bg-danger hover:bg-danger-dark transition-colors duration-200"
            @click="eventStore.deleteEvent(eventStore.event.data.eventId)">
            <span class="mx-2 my-0.5">Delete</span>
          </button>
          <!-- If it's a new event, don't forget to save it! -->
          <button v-else
            class="text-light p-2 rounded-lg cursor-pointer bg-primary hover:bg-primary-dark transition-colors duration-200"
            @click="eventStore.createEvent(eventStore.event.data)">
            <span class="mx-4 my-0.5">Add</span>
          </button>
        </div>
      </section>
    </div>

    <ItemPicker :show="showItemPicker" :types="types" @close="showItemPicker = false"
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
import { MapPinIcon } from '@heroicons/vue/24/solid'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { dateToNiceDate } from '@/helpers/helpers.js'
import { computed, ref, watch } from 'vue'
import debounce from 'lodash/debounce'

const route = useRoute()
const router = useRouter()
const eventStore = useEventStore()

const showItemPicker = ref(false)

function loadEvent() {
  if (!route.params.eventId) return
  if (eventStore?.event?.data && eventStore.event.data.eventId == route.params.eventId) return
  eventStore.fetchEvent(route.params.eventId).then(() => {
    if (eventStore.event.data.title) route.meta.title = eventStore.event.data.title
  })
}

function deleteSeason() {
  eventStore.event.data.season = null
  eventStore.event.data.seasonId = null
}

function deleteMusic() {
  eventStore.event.data.music = null
  eventStore.event.data.musicId = null
}

function deletePerson() {
  eventStore.event.data.person = null
  eventStore.event.data.personId = null
}

function openMaps() {
  if (eventStore.event?.data?.location) window.open(`http://maps.google.com/?q=${eventStore.event.data.location}`)
}

function addItem(object) {
  if (object.type === 'season') {
    eventStore.event.data.season = object.data
    eventStore.event.data.seasonId = object.data.seasonId
  } else if (object.type === 'music') {
    eventStore.event.data.music = object.data
    eventStore.event.data.musicId = object.data.musicId
  } else if (object.type === 'person') {
    eventStore.event.data.person = object.data
    eventStore.event.data.personId = object.data.personId
  }
}

const types = computed(() => {
  let t = []

  if (!eventStore.event.data.season) t.push('season')
  if (!eventStore.event.data.music) t.push('music')
  if (!eventStore.event.data.person) t.push('person')

  return t
})

// Fetch event on mount
loadEvent()

watch(() => route.params.eventId, () => {
  loadEvent()
})

watch(() => eventStore.event.data,
  debounce(() => {
    if (route.params.eventId) eventStore.updateEvent(eventStore.event.data)
  }, 3000)
  , { deep: true })

</script>