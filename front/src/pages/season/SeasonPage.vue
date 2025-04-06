<template>
  <div>
    <TopActions :goBackButton="true" />

    <Loader v-if="seasonStore.season?.loading" />
    <div v-else>
      <!-- Title and date section -->
      <section>
        <div v-if="seasonStore.season?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ dateToNiceDate(seasonStore.season?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="seasonStore.season.data.title" type="text"
            class="rounded-lg bg-dark placeholder-gray text-light text-2xl w-full" placeholder="Season title" />
        </div>
      </section>

      <!-- Dates section -->
      <section>
        <div class="flex flex-col gap-4 sm:gap-1 bg-dark-light p-4 rounded-lg">
          <div class="flex flex-col sm:flex-row items-center justify-start gap-x-4 gap-y-2">
            <DatePicker class="max-w-[15rem]" :value="seasonStore.season?.data?.dateStart"
              @update="(v) => { seasonStore.season.data.dateStart = v }" />
            <span class="text-lg font-medium text-gray-light">to</span>
            <DatePicker class="max-w-[15rem]" :value="seasonStore.season?.data?.dateEnd"
              @update="(v) => { seasonStore.season.data.dateEnd = v }" />
          </div>
          <div v-if="!route?.params?.seasonId" class="flex items-center justify-start gap-x-4 gap-y-1 mt-2">
            <div v-for="suggestedSeason in suggestedSeasons" :key="suggestedSeason.title" class="cursor-pointer" @click="() => {
              seasonStore.season.data.title = suggestedSeason.title
              seasonStore.season.data.dateStart = suggestedSeason.dateStart
              seasonStore.season.data.dateEnd = suggestedSeason.dateEnd
            }">
              <span class="text-gray hover:text-gray-light transition-all transition-200">{{ suggestedSeason.title
              }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Color & Mood section -->
      <section>
        <div class="flex flex-row justify-around gap-4 bg-dark-light p-4 rounded-lg">
          <ColorPicker :value="seasonStore.season?.data?.color"
            @update="(v) => { seasonStore.season.data.color = v }" />
          <MoodPicker class="max-w-[9rem]" :value="seasonStore.season.data.moodId"
            @update="(v) => { seasonStore.season.data.moodId = v }" />
        </div>
      </section>

      <!-- Description -->
      <section>
        <textarea v-model="seasonStore.season.data.description"
          class="w-full p-2 rounded-lg bg-gray-dark placeholder-gray-light text-light" rows="10"
          placeholder="..."></textarea>
      </section>

      <!-- Pills section -->
      <section>
        <h4 class="text-lg font-semibold text-light mb-4">Linked items</h4>
        <LinkedItems :item="seasonStore.season?.data" :types="['event', 'music', 'person']"
          @show-item-picker="showItemPicker = true" @delete="(id, type) => { deleteItem(id, type) }" />
      </section>
    </div>

    <ItemPicker :types="['event', 'music', 'person']" :show="showItemPicker" @close="showItemPicker = false"
      @add="(object) => { addItem(object) }" />

    <BottomActions :createButton="!route.params.seasonId" :updateButton="!!route.params.seasonId"
      :deleteButton="!!route.params.seasonId" @triggerCreate="manualCreation" @triggerUpdate="manualUpdate"
      @triggerDelete="manualDeletion" />
  </div>
</template>

<script setup>
import DatePicker from '@/components/DatePickerComponent.vue'
import ColorPicker from '@/components/ColorPickerComponent.vue'
import ItemPicker from '@/components/ItemPickerComponent.vue'
import LinkedItems from '@/components/LinkedItemsComponent.vue'
import Loader from '@/components/LoaderComponent.vue'
import MoodPicker from '@/components/MoodPickerComponent.vue'
import TopActions from '@/components/TopActionsComponent.vue'
import BottomActions from '@/components/BottomActionsComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { useSeasonStore } from '@/stores/season'
import { notif } from '@/composables/notif.js'
import { dateToNiceDate } from '@/composables/helpers.js'
import { computed, ref, watch, onBeforeUnmount, onMounted } from 'vue'
import debounce from '@/composables/debounce.js'

const route = useRoute()
const router = useRouter()
const seasonStore = useSeasonStore()

const showItemPicker = ref(false)
const watched = ref(0)

function getSeasons(year = new Date().getFullYear()) {
  return [
    {
      title: `Winter ${year}`,
      dateStart: `${year - 1}-12-21`,
      dateEnd: `${year}-03-20`
    },
    {
      title: `Spring ${year}`,
      dateStart: `${year}-03-21`,
      dateEnd: `${year}-06-20`
    },
    {
      title: `Summer ${year}`,
      dateStart: `${year}-06-21`,
      dateEnd: `${year}-09-20`
    },
    {
      title: `Fall ${year}`,
      dateStart: `${year}-09-21`,
      dateEnd: `${year}-12-20`
    }
  ];
}

function getSurroundingSeasons(currentDate = new Date(), range = 1) {
  const year = currentDate.getFullYear();
  const seasons = [...getSeasons(year - 1), ...getSeasons(year), ...getSeasons(year + 1)];

  const currentSeason = seasons.find(season => {
    const start = new Date(season.dateStart);
    const end = new Date(season.dateEnd);
    return currentDate >= start && currentDate <= end;
  });

  const currentIndex = seasons.indexOf(currentSeason);
  return seasons.slice(currentIndex - range, currentIndex + range + 1);
}

function loadOrInitSeason() {
  if (route.params.seasonId) {
    seasonStore.fetchSeason(route.params.seasonId)
  } else {
    seasonStore.initSeason()
    if (route.query.title) seasonStore.season.data.title = route.query.title // From the search page
  }
  watched.value = 0
}

function addItem(object) {
  if (object.type === 'season') {
    seasonStore.season.data.seasons.push(object.data)
  } else if (object.type === 'music') {
    seasonStore.season.data.musics.push(object.data)
  } else if (object.type === 'person') {
    seasonStore.season.data.people.push(object.data)
  } else if (object.type === 'event') {
    seasonStore.season.data.events.push(object.data)
  }
}

function deleteItem(id, type) {
  if (type === 'season') {
    seasonStore.season.data.seasons = seasonStore.season.data.seasons.filter(season => season.seasonId !== id)
  } else if (type === 'music') {
    seasonStore.season.data.musics = seasonStore.season.data.musics.filter(music => music.musicId !== id)
  } else if (type === 'person') {
    seasonStore.season.data.people = seasonStore.season.data.people.filter(person => person.personId !== id)
  } else if (type === 'event') {
    seasonStore.season.data.events = seasonStore.season.data.events.filter(event => event.eventId !== id)
  }
}

function valid() {
  if (!seasonStore.season.data.userId) return 'User is required, please reload the page'
  if (!seasonStore.season.data.title) return 'Title is required'
  if (!seasonStore.season.data.color) return 'Color is required'
  if (!seasonStore.season.data.dateStart) return 'Start date is required'
  return false
}

function manualDeletion() {
  seasonStore.deleteSeason(seasonStore.season.data.seasonId, true)
  router.push('/events')
}

function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    seasonStore.createSeason(seasonStore.season.data, true)
    router.push('/seasons')
  }
}

function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    seasonStore.updateSeason(seasonStore.season.data, true)
    router.push('/seasons')
  }
}

const suggestedSeasons = computed(() => {
  return getSurroundingSeasons(new Date())
})

const debouncedUpdate = debounce(() => {
  if (route.params.seasonId) {
    const error = valid()
    if (!error) {
      seasonStore.updateSeason(seasonStore.season.data)
    }
  }
}, 10000)

onMounted(() => {
  loadOrInitSeason()
})

onBeforeUnmount(() => {
  if (route.params.seasonId) seasonStore.updateSeason(seasonStore.season.data)
});

watch(() => route.params.seasonId, () => {
  loadOrInitSeason()
})

watch(() => seasonStore.season.data,
  () => {
    watched.value += 1
    if (watched.value <= 2) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);
</script>