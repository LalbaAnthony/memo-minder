<template>
  <div class="flex justify-between items-center m-2 mb-6">
    <!-- Filter -->
    <Dropdown title="Filter" side="left">
      
    </Dropdown>
    <!-- Sort -->
    <Dropdown title="Sort" side="right">
      <div class="space-y-2">
        <button @click="resetSort" class="w-full text-left text-light hover:bg-light-gray px-4 py-2 rounded-md">Default</button>
        <button @click="toggleSort('title-asc')" class="w-full text-left text-light hover:bg-light-gray px-4 py-2 rounded-md">Title (A-Z)</button>
        <button @click="toggleSort('title-desc')" class="w-full text-left text-light hover:bg-light-gray px-4 py-2 rounded-md">Title (Z-A)</button>
        <button @click="toggleSort('date-asc')" class="w-full text-left text-light hover:bg-light-gray px-4 py-2 rounded-md">Date (Oldest)</button>
        <button @click="toggleSort('date-desc')" class="w-full text-left text-light hover:bg-light-gray px-4 py-2 rounded-md">Date (Newest)</button>
      </div>
    </Dropdown>
  </div>
</template>

<script setup>
import Dropdown from '@/components/DropdownComponent.vue'
import { useRoute, useRouter } from 'vue-router'

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
</script>