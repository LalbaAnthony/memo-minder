<template>
  <input v-model="date" id="datepicker" type="date" class="w-full p-2 rounded-lg bg-dark-gray text-light"
    :placeholder="props.placeholder" />
</template>

<script setup>

// ? Component made to handle date inputs as 2024-06-27T14:02:29.928Z

import { ref, watch } from 'vue'
import { isValidDate } from "@/helpers/helpers.js"

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: new Date().toISOString()
  },
  placeholder: {
    type: String,
    default: 'Date',
    required: false
  }
})

const date = ref(formatDate(new Date(props.value)))

const emit = defineEmits(['update'])

function formatDate(string) {
  const date = new Date(string);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

watch(() => date.value, (newValue, oldValue) => {
  if (isValidDate(newValue) && newValue.length === 10) {
    date.value = newValue

    // ? return date as 2024-06-27T14:02:29.928Z
    const dateToSend = new Date(date.value).toISOString()
    emit('update', dateToSend)
  } else {
    date.value = oldValue
    // console.error('Invalid date')
  }
})

</script>