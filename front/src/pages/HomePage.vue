<template>
  <div>
    <section v-if="authStore?.user?.homePageEnableSpents">
      <div class="my-4">
        <Spents :birthdate="authStore.user.birthdate" />
      </div>
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
            <span class="text-lg">"</span>{{ quoteStore.quote.data.quote }}<span class="text-lg">"</span>
          </p>
          <p class="text-right text-gray-light">{{ quoteStore.quote.data.author }}</p>
        </div>
      </section>
    </div>

    <section v-if="authStore?.user?.homePageEnableLasts && seasonStore?.seasons?.data?.length > 0">
      <h2 class="text-xl font-bold">Lasts seasons added</h2>
      <div class="my-4">
        <Loader v-if="seasonStore.seasons.loading" />
        <Grid v-else :items="seasonStore.seasons.data">
          <template #item="{ item }">
            <Season :season="item" />
          </template>
        </Grid>
      </div>
    </section>
  </div>
</template>

<script setup>
import Grid from '@/components/GridComponent.vue'
import Season from '@/components/season/SeasonItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import Stats from '@/components/homepage/StatsComponent.vue'
import Spents from '@/components/homepage/SpentsComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { useSeasonStore } from '@/stores/season'
import { useQuoteStore } from '@/stores/quote'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const quoteStore = useQuoteStore()
const seasonStore = useSeasonStore()

async function loadSeasons() {
  seasonStore.fetchSeasons({
    sort: [{ order: 'ASC', orderBy: 'createdAt' }],
    perPage: 3
  })
}

// Fetch data on mount
onMounted(() => {
  if (authStore?.user?.homePageEnableLasts) loadSeasons()
  if (authStore?.user?.homePageEnableQuote) quoteStore.fetchQuoteIfTooOld()
})


</script>
