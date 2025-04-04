<template>
  <div class="flex items-center justify-start gap-2 px-2 py-1 rounded-lg bg-gray-dark">
    <span class="text-light uppercase">{{ color }}</span>
    <input class="border-none rounded-lg" v-model="color" type="color" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
    default: '#000000',
  },
});

const color = ref(props.value);
const emit = defineEmits(['update']);

// Watch for changes in props.value and update color
watch(() => props.value, (newValue) => {
  if (newValue !== color.value) {
    color.value = newValue;
  }
});

// Watch for changes in color and emit updates
watch(color, (value) => {
  emit('update', value || '#000000');
});

</script>

<style >
input[type="color"] {
  height: 1.5rem;
  width: 4rem;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
}
</style>
