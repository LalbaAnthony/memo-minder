<template>
  <div>
    <section class="progress-bars-grid">
      <div>
        <h4 class="text-l font-bold">Spent childhood</h4>
        <ProgressBar :value="childhoodPercentage" />
      </div>
      <div>
        <h4 class="text-l font-bold">Spent adulthood</h4>
        <ProgressBar :value="adulthoodPercentage" />
      </div>
      <div>
        <h4 class="text-l font-bold">Spent oldhood</h4>
        <ProgressBar :value="oldhoodPercentage" />
      </div>
      <div>
        <h4 class="text-l font-bold">Total spent</h4>
        <ProgressBar :value="lifeTimePercentage" />
      </div>
    </section>

    <div class="md:grid md:grid-cols-2 md:gap-4">
      <section v-if="authStore?.user?.birthdate">
        <h2 class="text-xl font-bold">Stats</h2>
        <div class="my-4">
          <Stats :birthdate="authStore.user.birthdate" />
        </div>
      </section>

      <section v-if="quoteStore?.quote?.data?.quote">
        <h2 class="text-xl font-bold">Quote</h2>
        <div class="my-4">
          <p class="my-2">
            <span class="text-md">"</span> {{ quoteStore.quote.data.quote }} <span class="text-md">"</span>
          </p>
          <p class="text-right text-gray-light">{{ quoteStore.quote.data.author }}</p>
        </div>
      </section>
    </div>

    <section>
      <h2 class="text-xl font-bold">Lasts events added</h2>
      <div class="my-4">
        <Loader v-if="eventStore.events.loading" />
        <Grid v-else :items="eventStore.events.data">
          <template #item="{ item }">
            <Event :event="item" />
          </template>
        </Grid>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue"
import Grid from '@/components/GridComponent.vue'
import Event from '@/components/event/EventItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import ProgressBar from '@/components/ProgressBarComponent.vue'
import Stats from '@/components/StatsComponent.vue'
import { ageFromDate } from "@/helpers/helpers.js"
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import { useQuoteStore } from '@/stores/quote'
import { useRoute } from 'vue-router'

const route = useRoute()

const authStore = useAuthStore()
const quoteStore = useQuoteStore()
const eventStore = useEventStore()

const childhoodPercentage = computed(() => {
  const yearStart = 0
  const yearEnd = 18
  const percent = ((ageFromDate(authStore.user.birthdate) - yearStart) / yearEnd) * 100
  if (percent < 0) return 0
  if (percent > 100) return 100
  return percent
})

const adulthoodPercentage = computed(() => {
  const yearStart = 18
  const yearEnd = 64
  const percent = ((ageFromDate(authStore.user.birthdate) - yearStart) / yearEnd) * 100
  if (percent < 0) return 0
  if (percent > 100) return 100
  return percent
})

const oldhoodPercentage = computed(() => {
  const yearStart = 64
  const yearEnd = 80
  const percent = ((ageFromDate(authStore.user.birthdate) - yearStart) / yearEnd) * 100
  if (percent < 0) return 0
  if (percent > 100) return 100
  return percent
})

const lifeTimePercentage = computed(() => {
  const yearStart = 0
  const yearEnd = 80
  const percent = ((ageFromDate(authStore.user.birthdate) - yearStart) / yearEnd) * 100
  if (percent < 0) return 0
  if (percent > 100) return 100
  return percent
});

async function loadEvents() {
  eventStore.fetchEvents({
    sort: route.query.sort ? [{
      orderBy: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : [
      { order: 'ASC', orderBy: 'createdAt' },
    ]
  })
}

// Fetch data on mount
if (!eventStore.events.data || eventStore.events.data.length === 0) loadEvents()
quoteStore.fetchQuoteIfTooOld()

</script>

<style scoped>
.progress-bars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0 3rem;
}
</style>