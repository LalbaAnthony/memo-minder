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
          <input v-model="eventStore.event.data.title" type="text" class="rounded-lg bg-dark text-light text-2xl"
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
            class="flex items-center justify-center rounded-full px-16 py-0.5 border-dashed border-2 cursor-pointer border-gray hover:border-gray-light transition-all transition-200"
            @click="showItemPicker = true">
            <PlusIcon class="size-6 text-gray-light" />
          </div>
        </div>
      </section>

      <!-- Actions section -->
      <section>
        <div v-if="route.params.eventId" class="gap-4 flex items-center justify-between">
          <button
            class="text-light p-2 rounded-lg cursor-pointer bg-danger hover:bg-danger-dark transition-colors duration-200"
            @click="manualDeletion()">
            <span class="mx-2 my-0.5">Delete</span>
          </button>
          <button
            class="text-light p-2 rounded-lg cursor-pointer bg-primary hover:bg-primary-dark transition-colors duration-200"
            @click="manualUpdate()">
            <span class="mx-4 my-0.5">Update</span>
          </button>
        </div>
        <div v-else class="gap-4 flex items-center justify-end">
          <button
            class="text-light p-2 rounded-lg cursor-pointer bg-primary hover:bg-primary-dark transition-colors duration-200"
            @click="manualCreation()">
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
import { MapPinIcon } from '@heroicons/vue/24/solid'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { notif } from '@/helpers/notif.js'
import { dateToNiceDate } from '@/helpers/functions.js'
import { computed, ref, watch, onBeforeUnmount, onMounted } from 'vue'
import debounce from 'lodash/debounce'

const route = useRoute()
const router = useRouter()
const eventStore = useEventStore()

const showItemPicker = ref(false)
const isInitialLoad = ref(true)

function loadOrInitEvent() {
  if (route.params.eventId) {
    eventStore.fetchEvent(route.params.eventId)
  } else {
    eventStore.initEvent()
    if (route.query.title) eventStore.event.data.title = route.query.title // From the search page
  }
  isInitialLoad.value = false
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

function valid() {
  if (!eventStore.event.data.userId) return 'User is required, please reload the page'
  if (!eventStore.event.data.title) return 'Title is required'
  return false
}

function manualDeletion() {
  eventStore.deleteEvent(eventStore.event.data.eventId)
  router.push('/events')
}

function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    eventStore.createEvent(eventStore.event.data)
  }
}

function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    eventStore.updateEvent(eventStore.season.data)
    router.push('/events')
  }
}

const availablesTypes = computed(() => {
  let types = []

  if (!eventStore.event.data.season) types.push('season')
  if (!eventStore.event.data.music) types.push('music')
  if (!eventStore.event.data.person) types.push('person')

  return types
})

const debouncedUpdate = debounce(() => {
  if (route.params.eventId) {
    const error = valid()
    if (!error) {
      eventStore.updateEvent(eventStore.event.data)
    }
  }
}, 3000)

onMounted(() => {
  loadOrInitEvent()
})

onBeforeUnmount(() => {
  if (route.params.eventId) eventStore.updateEvent(eventStore.event.data)
});

watch(() => route.params.eventId, () => {
  loadOrInitEvent()
})

watch(() => eventStore.event.data,
  () => {
    if (isInitialLoad.value) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);

</script>