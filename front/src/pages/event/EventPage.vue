<template>
  <div>
    <TopActions :goBackButton="true" />

    <Loader v-if="eventStore.item?.loading" />
    <div v-else>
      <!-- Title and date section -->
      <section>
        <div v-if="eventStore.item?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ translateDate(eventStore.item?.data?.updatedAt) }}</span>
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
            <DatePicker class="max-w-[15rem]" :value="eventStore.item?.data?.date"
              @update="(v) => { eventStore.item.data.date = v }" />
            <span class="text-lg font-medium text-gray-light">in</span>
            <div class="flex items-center justify-center gap-2 w-full max-w-[24rem] p-1.5 px-2.5 rounded-lg bg-gray-dark">
              <ClipboardDocumentIcon
                :class="['size-5', eventStore.item?.data?.location ? 'text-gray-light cursor-pointer' : 'text-gray']"
                @click="copyToClipboard(eventStore.item?.data?.location)" />
              <input v-model="eventStore.item.data.location" id="location"
                class="w-full rounded-lg bg-gray-dark text-light" placeholder="Location" />
              <ArrowTopRightOnSquareIcon
                :class="['size-6', eventStore.item?.data?.location ? 'text-gray-light cursor-pointer' : 'text-gray']"
                @click="openLink(eventStore.item.data?.location ? `http://maps.google.com/?q=${eventStore.item.data.location}` : '')" />
            </div>
          </div>
        </div>
      </section>

      <!-- Color & Mood section -->
      <section>
        <div class="flex flex-row justify-center items-center gap-4 bg-dark-light p-4 rounded-lg">
          <span class="text-lg font-medium text-gray-light">with</span>
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
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'
import { ClipboardDocumentIcon } from '@heroicons/vue/24/solid'
import TopActions from '@/components/actions/TopActionsComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { notif } from '@/composables/notif'
import { translateDate } from '@/composables/beautify'
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import debounce from '@/composables/debounce'
import { copyToClipboard, openLink } from '@/composables/helpers'

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
  eventStore.item.loading = false
}

function valid() {
  if (!eventStore.item.data.userId) return 'User is required, please reload the page'
  if (!eventStore.item.data.title) return 'Title is required'
  if (!eventStore.item.data.date) return 'Date is required'
  return false
}

function manualDeletion() {
  eventStore.deleteItem(eventStore.item.data.eventId, true)
  router.go(-1)
}

async function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await eventStore.createItem(eventStore.item.data, true)
  if (success) router.go(-1)
}

async function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await eventStore.updateItem(eventStore.item.data, true)
  if (success) router.go(-1)
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