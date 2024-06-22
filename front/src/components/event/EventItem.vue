<template>
  <div>
    {{ props.event }}
  </div>
</template>

<script setup>

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

</script>