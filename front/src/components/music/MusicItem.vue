<template>
  <div class="flex flex-row justify-between border-2 border-gray rounded-[8px] bg-dark-light h-full overflow-hidden">
    <div
      :class="['flex-1 flex justify-left rounded-l-[6px] p-5 cursor-pointer transition-colors duration-200', props?.music?.streamingLink ? `${platform}-item` : '']"
      @click="openLink()">
      <div
        :class="['flex items-center justify-center gap-4 p-2 pr-6', props?.music?.streamingLink ? `${platform}-logo` : '']">
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
        <svg v-else-if="platform === 'deezer'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none"
          viewBox="0 0 277.694 279">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M232.97 42.8737C235.539 27.9837 239.309 18.6204 243.485 18.6026H243.493C251.28 18.6294 257.592 51.1012 257.592 91.1924C257.592 131.284 251.271 163.782 243.476 163.782C240.28 163.782 237.331 158.264 234.957 149.017C231.205 182.867 223.419 206.136 214.405 206.136C207.431 206.136 201.172 192.158 196.97 170.114C194.101 212.038 186.88 241.783 178.44 241.783C173.143 241.783 168.314 229.996 164.739 210.804C160.44 250.421 150.508 278.18 138.926 278.18C127.344 278.18 117.394 250.43 113.113 210.804C109.564 229.996 104.735 241.783 99.4118 241.783C90.9722 241.783 83.7686 212.038 80.8818 170.114C76.6797 192.158 70.4383 206.136 63.4465 206.136C54.442 206.136 46.6469 182.875 42.895 149.017C40.5379 158.291 37.5717 163.782 34.376 163.782C26.5809 163.782 20.26 131.284 20.26 91.1924C20.26 51.1012 26.5809 18.6026 34.376 18.6026C38.5604 18.6026 42.3035 27.9926 44.8989 42.8737C49.0569 17.1985 55.8103 0.510986 63.4465 0.510986C72.5129 0.510986 80.3698 24.1114 84.0864 58.3808C87.7235 33.4389 93.241 17.5383 99.4206 17.5383C108.081 17.5383 115.443 48.8118 118.171 92.4355C123.3 70.0692 130.725 56.0377 138.944 56.0377C147.162 56.0377 154.587 70.0781 159.707 92.4355C162.444 48.8118 169.797 17.5383 178.458 17.5383C184.628 17.5383 190.137 33.4389 193.792 58.3808C197.5 24.1114 205.357 0.510986 214.423 0.510986C222.033 0.510986 228.812 17.2075 232.97 42.8737ZM0.0891113 84.0528C0.0891113 66.1311 3.67328 51.5989 8.0961 51.5989C12.5189 51.5989 16.1031 66.1311 16.1031 84.0528C16.1031 101.974 12.5189 116.507 8.0961 116.507C3.67328 116.507 0.0891113 101.974 0.0891113 84.0528ZM261.743 84.0528C261.743 66.1311 265.327 51.5989 269.75 51.5989C274.172 51.5989 277.757 66.1311 277.757 84.0528C277.757 101.974 274.172 116.507 269.75 116.507C265.327 116.507 261.743 101.974 261.743 84.0528Z"
            fill="currentColor"></path>
        </svg>
        <svg v-else-if="platform === 'default'" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
          fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
          <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
          <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
        </svg>
      </div>
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-2xl font-bold">{{ props?.music?.title }}</h1>
        <p :class="['text-gray-light', props?.music?.streamingLink ? `${platform}-artist` : '']">{{ props?.music?.artist }} {{ props?.music?.artist &&
          props?.music?.releaseDate ? '-'
          : '' }} {{ getYearFromDate(props?.music?.releaseDate) }}</p>
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

const router = useRouter()

const musicStore = useMusicStore()

const props = defineProps({
  music: {
    type: Object,
    required: true,
  },
})

const platform = computed(() => {
  if (props?.music?.streamingLink?.includes('spotify')) return 'spotify'
  if (props?.music?.streamingLink?.includes('apple')) return 'apple'
  if (props?.music?.streamingLink?.includes('youtu')) return 'youtube'
  if (props?.music?.streamingLink?.includes('deezer')) return 'deezer'
  return 'default'
})

function openLink() {
  if (props.music.streamingLink) window.open(props.music.streamingLink, '_blank')
}

function deleteMusic() {
  if (confirm('Are you sure you want to delete this music?')) musicStore.deleteItem(props.music.musicId, true)
}

function goToMusic() {
  router.push(`/music/${props.music.musicId}`)
}

</script>

<style scoped>
/* ================ SPOTIFY ================ */

div.spotify-item:hover {
  background-color: #080808;
}

div.spotify-item:hover .spotify-artist {
  color: #FFFFFF;
}

div.spotify-item:hover .spotify-logo {
  color: #1DD05D;
}

/* ================ APPLE ================ */

div.apple-item:hover {
  background-color: #FB3D55;
}

div.apple-item:hover .apple-artist {
  color: #FFFFFF;
}

div.apple-item:hover .apple-logo {
  color: #FFFFFF;
}

/* ================ YOUTUBE ================ */

div.youtube-item:hover {
  background-color: #FF0808;
}

div.youtube-item:hover .youtube-artist {
  color: #FFFFFF;
}

div.youtube-item:hover .youtube-logo {
  color: #FFFFFF;
}

/* ================ DEEZER ================ */

div.deezer-item:hover {
  background-color: #080808;
}

div.deezer-item:hover .deezer-artist {
  color: #FFFFFF;
}

div.deezer-item:hover .deezer-logo {
  color: #A238FF;
}

div.default-item:hover {
  background-color: var(--gray-dark);
}

/* ================ DEFAULT ================ */

div.default-item:hover .default-artist {
  color: var(--light);
}

div.default-item:hover .default-logo {
  color: var(--primary);
}
</style>
