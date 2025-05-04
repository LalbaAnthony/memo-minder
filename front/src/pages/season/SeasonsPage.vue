<template>
  <div>
    <SortFilter :sortItems="[
      { value: 'title-asc', label: 'Title (A-Z)' },
      { value: 'title-desc', label: 'Title (Z-A)' },
      { value: 'createdAt-asc', label: 'Add date (Oldest)' },
      { value: 'createdAt-desc', label: 'Add date (Newest)' },
      { value: 'dateStart-asc', label: 'Date (Oldest)' },
      { value: 'dateStart-desc', label: 'Date (Newest)' }
    ]" />
    <Loader v-if="seasonStore.items.loading" />
    <Grid v-else :items="seasonStore.items.data">
      <template #item="{ item }">
        <Season :season="item" />
      </template>
    </Grid>
    <Pagination :total="seasonStore.items.pagination.total" :page="seasonStore.items.pagination.page"
      :perPage="seasonStore.items.pagination.perPage" @update-page="(page) => seasonStore.changePage(page)" />

    <BottomActions :addButton="true" :goTopButton="true" />
  </div>
</template>

<script setup>
import SortFilter from '@/components/SortFilterComponent.vue'
import Grid from '@/components/GridComponent.vue'
import Season from '@/components/season/SeasonItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import Pagination from '@/components/PaginationComponent.vue'

import { useRoute } from 'vue-router'
import { useSeasonStore } from '@/stores/season'
import { onMounted, watch } from 'vue'

const route = useRoute()
const seasonStore = useSeasonStore()

async function loadSeasons() {
  seasonStore.fetchItems({
    sort: route.query.sort ? [{
      orderBy: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : [
      { order: 'DESC', orderBy: 'dateStart' },
      { order: 'DESC', orderBy: 'createdAt' },
    ]
  })
}

// Fetch seasons on mount
onMounted(() => {
  seasonStore.resetPagination()
  loadSeasons()
})

// Watch route for changes
watch(() => route.query, loadSeasons)

</script>