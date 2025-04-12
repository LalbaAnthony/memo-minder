<template>
  <div>
    <TopActions :goBackButton="true" />

    <Loader v-if="musicStore.item?.loading" />
    <div v-else>
      <!-- Title and date section -->
      <section>
        <div v-if="musicStore.item?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ dateToNiceDate(musicStore.item?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="musicStore.item.data.title" type="text"
            class="rounded-lg bg-dark placeholder-gray text-light text-2xl w-full" placeholder="Music title" />
        </div>
      </section>

      <!-- Stream link section -->
      <section>
        <div class="flex items-center justify-center gap-2 bg-dark-light p-4 rounded-lg">
          <LinkIcon
            :class="['size-6 text-gray', musicStore.item?.data?.streamingLink ? 'hover:text-gray-light cursor-pointer' : '']"
            @click="onpenStreamingLink()" />
          <input v-model="musicStore.item.data.streamingLink" id="streamingLink"
            class="w-full sm:w-2/3 md:w-1/2 p-2 rounded-lg bg-gray-dark text-light"
            placeholder="https://open.spotify.com/track/..." />
          <ClipboardIcon
            :class="['size-6 text-gray', musicStore.item?.data?.streamingLink ? 'hover:text-gray-light cursor-pointer' : '']"
            @click="copyToClipboard(musicStore.item?.data?.streamingLink)" />
        </div>
      </section>

      <!-- Date & Artist section -->
      <section>
        <div class="flex flex-col gap-4 sm:gap-1 bg-dark-light p-4 rounded-lg">
          <div class="flex flex-col sm:flex-row items-center justify-start gap-x-4 gap-y-2">
            <span class="text-lg font-medium text-gray-light">on</span>
            <DatePicker class="max-w-[15rem]" :value="musicStore.item?.data?.releaseDate"
              @update="(v) => { musicStore.item.data.releaseDate = v }" />
            <span class="text-lg font-medium text-gray-light">by</span>
            <input v-model="musicStore.item.data.artist" id="artist"
              class="max-w-[15rem] p-2 rounded-lg bg-gray-dark text-light" placeholder="Artist" />
          </div>
        </div>
      </section>

      <!-- Pills section -->
      <section>
        <h4 class="text-lg font-semibold text-light mb-4">Linked items</h4>
        <LinkedItemsWrapper :item="musicStore.item.data" :parentType="'music'"
          :childrenTypes="['season', 'event', 'person']" />
      </section>
    </div>

    <BottomActions :createButton="!route.params.musicId" :updateButton="!!route.params.musicId"
      :deleteButton="!!route.params.musicId" @triggerCreate="manualCreation" @triggerUpdate="manualUpdate"
      @triggerDelete="manualDeletion" />
  </div>
</template>

<script setup>
import Loader from '@/components/LoaderComponent.vue'
import DatePicker from '@/components/fields/DatePickerComponent.vue'
import TopActions from '@/components/actions/TopActionsComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import LinkedItemsWrapper from '@/components/fields/LinkedItemsWrapperComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMusicStore } from '@/stores/music'
import { notif } from '@/composables/notif.js'
import { dateToNiceDate } from '@/composables/helpers.js'
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import { LinkIcon } from '@heroicons/vue/24/solid'
import { ClipboardIcon } from '@heroicons/vue/24/solid'
import debounce from '@/composables/debounce.js'

const route = useRoute()
const router = useRouter()
const musicStore = useMusicStore()

const watched = ref(0)

function loadOrInitMusic() {
  if (route.params.musicId) {
    musicStore.fetchItem(route.params.musicId)
  } else {
    musicStore.initItem()
    if (route.query.title) musicStore.item.data.title = route.query.title // From the search page
  }
  watched.value = 0
}

function onpenStreamingLink() {
  if (musicStore.item.data.streamingLink) window.open(musicStore.item.data.streamingLink, '_blank')
}

function copyToClipboard(text) {
  if (text) {
    navigator.clipboard.writeText(text)
    notif.notify('Link copied to clipboard', 'success')
  }
}

function valid() {
  if (!musicStore.item.data.userId) return 'User is required, please reload the page'
  if (!musicStore.item.data.title) return 'Title is required'
  return false
}

function manualDeletion() {
  musicStore.deleteItem(musicStore.item.data.musicId, true)
  router.push('/musics')
}

function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    musicStore.createItem(musicStore.item.data, true)
    router.push('/musics')
  }
}

async function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await musicStore.updateItem(musicStore.item.data, true)
  if (success) router.push('/musics')
}

const debouncedUpdate = debounce(() => {
  if (route.params.musicId) {
    const error = valid()
    if (!error) {
      musicStore.updateItem(musicStore.item.data)
    }
  }
}, 10000)

onMounted(() => {
  loadOrInitMusic()
})

onBeforeUnmount(() => {
  if (route.params.musicId) musicStore.updateItem(musicStore.item.data)
});

watch(() => route.params.musicId, () => {
  loadOrInitMusic()
})

watch(() => musicStore.item.data,
  () => {
    watched.value += 1
    if (watched.value <= 2) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);
</script>