<template>
  <VueDatePicker v-model="date" dark :enableTimePicker="false" :format="dateToNiceDate"
    :preview-format="dateToNiceDate">
    <template v-if="props?.title" #menu-header>
      <div class="date-picker-header">My custom header</div>
    </template>
  </VueDatePicker>
</template>

<script setup>
import { ref, watch } from 'vue';
import { isValidDate } from "@/helpers/functions.js"
import { dateToNiceDate } from "@/helpers/functions.js"
import { defineProps, defineEmits } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
    default: new Date().toISOString().split('T')[0]
  },
})

const date = ref(props.value)

const emit = defineEmits(['update'])

watch(() => date.value, (newValue, oldValue) => {
  if (isValidDate(newValue)) {
    date.value = newValue
    emit('update', new Date(date.value).toISOString().split('T')[0])
  } else {
    date.value = oldValue
    console.error('Invalid date')
  }
})

</script>

<style scoped>
.date-picker-header {
  padding: 10px;
  text-align: center;
}

</style>