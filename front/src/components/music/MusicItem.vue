<template>
  <div class="flex flex-row justify-between border-2 border-gray rounded-[8px] bg-dark-light h-full">
    <!-- Card -->
    <div
      :class="['flex-1 flex justify-between rounded-l-[6px] p-5 cursor-pointer transition-colors duration-200', `${platform}-item`]"
      @click="openLink()">
      <!-- Logo -->
      <div :class="`flex items-center justify-center gap-4 p-2 pr-4 ${platform}-logo`">
        <svg v-if="platform === 'spotify'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
          viewBox="0 0 16 16">
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
        </svg>
        <svg v-else-if="platform === 'apple'" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
          fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
          <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
          <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
        </svg>
        <svg v-else-if="platform === 'youtube'" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
          fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
        </svg>
      </div>
      <!-- Infos -->
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-2xl font-bold">{{ props?.music?.title }}</h1>
        <p class="text-gray-light">{{ props?.music?.artist }} - {{ getYearFromDate(props?.music?.releaseDate) }}</p>
      </div>
      <!-- None -->
      <div>
      </div>
    </div>
    <!-- Button -->
    <div class="flex justify-center items-center p-4 bg-gray-light cursor-pointer rounded-r-[6px]"
      @click="deleteMusic()">
      <TrashIcon class="size-6" />
    </div>
  </div>
</template>

<script setup>
import { getYearFromDate } from '@/helpers/helpers.js'
import { computed } from 'vue'
import { useMusicStore } from '@/stores/music'
import { TrashIcon } from '@heroicons/vue/24/solid'

const musicStore = useMusicStore()

const props = defineProps({
  music: {
    type: Object,
    required: true,
  },
})

const platform = computed(() => {
  if (props.music.streamingLink.includes('spotify')) return 'spotify'
  if (props.music.streamingLink.includes('apple')) return 'apple'
  if (props.music.streamingLink.includes('youtube')) return 'youtube'
  return ''
})

function openLink() {
  if (props.music.streamingLink) window.open(props.music.streamingLink, '_blank')
}

function deleteMusic() {
  if (confirm('Are you sure you want to delete this music?')) musicStore.deleteMusic(props.music.musicId)
}

</script>

<style scoped>
div.spotify-item:hover {
  background-color: #080808;
}

div.spotify-item:hover .spotify-logo {
  color: #1DD05D;
}

div.apple-item:hover {
  background-color: #FB3D55;
}

div.apple-item:hover .apple-logo {
  color: #FFFFFF;
}

div.youtube-item:hover {
  background-color: #FF0808;
}

div.youtube-item:hover .youtube-logo {
  color: #FFFFFF;
}
</style>
