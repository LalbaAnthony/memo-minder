<template>
  <div class="flex justify-between items-center m-2 mb-6">
    <!-- Filter -->
    <div>FILTER MENU HERE</div>
    <!-- Sort -->
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-light hover:bg-dark-gray"
          @click.stop="showSort = !showSort">
          Options
          <ChevronDownIcon :class="['ml-2 h-5 w-5 text-light transform transition-transform', showSort ? 'rotate-180' : '']" aria-hidden="true" />
        </MenuButton>
      </div>
      <TransitionRoot :show="showSort">
        <!-- Hide at click outside -->
        <TransitionChild v-click-outside="() => showSort = false" as="div"
          enter="transition ease-out duration-100 transform" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="transition ease-in duration-75 transform"
          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-lg bg-gray p-4 z-20">
          SORT<br>
          SORT<br>
          SORT<br>
          SORT<br>
        </TransitionChild>
      </TransitionRoot>
    </Menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
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