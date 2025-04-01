<template>
  <VueDatePicker class="max-w-[24rem]" ref="datePicker" v-model="date" dark :enableTimePicker="false"
    :format="dateToNiceDate" :preview-format="() => { return '' }">
    <template #menu-header v-if="props.actions && Object.keys(props.actions).length > 0">
      <div class="px-2 pt-2 flex justify-between items-center">
        <div>
          <button v-if="props.actions?.setToday" type="button"
            class="dp__action_buttons dp__action_button date-picker-today-button" @click="setToday">Pick today</button>
        </div>()
      </div>
    </template>
  </VueDatePicker>
</template>

<script setup>
import { ref, watch } from 'vue';
import { dateToNiceDate } from "@/composables/helpers.js";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  actions: {
    type: Object,
    required: false,
    default: () => {
      return {
        setToday: true,
      };
    },
  },
  value: {
    type: String,
    required: false,
    default: new Date().toISOString().split('T')[0],
  },
});

const date = ref(props.value);
const datePicker = ref(null);
const emit = defineEmits(['update']);

// Function to set today's date
const setToday = () => {
  date.value = new Date().toISOString().split('T')[0];

  // Close the date picker popup
  if (datePicker.value) {
    datePicker.value.closeMenu();
  }
};

// Watch for changes in props.value and update date
watch(() => props.value, (newValue) => {
  if (newValue == '1970-01-01') newValue = null;
  if (newValue !== date.value) {
    date.value = newValue;
  }
});

// Watch for changes in date and emit updates
watch(date, (value) => {
  if (value == '1970-01-01') value = null;
  emit('update', value ? new Date(value).toISOString().split('T')[0] : null);
});

</script>

<style scoped>
.date-picker-today-button {
  background: var(--gray);
  color: var(--dp-primary-text-color);
  padding: 17px auto 17px auto;
  transition: background 0.3s;
}

.date-picker-today-button:hover {
  background: var(--gray-light);
}
</style>

<style>
.dp__theme_dark {
  font-family: "Poppins", "Roboto", sans-serif;
  --dp-background-color: var(--gray);
  --dp-text-color: var(--light);
  --dp-hover-color: var(--gray-light);
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
  border-radius: 0.5rem;
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

.dp__arrow_bottom,
.dp__arrow_top {
  display: none;
}
</style>