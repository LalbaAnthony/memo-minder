<template>
  <div>
    <SortFilter :sortItems="[
      { value: 'name-asc', label: 'Name (A-Z)' },
      { value: 'name-desc', label: 'Name (Z-A)' },
      { value: 'updatedAt-asc', label: 'Add date (Oldest)' },
      { value: 'updatedAt-desc', label: 'Add date (Newest)' }
    ]" />
    <Loader v-if="personStore.people.loading" />
    <Grid v-else :items="personStore.people.data">
      <template #item="{ item }">
        <Person :person="item" />
      </template>
    </Grid>
    <Pagination :total="personStore.people.pagination.total" :page="personStore.people.pagination.page"
      :perPage="personStore.people.pagination.perPage"
      @update-page="(page) => personStore.changePage(page)" />
      
    <BottomActions :addButton="true" :goTopButton="true" />
  </div>
</template>

<script setup>
import SortFilter from '@/components/SortFilterComponent.vue'
import Grid from '@/components/GridComponent.vue'
import Person from '@/components/person/PersonItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/BottomActionsComponent.vue'
import Pagination from '@/components/PaginationComponent.vue'
import { useRoute } from 'vue-router'
import { usePersonStore } from '@/stores/person'
import { watch, onMounted } from 'vue'

const route = useRoute()
const personStore = usePersonStore()

async function loadPeople() {
  personStore.fetchPeople({
    sort: route.query.sort ? [{
      orderBy: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : [{
      order: 'ASC', orderBy: 'name'
    }]
  })
}

// Fetch people on mount
onMounted(() => {
  personStore.resetPagination()
  loadPeople()
})

// Watch route for changes
watch(() => route.query, loadPeople)

</script>