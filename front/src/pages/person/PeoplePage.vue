<template>
  <div>
    <SortFilter :sortItems="[
      { value: 'name-asc', label: 'Name (A-Z)' },
      { value: 'name-desc', label: 'Name (Z-A)' },
      { value: 'birthdate-asc', label: 'Birthdate (Older)' },
      { value: 'birthdate-desc', label: 'Birthdate (Younger)' },
      { value: 'createdAt-asc', label: 'Add date (Oldest)' },
      { value: 'createdAt-desc', label: 'Add date (Newest)' }
    ]" />
    <Loader v-if="personStore.items.loading" />
    <Grid v-else :items="personStore.items.data">
      <template #item="{ item }">
        <Person :person="item" />
      </template>
    </Grid>
    <Pagination :total="personStore.items.pagination.total" :page="personStore.items.pagination.page"
      :perPage="personStore.items.pagination.perPage" @update-page="async (page) => {
        personStore.changePage(page, false);
        await loadPeople()
      }" />

    <BottomActions :addButton="true" :goTopButton="true" />
  </div>
</template>

<script setup>
import SortFilter from '@/components/SortFilterComponent.vue'
import Grid from '@/components/GridComponent.vue'
import Person from '@/components/person/PersonItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import Pagination from '@/components/PaginationComponent.vue'
import { useRoute } from 'vue-router'
import { usePersonStore } from '@/stores/person'
import { watch, onMounted } from 'vue'

const route = useRoute()
const personStore = usePersonStore()

async function loadPeople() {
  personStore.fetchItems({
    sort: route.query.sort ? [{
      orderBy: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : []
  }, false)
}

// Fetch people on mount
onMounted(() => {
  personStore.resetPagination()
  loadPeople()
})

// Watch route for changes
watch(() => route.query, loadPeople)

</script>