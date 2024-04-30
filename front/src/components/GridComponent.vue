<template>
  <div class="grid">
    <div v-for="(item, index) in props.items" :key="index" class="grid-item">
      <slot name="item" :item="item"></slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.grid-item {
  background-color: #1E1E1E;
  border-radius: 10px;
  padding: 1rem;
}
</style>