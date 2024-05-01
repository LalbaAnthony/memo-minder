<template>
  <div class="overflow-hidden h-6 my-2 flex rounded-lg bg-dark-gray">
    <div :style="{ width: props.value + '%' }"
      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-light-gray"></div>
  </div>
</template>

<script setup>

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    required: false,
  },
})
</script>

<style scoped></style>