<template>
  <VueDatePicker v-model="date"></VueDatePicker>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: new Date().toISOString()
  },
})

const date = ref(props.value)
</script>