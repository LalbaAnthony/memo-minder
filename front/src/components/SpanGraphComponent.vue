<template>
  <apexchart type="rangeBar" height="450" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>
import { ref } from "vue";

const chartOptions = ref({
  chart: {
    height: 450,
    type: 'rangeBar'
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%'
    }
  },
  xaxis: {
    type: 'datetime'
  },
  fill: {
    type: 'solid',
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  }
});

const series = ref([
  {
    name: 'Mermoz',
    data: [
      {
        x: 'Home',
        y: [
          new Date('2021-09-01').getTime(),
          new Date('2022-06-01').getTime()
        ]
      },
    ]
  },
  {
    name: 'Bagatelle',
    data: [
      {
        x: 'Home',
        y: [
          new Date('2022-06-01').getTime(),
          new Date().getTime()
        ]
      },
    ]
  },
]);

</script>

<style scoped>
.apexcharts-text {
  color: var(--light) !important;
}
</style>