<template>
  <div>
    <Spents v-if="authStore?.user?.homePageEnableSpents" :birthdate="authStore.user.birthdate" />

    <div class="md:grid md:grid-cols-2 md:gap-6">
      <Stats v-if="authStore?.user?.homePageEnableStats && authStore?.user?.birthdate" :birthdate="authStore.user.birthdate" />
      <Quote v-if="authStore?.user?.homePageEnableQuote" />
    </div>

    <div class="md:grid md:grid-cols-2 md:gap-24">
      <!-- TODO: Disabled because of cache issues on production -->
      <UpcomingBirthdays v-if="false && authStore?.user?.homePageEnableUpcomings" />
    </div>

    <div class="md:grid md:grid-cols-2 md:gap-24">
      <LastsEvents v-if="authStore?.user?.homePageEnableLasts" />
      <LastsSeasons v-if="authStore?.user?.homePageEnableLasts" />
    </div>

    <Footer />

    <BottomActions :addButton="true" />
  </div>
</template>

<script setup>
import Footer from '@/components/FooterComponent.vue'
import Stats from '@/components/homepage/StatsComponent.vue'
import Spents from '@/components/homepage/SpentsComponent.vue'
import LastsEvents from '@/components/homepage/LastsEventsComponent.vue'
import UpcomingBirthdays from '@/components/homepage/UpcomingBirthdaysComponent.vue'
import LastsSeasons from '@/components/homepage/LastsSeasonsComponent.vue'
import Quote from '@/components/homepage/QuoteComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()


</script>