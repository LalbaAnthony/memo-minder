<template>
  <div v-if="props.enabled" class="main-center">
    <span class="loader"></span>
  </div>
</template>

<script setup>

const props = defineProps({
  enabled: {
    type: Boolean,
    default: true,
    required: false,
  },
})
</script>

<style scoped>
.main-center {
  margin: 225px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

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
