<template>
  <div :class="['flex items-center justify-center', 
    props.position === 'absolute' ? 'absolute inset-0' :
    props.position === 'static' ? 'h-96' : 
    '']"
  >
    <h1 class="text-2xl font-bold">No item found</h1>
  </div>
</template>

<script setup>

const props = defineProps({
  position: {
    type: String,
    possibleValues: ['absolute', 'static',],
    default: 'absolute',
    required: false,
  },
})

</script>
