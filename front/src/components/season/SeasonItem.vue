<template>
  <div class="flex flex-col cursor-pointer border-2 border-gray rounded-[8px] bg-dark-light h-full">
    <div class="h-6 w-full rounded-t-[6px]" :style="`background-color: ${props?.season?.color};`"></div>
    <router-link class="flex-1 p-5" :to="{ path: `/season/${props?.season?.seasonId}` }">
      <div class="flex flex-col justify-center items-center w-full my-2">
        <h1 class="text-2xl font-bold">{{ props?.season?.title }}</h1>
        <p class="text-sm text-gray-light">on {{ dateToNiceDate(props?.season?.createdAt) }}</p>
      </div>
      <div class="my-4">
        <div class="flex justify-start flex-wrap items-center w-full m-2 gap-2">
          <Pill v-if="props?.season?.season" :text="props?.season?.season?.title" type="season" />
          <Pill v-if="props?.season?.music" :text="props?.season?.music?.title" type="music" />
          <Pill v-if="props?.season?.person" :text="props?.season?.person?.name" type="person" />
        </div>
        <p class="m-2 my-4">{{ threeDotString(props?.season?.description) }}</p>
      </div>
    </router-link>
    <div class="grid grid-cols-2 divide-x-2 divide-gray cursor-pointer">
      <div class="flex justify-center items-center p-2 bg-gray-light rounded-bl-[6px]" @click="deleteSeason()">
        <TrashIcon class="size-6" />
      </div>
      <router-link class="flex justify-center items-center p-2 bg-gray-light rounded-br-[6px]"
        :to="{ path: `/season/${props?.season?.seasonId}` }">
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
import { dateToNiceDate } from '@/helpers/helpers.js'
import { useSeasonStore } from '@/stores/season'

const seasonStore = useSeasonStore()

const props = defineProps({
  season: {
    type: Object,
    required: true
  }
})

function deleteSeason() {
  if (confirm('Are you sure you want to delete this season?'))
    seasonStore.deleteSeason(props.season.seasonId)
}
</script>
