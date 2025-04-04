<template>
  <div :class="['flex items-center justify-center', 
    props.type === 'absolute' ? 'absolute inset-0' :
    props.type === 'fixe' ? 'h-80' : 
    '']"
  >
    <h1 class="text-2xl font-bold">No item found</h1>
  </div>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    possibleValues: ['absolute', 'fixe',],
    default: 'absolute',
    required: false,
  },
})

</script>
