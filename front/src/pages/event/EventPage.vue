<template>
  <div>
    <TopActions :goBackButton="true" />

    <Loader v-if="eventStore.item?.loading" />
    <div v-else>
      <!-- Title and date section -->
      <section>
        <div v-if="eventStore.item?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ dateToNiceDate(eventStore.item?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="eventStore.item.data.title" type="text"
            class="rounded-lg bg-dark placeholder-gray text-light text-2xl w-full" placeholder="Event title" />
        </div>
      </section>

      <!-- Date & Location section -->
      <section>
        <div class="flex flex-col gap-4 sm:gap-1 bg-dark-light p-4 rounded-lg">
          <div class="flex flex-col sm:flex-row items-center justify-start gap-x-4 gap-y-2">
            <span class="text-lg font-medium text-gray-light">on</span>
            <DatePicker class="max-w-[15rem]" :value="eventStore.item?.data?.date"
              @update="(v) => { eventStore.item.data.date = v }" />
            <span class="text-lg font-medium text-gray-light">at</span>
            <div class="flex items-center justify-center gap-2">
              <MapPinIcon
                :class="['size-6 text-gray', eventStore.item?.data?.location ? 'hover:text-gray-light cursor-pointer' : '']"
                @click="openMaps()" />
              <input v-model="eventStore.item.data.location" id="location"
                class="p-2 rounded-lg bg-gray-dark text-light" placeholder="Location" />
            </div>
          </div>
        </div>
      </section>

      <!-- Color & Mood section -->
      <section>
        <div class="flex flex-row justify-around gap-4 bg-dark-light p-4 rounded-lg">
          <MoodPicker :value="eventStore.item.data.moodId" @update="(v) => { eventStore.item.data.moodId = v }" />
        </div>
      </section>

      <!-- Description & Mood section -->
      <section>
        <textarea v-model="eventStore.item.data.description"
          class="w-full p-2 rounded-lg bg-gray-dark placeholder-gray-light text-light" rows="10"
          placeholder="..."></textarea>
      </section>

      <!-- Pills section -->
      <section>
        <h4 class="text-lg font-semibold text-light mb-4">Linked items</h4>
        <LinkedItemsWrapper :item="eventStore.item.data" :parentType="'event'"
          :childrenTypes="['season', 'music', 'person']" />
      </section>
    </div>

    <BottomActions :createButton="!route.params.eventId" :updateButton="!!route.params.eventId"
      :deleteButton="!!route.params.eventId" @triggerCreate="manualCreation" @triggerUpdate="manualUpdate"
      @triggerDelete="manualDeletion" />
  </div>
</template>

<script setup>
import DatePicker from '@/components/fields/DatePickerComponent.vue'
import LinkedItemsWrapper from '@/components/fields/LinkedItemsWrapperComponent.vue'
import Loader from '@/components/LoaderComponent.vue'
import MoodPicker from '@/components/fields/MoodPickerComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import { MapPinIcon } from '@heroicons/vue/24/solid'
import TopActions from '@/components/actions/TopActionsComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { notif } from '@/composables/notif.js'
import { dateToNiceDate } from '@/composables/helpers.js'
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import debounce from '@/composables/debounce.js'

const route = useRoute()
const router = useRouter()
const eventStore = useEventStore()

const watched = ref(0)

function loadOrInitEvent() {
  if (route.params.eventId) {
    eventStore.fetchItem(route.params.eventId)
  } else {
    eventStore.initItem()
    if (route.query.title) eventStore.item.data.title = route.query.title // From the search page
  }
  watched.value = 0
}

function openMaps() {
  if (eventStore.item?.data?.location) window.open(`http://maps.google.com/?q=${eventStore.item.data.location}`)
}

function valid() {
  if (!eventStore.item.data.userId) return 'User is required, please reload the page'
  if (!eventStore.item.data.title) return 'Title is required'
  if (!eventStore.item.data.date) return 'Date is required'
  return false
}

function manualDeletion() {
  eventStore.deleteItem(eventStore.item.data.eventId, true)
  router.push('/events')
}

async function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await eventStore.createItem(eventStore.item.data, true)
  if (success) router.push('/events')
}

async function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await eventStore.updateItem(eventStore.item.data, true)
  if (success) router.push('/events')
}

const debouncedUpdate = debounce(() => {
  if (route.params.eventId) {
    const error = valid()
    if (!error) {
      eventStore.updateItem(eventStore.item.data)
    }
  }
}, 10000)

onMounted(() => {
  loadOrInitEvent()
})

onBeforeUnmount(() => {
  if (route.params.eventId) eventStore.updateItem(eventStore.item.data)
});

watch(() => route.params.eventId, () => {
  loadOrInitEvent()
})

watch(() => eventStore.item.data,
  () => {
    watched.value += 1
    if (watched.value <= 2) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);

</script>