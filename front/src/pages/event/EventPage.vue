<template>
  <div>
    <Loader v-if="eventStore.event.loading" />
    <div v-else>

      <!-- Title and date section -->
      <section>
        <div>
          <span class="text-gray">Updated the {{ dateToNiceDate(eventStore.event?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <h1 class="text-2xl font-semibold text-light">{{ eventStore.event?.data?.title }}</h1>
          <div>
            <DatePicker :value="eventStore.event.data.date" @update="(v) => { eventStore.event.data.date = v }" />
          </div>
        </div>
      </section>

      <!-- Description section -->
      <section>
        <textarea v-model="eventStore.event.data.description" class="w-full p-2 rounded-lg bg-dark-gray text-light"
          rows="10" placeholder="..."> </textarea>
      </section>

      <!-- Location section -->
      <section class="flex items-center justify-center gap-2 flex-wrap">
        <input v-model="eventStore.event.data.location" id="location"
          class="w-full sm:w-2/3 md:w-1/2 p-2 rounded-lg bg-dark-gray text-light" placeholder="Location" />
      </section>

      <!-- Pills section -->
      <section>
        <h4 class="text-lg font-semibold text-light mb-4">Linked items</h4>
        <div v-if="eventStore.event?.data?.season || eventStore.event?.data?.music"
          class="flex justify-start flex-wrap items-center w-full m-2 gap-2">
          <Pill v-if="eventStore.event?.data?.season" :text="eventStore.event?.data?.season?.title" type="season"
            deleteable @delete="deleteSeason()" />
          <Pill v-if="eventStore.event?.data?.music" :text="eventStore.event?.data?.music?.title" type="music"
            deleteable @delete="deleteMusic()" />
          <div class="flex items-center gap-2 rounded-full p-0.5 bg-gray cursor-pointer" @click="showItemPicker = true">
            <PlusIcon class="size-6 text-light" />
          </div>
        </div>
        <div v-else
          class="flex items-center justify-center rounded-lg p-8 border-dashed border-2 border-light-gray cursor-pointer"
          @click="showItemPicker = true">
          <PlusIcon class="size-8 text-light" />
        </div>
      </section>

    </div>
    <ItemPicker :show="showItemPicker" @close="showItemPicker = false" />
    <BottomActions />
  </div>
</template>

<script setup>
import DatePicker from '@/components/DatePickerComponent.vue'
import ItemPicker from '@/components/ItemPickerComponent.vue'
import Loader from '@/components/LoaderComponent.vue'
import Pill from '@/components/PillComponent.vue'
import BottomActions from '@/components/BottomActionsComponent.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { dateToNiceDate } from '@/helpers/helpers.js'
import { ref } from 'vue'

const route = useRoute()
const eventStore = useEventStore()

const showItemPicker = ref(false)

eventStore.fetchEvent(route.params.eventId).then(() => {
  if (eventStore.event.data.title) route.meta.title = eventStore.event.data.title
})

function deleteSeason() {
  eventStore.event.data.season = null
  eventStore.event.data.seasonId = null
}

function deleteMusic() {
  eventStore.event.data.music = null
  eventStore.event.data.musicId = null
}

</script>