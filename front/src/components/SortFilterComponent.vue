<template>
  <div class="flex justify-between items-center m-2 mb-6">
    <!-- Filter -->
    <Dropdown title="Filter" side="left">
      hey
    </Dropdown>
    <!-- Sort -->
    <Dropdown title="Sort" side="right">
      hey
    </Dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from '@/components/DropdownComponent.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const showFilter = ref(false)
const showSort = ref(false)

function resetFilter() {
  const query = { ...route.query }
  delete query.categories
  delete query.materials
  router.push({ path: route.path, query })
}

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

// Directive click outside
const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>