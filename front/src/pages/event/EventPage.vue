<template>
  <div>
    <TopActions :goBackButton="true" />

    <Loader v-if="eventStore.event?.loading" />
    <div v-else>
      <!-- Title and date section -->
      <section>
        <div v-if="eventStore.event?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ dateToNiceDate(eventStore.event?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="eventStore.event.data.title" type="text" class="rounded-lg bg-dark placeholder-gray text-light text-2xl w-full"
            placeholder="Event title" />
        </div>
      </section>

      <!-- Date & Location section -->
      <section>
        <div class="flex flex-col gap-4 sm:gap-1 bg-dark-light p-4 rounded-lg">
          <div class="flex flex-col sm:flex-row items-center justify-start gap-x-4 gap-y-2">
            <span class="text-lg font-medium text-gray-light">on</span>
            <DatePicker class="max-w-[15rem]" :value="eventStore.event?.data?.date"
              @update="(v) => { eventStore.event.data.date = v }" />
            <span class="text-lg font-medium text-gray-light">at</span>
            <div class="flex items-center justify-center gap-2">
              <MapPinIcon
                :class="['size-6 text-gray', eventStore.event?.data?.location ? 'hover:text-gray-light cursor-pointer' : '']"
                @click="openMaps()" />
              <input v-model="eventStore.event.data.location" id="location"
                class="p-2 rounded-lg bg-gray-dark text-light" placeholder="Location" />
            </div>
          </div>
        </div>
      </section>

      <!-- Color & Mood section -->
      <section>
        <div class="flex flex-row justify-around gap-4 bg-dark-light p-4 rounded-lg">
          <MoodPicker class="max-w-[9rem]" :value="eventStore.event.data.moodId"
            @update="(v) => { eventStore.event.data.moodId = v }" />
        </div>
      </section>

      <!-- Description & Mood section -->
      <section>
        <textarea v-model="eventStore.event.data.description" class="w-full p-2 rounded-lg bg-gray-dark placeholder-gray-light text-light"
          rows="10" placeholder="..."></textarea>
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
    </div>

    <ItemPicker :show="showItemPicker" :types="availablesTypes" @close="showItemPicker = false"
      @selected="(object) => { addItem(object) }" />

    <BottomActions :createButton="!route.params.eventId" :updateButton="!!route.params.eventId"
      :deleteButton="!!route.params.eventId" @triggerCreate="manualCreation" @triggerUpdate="manualUpdate"
      @triggerDelete="manualDeletion" />
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
import TopActions from '@/components/TopActionsComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { notif } from '@/composables/notif.js'
import { dateToNiceDate } from '@/composables/helpers.js'
import { computed, ref, watch, onBeforeUnmount, onMounted } from 'vue'
import debounce from '@/composables/debounce.js'

const route = useRoute()
const router = useRouter()
const eventStore = useEventStore()

const showItemPicker = ref(false)
const watched = ref(0)

function loadOrInitEvent() {
  if (route.params.eventId) {
    eventStore.fetchEvent(route.params.eventId)
  } else {
    eventStore.initEvent()
    if (route.query.title) eventStore.event.data.title = route.query.title // From the search page
  }
  watched.value = 0
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
  if (!eventStore.event.data.date) return 'Date is required'
  return false
}

function manualDeletion() {
  eventStore.deleteEvent(eventStore.event.data.eventId, true)
  router.push('/events')
}

function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    eventStore.createEvent(eventStore.event.data, true)
    router.push('/events')
  }
}

function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    eventStore.updateEvent(eventStore.event.data, true)
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
}, 10000)

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
    watched.value += 1
    if (watched.value <= 2) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);

</script>