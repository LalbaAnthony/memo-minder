<template>
  <div class="flex flex-row justify-between border-2 border-gray rounded-[8px] bg-dark-light h-full overflow-hidden">
    <div
      class="flex-1 flex justify-left rounded-l-[6px] p-5 cursor-pointer transition-colors duration-200"
      @click="openStreamingLink()">
      <div class="flex items-center justify-center gap-4 p-2 pr-6">
        <AppleIcon v-if="streamingPlatform?.slug === 'apple'" />
        <DeezerIcon v-else-if="streamingPlatform?.slug === 'deezer'" />
        <SpotifyIcon v-else-if="streamingPlatform?.slug === 'spotify'" />
        <YoutubeIcon v-else-if="streamingPlatform?.slug === 'youtube'" />
        <DefaultIcon v-else />
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
import { computed } from 'vue'
import { useMusicStore } from '@/stores/music'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { threeDotsString } from '@/composables/helpers'
import { streamingPlatforms } from '@/composables/streamingPlatforms.js'
import AppleIcon from '@/icons/AppleIcon.vue'
import DeezerIcon from '@/icons/DeezerIcon.vue'
import DefaultIcon from '@/icons/DefaultIcon.vue'
import SpotifyIcon from '@/icons/SpotifyIcon.vue'
import YoutubeIcon from '@/icons/YoutubeIcon.vue'

const router = useRouter()
const musicStore = useMusicStore()

const props = defineProps({
  music: {
    type: Object,
    required: true,
  },
})

const streamingPlatform = computed(() => {
  let found = null

  Object.keys(streamingPlatforms).forEach((key) => {
    const regex = streamingPlatforms[key].regex
    if (props?.music?.streamingLink?.match(regex)) {
      found = key
    }
  })

  return streamingPlatforms?.[found] || {}
})

function openStreamingLink() {
  let url = ''
  if (!url && props.music?.streamingLink) url = props.music.streamingLink
  // TODO: Use the link.search of the streamingPlatform if it exists
  
  window.open(url, '_blank')
}

function deleteMusic() {
  if (confirm('Are you sure you want to delete this music?')) musicStore.deleteItem(props.music.musicId, true)
}

function goToMusic() {
  router.push(`/music/${props.music.musicId}`)
}

</script>