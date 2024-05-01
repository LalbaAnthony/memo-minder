<template>
  <div v-if="props?.items && props?.items.length > 0" class="grid">
    <div v-for="(item, index) in props.items" :key="index" class="hover:scale-105 transition-transform ease-in-out transform duration-200">
      <slot name="item" :item="item"></slot>
    </div>
  </div>
  <NoItem v-else />
</template>

<script setup>
import NoItem from '@/components/NoItemComponent.vue'

const props = defineProps({
  items: {
    type: Array,
    required: false,
  },
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
}

</style>