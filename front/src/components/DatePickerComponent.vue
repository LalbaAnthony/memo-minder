<template>
  <VueDatePicker v-model="date" dark :enableTimePicker="false" :format="dateToNiceDate"
    :preview-format="() => { return ''}">
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

<style>
.dp__theme_dark {
  font-family: "Poppins", "Roboto", sans-serif;
  --dp-background-color: var(--gray);
  --dp-text-color: var(--light);
  --dp-hover-color: var(--gray);
  --dp-hover-text-color: var(--light);
  --dp-hover-icon-color: var(--gray--light);
  --dp-primary-color: var(--primary);
  --dp-primary-disabled-color: var(--primary-light);
  --dp-primary-text-color: var(--light);
  --dp-secondary-color: #878787;
  --dp-border-color: var(--gray-light);
  --dp-menu-border-color: var(--gray);
  --dp-border-color-hover: var(--gray-dark);
  --dp-border-color-focus: var(--gray-dark);
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: var(--gray-dark);
  --dp-scroll-bar-color: var(--gray);
  --dp-tooltip-color: #3e3e3e;
  --dp-icon-color: var(--gray-light);
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, var(--gray));
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__input {
  background-color: var(--gray-dark);
  border: none;
}

.dp__menu {
  border-radius: 0.5rem;
}

.dp__selection_preview {
  font-size: 17px;
  padding: 17px;
}

.dp__action_cancel {
  border: none;
}

.dp__action_button {
  font-size: 17px;
  padding: 17px;
  border-radius: 0.5rem;
}

.dp__arrow_top {
  display: none;
}
</style>