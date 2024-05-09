<template>
  <div>
    <!-- Search -->
    <div class="py-2 px-4">
      <form action="" @submit.prevent="loadSearch()">
        <input v-model="search" id="search" type="search" class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light"
          placeholder="Search..." @input="loadSearch()">
      </form>
    </div>

    <!-- Nb of results -->
    <div v-if="results.length > 0">
      <p class="text-center text-light-gray text-sm p-4">
        {{ results.length }} {{ results.length > 1 ? 'results' : 'result' }}
      </p>
    </div>

    <!-- Results -->
    <Grid :items="results">
      <template #item="{ item }">
        <router-link :to="item.path" class="item block p-4 border-b border-gray flex items-center justify-between">
          <DocumentTextIcon v-if="item.type === 'page'" class="size-8 text-light-gray" />
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <ArrowLongRightIcon
            class="arrow size-8 text-light-gray ml-2 hover:text-light transition ease-in-out duration-300 transform" />
        </router-link>
      </template>
    </Grid>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Grid from '@/components/GridComponent.vue'
import { DocumentTextIcon } from '@heroicons/vue/24/solid'
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()

const search = ref(route.query.search)
const results = ref([])

function loadSearch() {
  if (!search.value) return

  results.value = []

  // Pages
  router.options.routes.forEach((route) => {
    if (
      route.meta &&
      route.meta.displayInSearch &&
      route.meta.title &&
      route.path && (
        (route.name && route.name.toLowerCase().includes(search.value.toLowerCase())) ||
        (route.path && route.path.toLowerCase().includes(search.value.toLowerCase())) ||
        (route.meta && route.meta.tags && route.meta.tags.includes(search.value.toLowerCase()))
      )
    ) {
      results.value.push({
        title: route.meta.title || route.name,
        path: route.path,
        type: 'page'
      })
    }
  })

  // Musics
  // ...

}

onMounted(() => {
  setTimeout(() => {
    const input = document.getElementById('search')
    input.focus()
  }, 200)
  loadSearch()
})

</script>

<style scoped>
.item:hover .arrow {
  transform: translateX(10px);
}
</style>