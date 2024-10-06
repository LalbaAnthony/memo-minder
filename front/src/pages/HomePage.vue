<template>
  <div>
    <section v-if="authStore?.user?.homePageEnableSpents">
      <Spents :birthdate="authStore.user.birthdate" />
    </section>

    <div class="md:grid md:grid-cols-2 md:gap-4">
      <section v-if="authStore?.user?.homePageEnableStats && authStore?.user?.birthdate">
        <h2 class="text-xl font-bold">Stats</h2>
        <div class="my-4">
          <Stats :birthdate="authStore.user.birthdate" />
        </div>
      </section>

      <section v-if="authStore?.user?.homePageEnableQuote && quoteStore?.quote?.data?.quote">
        <h2 class="text-xl font-bold">Quote</h2>
        <div class="my-4">
          <p class="my-2">
            <span class="text-md">"</span> {{ quoteStore.quote.data.quote }} <span class="text-md">"</span>
          </p>
          <p class="text-right text-gray-light">{{ quoteStore.quote.data.author }}</p>
        </div>
      </section>
    </div>

    <section v-if="authStore?.user?.homePageEnableLasts">
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
import Grid from '@/components/GridComponent.vue'
import Event from '@/components/event/EventItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import Stats from '@/components/homepage/StatsComponent.vue'
import Spents from '@/components/homepage/SpentsComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import { useQuoteStore } from '@/stores/quote'

const authStore = useAuthStore()
const quoteStore = useQuoteStore()
const eventStore = useEventStore()

async function loadEvents() {
  eventStore.fetchEvents({
    sort: [{ order: 'ASC', orderBy: 'createdAt' }],
    perPage: 3
  })
}

// Fetch data on mount
if (authStore?.user?.homePageEnableLasts && (!eventStore.events.data || eventStore.events.data.length === 0)) loadEvents()
if (authStore?.user?.homePageEnableQuote) quoteStore.fetchQuoteIfTooOld()

</script>
