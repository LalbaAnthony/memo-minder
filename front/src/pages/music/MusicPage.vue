<template>
  <div>
    <TopActions :goBackButton="true" />

    <Loader v-if="musicStore.item?.loading" />
    <div v-else>
      <!-- Title and date section -->
      <section>
        <div v-if="musicStore.item?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ translateDate(musicStore.item?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 w-full">
          <input v-model="musicStore.item.data.title" type="text"
            class="rounded-lg bg-dark placeholder-gray text-light text-2xl w-full" placeholder="Music title" />
          <button class="rounded-2xl bg-gray-dark p-3 hover:scale-105 transition-all duration-300">
            <PlayIcon class="size-6 cursor-pointer"
              @click="openLink(smartStreamingLink(musicStore.item?.data), true, false)" />
          </button>
        </div>
      </section>

      <!-- Stream link section -->
      <section>
        <div class="flex items-center justify-center gap-2 bg-dark-light p-4 rounded-lg">
          <!-- <ClipboardDocumentIcon
            :class="['size-6', musicStore.item?.data?.streamingLink ? 'text-gray hover:text-gray-light cursor-pointer' : 'text-gray-dark']"
            @click="copyToClipboard(musicStore.item?.data?.streamingLink)" />
          <input v-model="musicStore.item.data.streamingLink" id="streamingLink"
            class="w-full sm:w-2/3 md:w-1/2 p-2 rounded-lg bg-gray-dark text-light"
            :placeholder="userStreamingPlatform().links.placeholder" />
          <ArrowTopRightOnSquareIcon
            :class="['size-7', musicStore.item?.data?.streamingLink ? 'text-gray hover:text-gray-light cursor-pointer' : 'text-gray-dark']"
            @click="openLink(musicStore.item?.data?.streamingLink)" /> -->
            <div class="flex items-center justify-center gap-2 w-full max-w-[24rem] p-1.5 rounded-lg bg-gray-dark">
              <ClipboardDocumentIcon
                :class="['size-5', musicStore.item?.data?.streamingLink ? 'text-[#9ca3af] cursor-pointer' : 'text-gray']"
                @click="copyToClipboard(musicStore.item?.data?.streamingLink)" />
              <input v-model="musicStore.item.data.streamingLink" id="location"
                class="w-full rounded-lg bg-gray-dark text-light"
                :placeholder="userStreamingPlatform().links.placeholder" />
              <ArrowTopRightOnSquareIcon
                :class="['size-6', musicStore.item?.data?.streamingLink ? 'text-[#9ca3af] cursor-pointer' : 'text-gray']"
                @click="openLink(musicStore.item?.data?.streamingLink)" />
            </div>
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
              class="w-full max-w-[24rem] p-2 rounded-lg bg-gray-dark text-light" placeholder="Artist" />
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
import { notif } from '@/composables/notif'
import { translateDate } from '@/composables/beautify'
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'
import { ClipboardDocumentIcon } from '@heroicons/vue/24/solid'
import { PlayIcon } from '@heroicons/vue/24/solid'
import debounce from '@/composables/debounce'
import { userStreamingPlatform } from '@/composables/streamingPlatform'
import { copyToClipboard, openLink } from '@/composables/helpers'
import { smartStreamingLink } from '@/composables/streamingPlatform'

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
  musicStore.item.loading = false
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

async function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await musicStore.createItem(musicStore.item.data, true)
  if (success) router.push('/musics')
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