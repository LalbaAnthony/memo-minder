<template>
  <div>
    <div class="home">
      <Spents v-if="authStore?.user?.homePageEnableSpents" :birthdate="authStore.user.birthdate" class="a" />
      <Stats v-if="authStore?.user?.homePageEnableStats && authStore?.user?.birthdate"
        :birthdate="authStore.user.birthdate" class="b" />
      <Quote v-if="authStore?.user?.homePageEnableQuote" class="c" />
      <UpcomingBirthdays v-if="authStore?.user?.homePageEnableUpcomings" class="d" />
      <LastsEvents v-if="authStore?.user?.homePageEnableLasts" class="e" />
      <LastsSeasons v-if="authStore?.user?.homePageEnableLasts" class="f" />
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

<style scoped>
.home {
  display: grid;
  grid-template-rows: auto;
}

.a {
  grid-area: a;
}

.b {
  grid-area: b;
}

.c {
  grid-area: c;
}

.d {
  grid-area: d;
}

.e {
  grid-area: e;
}

.f {
  grid-area: f;
}

@media (min-width: 1536px) {
  .home {
    grid-template-areas:
      "a a a a a a"
      "b b c c . ."
      "d d e e f f";
    grid-template-columns: repeat(6, 1fr);
    gap: 3rem 3rem;
  }
}

@media (min-width: 1280px) and (max-width: 1535px) {
  .home {
    grid-template-areas:
      "a a a a a a"
      "b b c c c ."
      "d d e e f f";
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem 3rem;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .home {
    grid-template-areas:
      "a a a a a a"
      "b b c c c c"
      "d d d d . ."
      "e e e f f f";
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem 3rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .home {
    grid-template-areas:
      "a a a a a a"
      "b b b c c c"
      "d d d d . ."
      "e e e f f f";
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem 3rem;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .home {
    grid-template-areas:
      "a a"
      "b c"
      "d d"
      "e f";
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 639px) {
  .home {
    grid-template-areas:
      "a"
      "b"
      "c"
      "d"
      "e"
      "f";
    grid-template-columns: repeat(1, 1fr);
    gap: 0rem;

  }
}
</style>