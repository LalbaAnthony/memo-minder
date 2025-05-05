<template>
  <div class="flex flex-col cursor-pointer border-2 border-gray rounded-[8px] bg-dark-light h-full overflow-hidden">
    <div class="flex-1 p-5" @click="goToEvent()">
      <div class="flex flex-col justify-center items-center w-full my-2">
        <h1 class="text-2xl font-bold text-center">{{ threeDotsString(props?.event?.title) }}</h1>
        <p class="text-sm text-gray-light">the {{ dateToNiceDate(props?.event?.date) }} {{ props?.event?.location ? `at
          ${props?.event?.location}` : '' }}</p>
      </div>
      <div class="my-4">
        <div class="flex justify-start flex-wrap items-center w-full m-2 gap-2">
          <Pill v-if="props?.event?.mood" :text="props?.event?.mood?.name" type="mood" />
          <Pill v-if="props?.event?.seasons?.[0]" :text="props?.event?.seasons?.[0]?.title" type="season" />
          <Pill v-if="props?.event?.musics?.[0]" :text="props?.event?.musics?.[0]?.title" type="music" />
          <Pill v-if="props?.event?.people?.[0]" :text="props?.event?.people?.[0]?.name" type="person" />
        </div>
        <p class="m-2 my-4">{{ threeDotsString(event?.description) }}</p>
      </div>
    </div>
    <div class="grid grid-cols-2 divide-x-2 divide-gray cursor-pointer">
      <div class="flex justify-center items-center p-2 bg-gray-dark rounded-bl-[6px]" @click="deleteEvent()">
        <TrashIcon class="size-6" />
      </div>
      <div class="flex justify-center items-center p-2 bg-gray-dark rounded-br-[6px]" @click="goToEvent()">
        <PencilSquareIcon class="size-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Pill from '@/components/PillComponent.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { threeDotsString } from '@/composables/helpers'
import { dateToNiceDate } from '@/composables/helpers'
import { useEventStore } from '@/stores/event'
import { useRouter } from 'vue-router'

const router = useRouter()

const eventStore = useEventStore()

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

function deleteEvent() {
    if (confirm('Are you sure you want to delete this event?')) eventStore.deleteItem(props.event.eventId, true)
}

function goToEvent() {
  router.push(`/event/${props.event.eventId}`)
}

</script>
