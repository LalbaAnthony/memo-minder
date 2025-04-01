<template>
  <div class="overflow-hidden h-7 my-2 flex rounded-lg bg-gray-dark">
    <div :style="`width: ${props.value}%`"
      :class="['flex flex-col text-left text-gray-dark justify-center pl-3', props.value > 0 ? 'bg-primary' : '']">
      <div v-if="props.value > 15"> {{ roundNb(props.value, 0) }} %</div>
    </div>
  </div>
</template>

<script setup>
import { roundNb } from '@/composables/helpers.js'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    required: false,
  },
})
</script>

