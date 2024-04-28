<template>
  <div>
    <VueApexCharts width="500" height="350" type="candlestick" :options="chartOptions" :series="series"></VueApexCharts>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { VueApexCharts } from "vue3-apexcharts";

const chartOptions = ref({
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
});

const series = ref([
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
]);

</script>