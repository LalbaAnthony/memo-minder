<template>
  <section v-if="props.birthdate">
    <h2 class="text-xl font-bold">Stats</h2>
    <div class="my-4">
      <ul class="list-disc list-inside">
        <li v-for="(stat, index) in randomStats" :key="index">
          <span v-html="stat"></span>
        </li>
      </ul>
    </div>
  </section>

</template>

<script setup>
import { ref, computed } from 'vue'
import { ageFromDate } from '@/composables/helpers'

const props = defineProps({
  birthdate: {
    type: String,
    required: true
  }
})

const lifeExpectancy = ref(82)
const age = computed(() => ageFromDate(props?.birthdate || '2000-01-01'))
const remainingYears = computed(() => (lifeExpectancy.value - age.value) > 0 ? lifeExpectancy.value - age.value : 0)

const nbOfPet = computed(() => {
  const every = 15
  return (remainingYears.value / every).toFixed(0)
})

const presidentialElections = computed(() => {
  const every = 5
  return (remainingYears.value / every).toFixed(0)
})

const trips = computed(() => {
  const every = 2
  return (remainingYears.value / every).toFixed(0)
})

const firstDrinkOfYear = computed(() => {
  const every = 1
  return (remainingYears.value / every).toFixed(0)
})

const nbOfWorldCup = computed(() => {
  const every = 4
  return (remainingYears.value / every).toFixed(0)
})

const solarEclipse = computed(() => {
  const every = 18
  return (remainingYears.value / every).toFixed(0)
})

const masterAnInstrument = computed(() => {
  const every = 10
  return (remainingYears.value / every).toFixed(0)
})

const learnALanguage = computed(() => {
  const every = 5
  return (remainingYears.value / every).toFixed(0)
})

const readABook = computed(() => {
  const every = 0.5
  return (remainingYears.value / every).toFixed(0)
})

const watchASerie = computed(() => {
  const every = 0.2
  return (remainingYears.value / every).toFixed(0)
})

const nbOfRoadTrips = computed(() => {
  const every = 1.2
  return (remainingYears.value / every).toFixed(0)
})

const nbOfHikes = computed(() => {
  const every = 0.7
  return (remainingYears.value / every).toFixed(0)
})

// Life stats
const lifeStats = computed(() => [
  `You still have time to adopt <span class="text-primary font-bold">${nbOfPet.value}</span> pets`,
  `You will be able to vote <span class="text-primary font-bold">${presidentialElections.value}</span> times for presidential elections`,
  `You have <span class="text-primary font-bold">${trips.value}</span> trips left`,
  `<span class="text-primary font-bold">${firstDrinkOfYear.value}</span> opportunities to grab the first drink of the year outside`,
  `You still have <span class="text-primary font-bold">${nbOfWorldCup.value}</span> world cup to watch`,
  `You will be able to see <span class="text-primary font-bold">${solarEclipse.value}</span> solar eclipses`,
  `You can manage to master <span class="text-primary font-bold">${masterAnInstrument.value}</span> instruments`,
  `You can still learn <span class="text-primary font-bold">${learnALanguage.value}</span> languages`,
  `You still have the time to read <span class="text-primary font-bold">${readABook.value}</span> books`,
  `You can still watch <span class="text-primary font-bold">${watchASerie.value}</span> series`,
  `You still have time to plan <span class="text-primary font-bold">${nbOfRoadTrips.value}</span> road trips`,
  `You have time to plan <span class="text-primary font-bold">${nbOfHikes.value}</span> hikes`,
])

// Shuffle the array and get the first 3 elements
function getRandomStats(array) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

// Stats to display
const randomStats = computed(() => getRandomStats(lifeStats.value));

</script>
