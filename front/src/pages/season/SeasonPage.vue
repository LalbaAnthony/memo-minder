<template>
  <div>
    <TopActions :goBackButton="true" />

    <Loader v-if="seasonStore.item.loading" />
    <div v-else>
      <!-- Title and date section -->
      <section>
        <div v-if="seasonStore.item?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ dateToNiceDate(seasonStore.item?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="seasonStore.item.data.title" type="text"
            class="rounded-lg bg-dark placeholder-gray text-light text-2xl w-full" placeholder="Season title" />
        </div>
      </section>

      <!-- Dates section -->
      <section>
        <div class="flex flex-col gap-4 sm:gap-1 bg-dark-light p-4 rounded-lg">
          <div class="flex flex-col sm:flex-row items-center justify-start gap-x-4 gap-y-2">
            <DatePicker class="max-w-[15rem]" :value="seasonStore.item?.data?.dateStart"
              @update="(v) => { seasonStore.item.data.dateStart = v }" />
            <span class="text-lg font-medium text-gray-light">to</span>
            <DatePicker class="max-w-[15rem]" :value="seasonStore.item?.data?.dateEnd"
              @update="(v) => { seasonStore.item.data.dateEnd = v }" />
          </div>
          <div v-if="!route?.params?.seasonId" class="flex items-center justify-start gap-x-4 gap-y-1 mt-2">
            <div v-for="suggestedSeason in suggestedSeasons" :key="suggestedSeason.title" class="cursor-pointer" @click="() => {
              seasonStore.item.data.title = suggestedSeason.title
              seasonStore.item.data.dateStart = suggestedSeason.dateStart
              seasonStore.item.data.dateEnd = suggestedSeason.dateEnd
            }">
              <span class="text-gray hover:text-gray-light transition-all transition-200">{{ suggestedSeason.title
              }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Color & Mood section -->
      <section>
        <div
          class="flex flex-col sm:flex-row justify-center sm:justify-around md:justify-center gap-4 bg-dark-light p-4 rounded-lg">
          <ColorPicker :value="seasonStore.item?.data?.color" @update="(v) => { seasonStore.item.data.color = v }" />
          <div class="flex items-center justify-center gap-4">
            <span class="text-lg font-medium text-gray-light">with</span>
            <MoodPicker :value="seasonStore?.item?.data?.moodId"
              @update="(v) => { seasonStore.item.data.moodId = v }" />
          </div>
        </div>
      </section>

      <!-- Description -->
      <section>
        <textarea v-model="seasonStore.item.data.description"
          class="w-full p-2 rounded-lg bg-gray-dark placeholder-gray-light text-light" rows="10"
          placeholder="..."></textarea>
      </section>

      <!-- Pills section -->
      <section>
        <h4 class="text-lg font-semibold text-light mb-4">Linked items</h4>
        <LinkedItemsWrapper :item="seasonStore.item.data" :parentType="'season'"
          :childrenTypes="['event', 'music', 'person']" />
      </section>
    </div>

    <BottomActions :createButton="!route.params.seasonId" :updateButton="!!route.params.seasonId"
      :deleteButton="!!route.params.seasonId" @triggerCreate="manualCreation" @triggerUpdate="manualUpdate"
      @triggerDelete="manualDeletion" />
  </div>
</template>

<script setup>
import DatePicker from '@/components/fields/DatePickerComponent.vue'
import ColorPicker from '@/components/fields/ColorPickerComponent.vue'
import LinkedItemsWrapper from '@/components/fields/LinkedItemsWrapperComponent.vue'
import Loader from '@/components/LoaderComponent.vue'
import MoodPicker from '@/components/fields/MoodPickerComponent.vue'
import TopActions from '@/components/actions/TopActionsComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { useSeasonStore } from '@/stores/season'
import { notif } from '@/composables/notif.js'
import { dateToNiceDate } from '@/composables/helpers.js'
import { computed, ref, watch, onBeforeUnmount, onMounted } from 'vue'
import debounce from '@/composables/debounce.js'

const route = useRoute()
const router = useRouter()
const seasonStore = useSeasonStore()

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
    seasonStore.fetchItem(route.params.seasonId)
  } else {
    seasonStore.initItem()
    if (route.query.title) seasonStore.item.data.title = route.query.title // From the search page
  }
  watched.value = 0
  seasonStore.item.loading = false
}

function valid() {
  if (!seasonStore.item.data.userId) return 'User is required, please reload the page'
  if (!seasonStore.item.data.title) return 'Title is required'
  if (!seasonStore.item.data.color) return 'Color is required'
  if (!seasonStore.item.data.dateStart) return 'Start date is required'
  return false
}

function manualDeletion() {
  seasonStore.deleteItem(seasonStore.item.data.seasonId, true)
  router.push('/events')
}

async function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await seasonStore.createItem(seasonStore.item.data, true)
  if (success) router.push('/seasons')
}

async function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await seasonStore.updateItem(seasonStore.item.data, true)
  if (success) router.push('/seasons')
}

const suggestedSeasons = computed(() => {
  return getSurroundingSeasons(new Date())
})

const debouncedUpdate = debounce(() => {
  if (route.params.seasonId) {
    const error = valid()
    if (!error) {
      seasonStore.updateItem(seasonStore.item.data)
    }
  }
}, 10000)

onMounted(() => {
  loadOrInitSeason()
})

onBeforeUnmount(() => {
  if (route.params.seasonId) seasonStore.updateItem(seasonStore.item.data)
});

watch(() => route.params.seasonId, () => {
  loadOrInitSeason()
})

watch(() => seasonStore.item.data,
  () => {
    watched.value += 1
    if (watched.value <= 2) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);
</script>