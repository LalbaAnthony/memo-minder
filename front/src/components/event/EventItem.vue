<template>
  <div class="flex flex-col cursor-pointer border-2 border-gray rounded-[8px] bg-light-dark h-full">
    <router-link class="p-5" :to="{ path: `/event/${props?.event?.eventId}` }">
      <div class="flex flex-col justify-center items-center w-full my-2">
        <h1 class="text-2xl font-bold">{{ props?.event?.title }}</h1>
        <p class="text-sm text-light-gray">the {{ dateToNiceDate(props?.event?.date) }} {{ props?.event?.location ? `at
          ${props?.event?.location}` : '' }}</p>
      </div>
      <div class="my-4">
        <div class="flex justify-start flex-wrap items-center w-full m-2 gap-2">
          <Pill :text="props?.event?.season?.title" type="season" />
          <Pill :text="props?.event?.music?.title" type="music" />
        </div>
        <p class="m-2 my-4">{{ threeDotString(event?.description) }}</p>
      </div>
    </router-link>
    <div class="grid grid-cols-2 divide-x-2 divide-gray cursor-pointer">
      <div class="flex justify-center items-center p-2 bg-light-gray rounded-bl-[6px]" @click="deleteEvent">
        <TrashIcon class="size-6" />
      </div>
      <router-link class="flex justify-center items-center p-2 bg-light-gray rounded-br-[6px]"
        :to="{ path: `/event/${props?.event?.eventId}` }">
        <PencilSquareIcon class="size-6" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Pill from '@/components/PillComponent.vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { PencilSquareIcon } from '@heroicons/vue/24/solid'
import { threeDotString } from '@/helpers/helpers'
import { dateToNiceDate } from '@/helpers/helpers'
import { useEventStore } from '@/stores/event'

const eventStore = useEventStore()

function deleteEvent() {
  if (confirm('Are you sure you want to delete this event?')) eventStore.deleteEvent(props.event.eventId)
}

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

</script>
