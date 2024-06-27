<template>
  <div>
    <section class="progress-bars-grid">
      <div>
        <h2 class="text-xl font-bold">Spent childhood</h2>
        <ProgressBar :value="childhoodPercentage" />
      </div>
      <div>
        <h2 class="text-xl font-bold">Spent adulthood</h2>
        <ProgressBar :value="adulthoodPercentage" />
      </div>
      <div>
        <h2 class="text-xl font-bold">Spent oldhood</h2>
        <ProgressBar :value="oldhoodPercentage" />
      </div>
      <div>
        <h2 class="text-xl font-bold">Total spent</h2>
        <ProgressBar :value="lifeTimePercentage" />
      </div>
    </section>

    <section>
      <h2 class="text-xl font-bold">Lasts added</h2>
      <div class="mt-4">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deleniti laboriosam nemo quisquam hic
          magnam dolore consequuntur libero aliquam nam mollitia sed architecto omnis quaerat voluptatum, rem minima
          totam!</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deleniti laboriosam nemo quisquam hic
          magnam dolore consequuntur libero aliquam nam mollitia sed architecto omnis quaerat voluptatum, rem minima
          totam!</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deleniti laboriosam nemo quisquam hic
          magnam dolore consequuntur libero aliquam nam mollitia sed architecto omnis quaerat voluptatum, rem minima
          totam!</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue"
import ProgressBar from '@/components/ProgressBarComponent.vue'
import { ageFromDate } from "@/helpers/helpers.js"

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

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

</script>

<style scoped>
.progress-bars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0 3rem;
}
</style>