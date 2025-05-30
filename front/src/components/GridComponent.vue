<template>
  <div v-if="props?.items && props?.items.length > 0"
    :class="['grid my-2', props.maxHeight > 1 ? 'overflow-y-scroll' : '']"
    :style="[props.maxHeight > 1 ? ` max-height: ${props.maxHeight}px;` : 'max-height: auto;' ]">
    <div v-for="(item, index) in props.items" :key="index"
      :class="[props.clickables && !isMobile() ? 'hover:scale-105 transition-transform ease-in-out transform duration-200 cursor-pointer' : '']">
      <slot name="item" :item="item"></slot>
    </div>
  </div>
  <NoItem v-else-if="props.enableNoItem" :position="props.noItemPosition" />
</template>

<script setup>
import NoItem from '@/components/NoItemComponent.vue'
import { isMobile } from '@/composables/helpers';

const props = defineProps({
  items: {
    type: Array,
    required: false,
  },
  clickables: {
    type: Boolean,
    required: false,
    default: true,
  },
  enableNoItem: {
    type: Boolean,
    required: false,
    default: true,
  },
  noItemPosition: {
    type: String,
    possibleValues: ['absolute', 'static',],
    default: 'absolute',
    required: false,
  },
  maxHeight: {
    type: Number,
    required: false,
    default: 0,
  },
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
  grid-gap: 1rem;
}

@media (min-width: 1536px) {
  .grid {
    grid-gap: 1.5rem;
  }
}

@media (min-width: 1280px) and (max-width: 1535px) {
  .grid {
    grid-gap: 2.5rem;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .grid {
    grid-gap: 2rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid {
    grid-gap: 1.5rem;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .grid {
    grid-gap: 1.5rem;
  }
}

@media (max-width: 639px) {
  .grid {
    grid-gap: 1.5rem;
  }
}
</style>