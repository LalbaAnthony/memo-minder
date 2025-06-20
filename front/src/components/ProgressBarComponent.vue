<template>
  <div class="overflow-hidden h-7 my-2 flex rounded-lg bg-gray-dark">
    <div :style="`width: ${props.value}%`"
      :class="['flex flex-col text-left text-light justify-center pl-3', props.value > 0 ? 'bg-primary' : '']">
      <div v-if="props.value > 15"> {{ roundNumber(props.value, 1) }} %</div>
    </div>
  </div>
</template>

<script setup>
import { roundNumber } from '@/composables/beautify'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    required: false,
  },
})
</script>

