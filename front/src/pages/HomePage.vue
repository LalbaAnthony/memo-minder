<template>
  <div>
    <div class="progress-bars-grid">
      <section>
        <h2 class="text-xl font-bold">Spent childhood</h2>
        <ProgressBar :value="childhoodPercentage" />
      </section>
      <section>
        <h2 class="text-xl font-bold">Spent adulthood</h2>
        <ProgressBar :value="adulthoodPercentage" />
      </section>
      <section>
        <h2 class="text-xl font-bold">Spent oldhood</h2>
        <ProgressBar :value="oldhoodPercentage" />
      </section>
      <section>
        <h2 class="text-xl font-bold">Total spent</h2>
        <ProgressBar :value="lifeTimePercentage" />
      </section>
    </div>
    <section>
      <h2 class="text-xl font-bold">Lasts added</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deleniti laboriosam nemo quisquam hic
        magnam dolore consequuntur libero aliquam nam mollitia sed architecto omnis quaerat voluptatum, rem minima
        totam!</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deleniti laboriosam nemo quisquam hic
        magnam dolore consequuntur libero aliquam nam mollitia sed architecto omnis quaerat voluptatum, rem minima
        totam!</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deleniti laboriosam nemo quisquam hic
        magnam dolore consequuntur libero aliquam nam mollitia sed architecto omnis quaerat voluptatum, rem minima
        totam!</p>
    </section>
    <section>
      <!-- <apexChart width="400" height="350" type="candlestick" :options="chartOptions" :series="series">
        </apexChart> -->
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ProgressBar from '@/components/ProgressBarComponent.vue'
import { ageFromDate } from "@/helpers/helpers.js";

const birthDate = ref("2003-03-19");

const childhoodPercentage = computed(() => {
  const yearStart = 0;
  const yearEnd = 18;
  const percent = ((ageFromDate(birthDate.value) - yearStart) / yearEnd) * 100;
  if (percent < 0) return 0;
  if (percent > 100) return 100;
  return percent;
});

const adulthoodPercentage = computed(() => {
  const yearStart = 18;
  const yearEnd = 64;
  const percent = ((ageFromDate(birthDate.value) - yearStart) / yearEnd) * 100;
  if (percent < 0) return 0;
  if (percent > 100) return 100;
  return percent;
});

const oldhoodPercentage = computed(() => {
  const yearStart = 64;
  const yearEnd = 80;
  const percent = ((ageFromDate(birthDate.value) - yearStart) / yearEnd) * 100;
  if (percent < 0) return 0;
  if (percent > 100) return 100;
  return percent;
});

const lifeTimePercentage = computed(() => {
  const yearStart = 0;
  const yearEnd = 80;
  const percent = ((ageFromDate(birthDate.value) - yearStart) / yearEnd) * 100;
  if (percent < 0) return 0;
  if (percent > 100) return 100;
  return percent;
});

// const chartOptions = ref({
//   chart: {
//     type: "candlestick",
//   },
//   series: [
//     {
//       data: [
//         {
//           x: new Date(1538778600000),
//           y: [6629.81, 6650.5, 6623.04, 6633.33],
//         },
//         {
//           x: new Date(1538780400000),
//           y: [6632.01, 6643.59, 6620, 6630.11],
//         },
//         {
//           x: new Date(1538782200000),
//           y: [6630.71, 6648.95, 6623.34, 6635.65],
//         },
//         {
//           x: new Date(1538784000000),
//           y: [6635.65, 6651, 6629.67, 6638.24],
//         },
//         {
//           x: new Date(1538785800000),
//           y: [6638.24, 6640, 6620, 6624.47],
//         },
//         {
//           x: new Date(1538787600000),
//           y: [6624.53, 6636.03, 6621.68, 6624.31],
//         },
//         {
//           x: new Date(1538789400000),
//           y: [6624.61, 6632.2, 6617, 6626.02],
//         },
//         {
//           x: new Date(1538791200000),
//           y: [6627, 6627.62, 6584.22, 6603.02],
//         },
//         {
//           x: new Date(1538793000000),
//           y: [6605, 6608.03, 6598.95, 6604.01],
//         },
//         {
//           x: new Date(1538794800000),
//           y: [6604.5, 6614.4, 6602.26, 6608.02],
//         },
//         {
//           x: new Date(1538796600000),
//           y: [6608.02, 6610.68, 6601.99, 6608.91],
//         },
//         {
//           x: new Date(1538798400000),
//           y: [6608.91, 6618.99, 6608.01, 6612],
//         },
//       ],
//     },
//   ],
// });

// const series = ref([
//   {
//     data: [
//       {
//         x: new Date(1538778600000),
//         y: [6629.81, 6650.5, 6623.04, 6633.33],
//       },
//       {
//         x: new Date(1538780400000),
//         y: [6632.01, 6643.59, 6620, 6630.11],
//       },
//       {
//         x: new Date(1538782200000),
//         y: [6630.71, 6648.95, 6623.34, 6635.65],
//       },
//       {
//         x: new Date(1538784000000),
//         y: [6635.65, 6651, 6629.67, 6638.24],
//       },
//       {
//         x: new Date(1538785800000),
//         y: [6638.24, 6640, 6620, 6624.47],
//       },
//       {
//         x: new Date(1538787600000),
//         y: [6624.53, 6636.03, 6621.68, 6624.31],
//       },
//       {
//         x: new Date(1538789400000),
//         y: [6624.61, 6632.2, 6617, 6626.02],
//       },
//       {
//         x: new Date(1538791200000),
//         y: [6627, 6627.62, 6584.22, 6603.02],
//       },
//       {
//         x: new Date(1538793000000),
//         y: [6605, 6608.03, 6598.95, 6604.01],
//       },
//       {
//         x: new Date(1538794800000),
//         y: [6604.5, 6614.4, 6602.26, 6608.02],
//       },
//       {
//         x: new Date(1538796600000),
//         y: [6608.02, 6610.68, 6601.99, 6608.91],
//       },
//       {
//         x: new Date(1538798400000),
//         y: [6608.91, 6618.99, 6608.01, 6612],
//       },
//     ],
//   },
// ]);

</script>

<style scoped>
.progress-bars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0 3rem;
}
</style>