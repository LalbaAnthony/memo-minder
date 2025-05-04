<template>
  <div>
    <SortFilter :sortItems="[
      { value: 'title-asc', label: 'Title (A-Z)' },
      { value: 'title-desc', label: 'Title (Z-A)' },
      { value: 'createdAt-asc', label: 'Add date (Oldest)' },
      { value: 'createdAt-desc', label: 'Add date (Newest)' },
      { value: 'date-asc', label: 'Date (Oldest)' },
      { value: 'date-desc', label: 'Date (Newest)' }
    ]" />
    <Loader v-if="eventStore.items.loading" />
    <Grid v-else :items="eventStore.items.data">
      <template #item="{ item }">
        <Event :event="item" />
      </template>
    </Grid>

    <Pagination :total="eventStore.items.pagination.total" :page="eventStore.items.pagination.page"
      :perPage="eventStore.items.pagination.perPage" @update-page="(page) => eventStore.changePage(page)" />

    <BottomActions :addButton="true" :goTopButton="true" />
  </div>
</template>

<script setup>
import SortFilter from '@/components/SortFilterComponent.vue'
import Grid from '@/components/GridComponent.vue'
import Event from '@/components/event/EventItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import Pagination from '@/components/PaginationComponent.vue'
import { useRoute } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { watch, onMounted } from 'vue'

const route = useRoute()
const eventStore = useEventStore()

async function loadEvents() {
  eventStore.fetchItems({
    sort: route.query.sort ? [{
      orderBy: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : [
      { order: 'ASC', orderBy: 'createdAt' },
    ]
  })
}

// Fetch events on mount
onMounted(() => {
  eventStore.resetPagination()
  loadEvents()
})

// Watch route for changes
watch(() => route.query, loadEvents)

</script>