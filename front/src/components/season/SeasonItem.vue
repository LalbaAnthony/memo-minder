<template>
  <div class="flex flex-col cursor-pointer border-2 border-gray rounded-[8px] bg-dark-light h-full overflow-hidden">
    <div class="h-6 w-full rounded-t-[6px]" :style="`background-color: ${props?.season?.color};`"></div>
    <div class="flex-1 p-5" @click="goToSeason()">
      <div class="flex flex-col justify-center items-center w-full my-2">
        <h1 class="text-2xl font-bold">{{ props?.season?.title }}</h1>
        <p class="text-sm text-gray-light">{{ dateToNiceDate(props?.season?.dateStart) }} {{ props?.season?.dateStart &&
          props?.season?.dateEnd ? 'to' : ''}} {{ dateToNiceDate(props?.season?.dateEnd) }}</p>
      </div>
      <div class="my-4">
        <div class="flex justify-start flex-wrap items-center w-full m-2 gap-2">
          <Pill v-if="props?.season?.mood" :text="props?.season?.mood?.name" type="mood" />
          <Pill v-if="props?.season?.season" :text="props?.season?.season?.title" type="season" />
          <Pill v-if="props?.season?.music" :text="props?.season?.music?.title" type="music" />
          <Pill v-if="props?.season?.person" :text="props?.season?.person?.name" type="person" />
        </div>
        <p class="m-2 my-4">{{ threeDotString(props?.season?.description) }}</p>
      </div>
    </div>
    <div class="grid grid-cols-2 divide-x-2 divide-gray cursor-pointer">
      <div class="flex justify-center items-center p-2 bg-gray-dark rounded-bl-[6px]" @click="deleteSeason()">
        <TrashIcon class="size-6" />
      </div>
      <div class="flex justify-center items-center p-2 bg-gray-dark rounded-br-[6px]" @click="goToSeason()">
        <PencilSquareIcon class="size-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Pill from '@/components/PillComponent.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { threeDotString } from '@/composables/helpers'
import { dateToNiceDate } from '@/composables/helpers.js'
import { useSeasonStore } from '@/stores/season'
import { useRouter } from 'vue-router'

const router = useRouter()

const seasonStore = useSeasonStore()

const props = defineProps({
  season: {
    type: Object,
    required: true
  }
})

function deleteSeason() {
  if (confirm('Are you sure you want to delete this season?')) seasonStore.deleteSeason(props.season.seasonId, true)
}

function goToSeason() {
  router.push(`/season/${props.season.seasonId}`)
}
</script>
