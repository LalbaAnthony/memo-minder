<template>
  <div class="flex justify-end items-center m-2 mb-4">
    <!-- Filter -->
    <!-- <Dropdown title="Filter" side="left"></Dropdown> -->

    <!-- Sort -->
    <Dropdown side="right">
      <template #button>
        <span>Sort</span>
      </template>
      <template #content>
        <div class="space-y-2">
          <button @click="resetSort"
            class="w-full text-left text-light transition-colors duration-200 hover:bg-gray px-4 py-2 rounded-md">Default</button>
          <button v-for="item in props.sortItems" :key="item.value" @click="toggleSort(item.value)" :class="['w-full text-left text-light transition-colors duration-200 hover:bg-gray px-4 py-2 rounded-md',
            isActive(item.value) ? 'bg-gray' : ''
          ]">{{
            item.label }}</button>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup>
import Dropdown from '@/components/DropdownComponent.vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  sortItems: {
    type: Array,
    required: false,
  },
})

const route = useRoute()
const router = useRouter()

function resetSort() {
  const query = { ...route.query }
  delete query.sort
  router.push({ path: route.path, query })
}

function toggleSort(value) {
  const query = { ...route.query }
  if (value === 'default') {
    delete query.sort
  } else {
    query.sort = value
  }
  router.push({ path: route.path, query })
}

function isActive(value) {
  return route.query.sort === value
}

</script>