<template>
  <div class="flex flex-row justify-between border-2 border-gray rounded-[8px] bg-dark-light h-full overflow-hidden">
    <div class="flex-1 flex justify-left rounded-l-[6px] p-5 cursor-pointer transition-colors duration-200"
      @click="goToMusic()">
      <div class="flex items-center justify-center gap-4 pr-4">
          <MusicalNoteIcon class="size-10" />
      </div>
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-2xl font-bold">{{ threeDotsString(props?.music?.title) }}</h1>
        <p class="text-gray-light">
          {{ props?.music?.artist }}
          {{ props?.music?.artist && props?.music?.releaseDate ? '-' : '' }}
          {{ getYearFromDate(props?.music?.releaseDate) }}
        </p>
      </div>
      <div>
        &nbsp;
      </div>
    </div>
    <div class="grid grid-rows-2 divide-y-2 divide-gray cursor-pointer">
      <div class="flex justify-center items-center p-3 bg-gray-dark rounded-tr-[6px]" @click="deleteMusic()">
        <TrashIcon class="size-6" />
      </div>
      <div class="flex justify-center items-center p-3 bg-gray-dark rounded-br-[6px]" @click="goToMusic()">
        <PencilSquareIcon class="size-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getYearFromDate } from '@/composables/helpers.js'
import { useMusicStore } from '@/stores/music'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { threeDotsString } from '@/composables/helpers'

const router = useRouter()
const musicStore = useMusicStore()

const props = defineProps({
  music: {
    type: Object,
    required: true,
  },
})

function deleteMusic() {
  if (confirm('Are you sure you want to delete this music?')) musicStore.deleteItem(props.music.musicId, true)
}

function goToMusic() {
  router.push(`/music/${props.music.musicId}`)
}

</script>