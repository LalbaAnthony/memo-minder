<template>
  <div :class="['flex items-center justify-center', 
    props.position === 'absolute' ? 'absolute inset-0' :
    props.position === 'static' ? 'h-96' : 
    '']"
  >
    <span class="loader"></span>
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

<style scoped>
.loader {
  width: 84px;
  height: 84px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>