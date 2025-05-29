<template>
  <div>
    <section v-if="authStore?.user?.homePageEnableSpents">
      <div class="my-4">
        <Spents :birthdate="authStore.user.birthdate" />
      </div>
    </section>

    <div class="md:grid md:grid-cols-2 md:gap-6">
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

    <div class="md:grid md:grid-cols-2 md:gap-24">
      <!-- TODO: Disabled because of cache issues on production -->
      <UpcomingBirthdaysComponent v-if="false && authStore?.user?.homePageEnableUpcomings" />
    </div>
    
    <div class="md:grid md:grid-cols-2 md:gap-24">
      <LastsEventsComponent v-if="authStore?.user?.homePageEnableLasts" />
      <LastsSeasonsComponent v-if="authStore?.user?.homePageEnableLasts" />
    </div>

    <Footer />

    <BottomActions :addButton="true" />
  </div>
</template>

<script setup>
import Footer from '@/components/FooterComponent.vue'
import Stats from '@/components/homepage/StatsComponent.vue'
import Spents from '@/components/homepage/SpentsComponent.vue'
import LastsEventsComponent from '@/components/homepage/LastsEventsComponent.vue'
import UpcomingBirthdaysComponent from '@/components/homepage/UpcomingBirthdaysComponent.vue'
import LastsSeasonsComponent from '@/components/homepage/LastsSeasonsComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { useQuoteStore } from '@/stores/quote'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const quoteStore = useQuoteStore()

onMounted(() => {
  if (authStore?.user?.homePageEnableQuote) quoteStore.fetchQuoteIfTooOld()
})

</script>