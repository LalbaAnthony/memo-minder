<template>
  <div>
    <SortFilter :sortItems="[
      { value: 'title-asc', label: 'Title (A-Z)' },
      { value: 'title-desc', label: 'Title (Z-A)' },
      { value: 'createdAt-asc', label: 'Add date (Oldest)' },
      { value: 'createdAt-desc', label: 'Add date (Newest)' },
      { value: 'releaseDate-asc', label: 'Date (Oldest)' },
      { value: 'releaseDate-desc', label: 'Date (Newest)' }
    ]" />
    <Loader v-if="musicStore.items.loading" />
    <Grid v-else :items="musicStore.items.data">
      <template #item="{ item }">
        <Music :music="item" />
      </template>
    </Grid>

    <Pagination :total="musicStore.items.pagination.total" :page="musicStore.items.pagination.page"
      :perPage="musicStore.items.pagination.perPage" @update-page="async (page) => {
        musicStore.changePage(page, false);
        await loadMusics()
      }" />

    <BottomActions :addButton="true" :goTopButton="true" />
  </div>
</template>

<script setup>
import SortFilter from '@/components/SortFilterComponent.vue'
import Grid from '@/components/GridComponent.vue'
import Music from '@/components/music/MusicItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import Pagination from '@/components/PaginationComponent.vue'
import { useRoute } from 'vue-router'
import { useMusicStore } from '@/stores/music'
import { watch, onMounted } from 'vue'

const route = useRoute()
const musicStore = useMusicStore()

async function loadMusics() {
  musicStore.fetchItems({
    sort: route.query.sort ? [{
      orderBy: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : []
  }, false)
}

// Fetch musics on mount
onMounted(() => {
  musicStore.resetPagination()
  loadMusics()
})

// Watch route for changes
watch(() => route.query, loadMusics)

</script>