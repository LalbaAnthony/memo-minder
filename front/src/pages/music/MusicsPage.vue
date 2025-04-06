<template>
  <div>
    <SortFilter :sortItems="[
      { value: 'title-asc', label: 'Title (A-Z)' },
      { value: 'title-desc', label: 'Title (Z-A)' },
      { value: 'releaseDate-asc', label: 'Date (Oldest)' },
      { value: 'releaseDate-desc', label: 'Date (Newest)' }
    ]" />
    <Loader v-if="musicStore.musics.loading" />
    <Grid v-else :items="musicStore.musics.data">
      <template #item="{ item }">
        <Music :music="item" />
      </template>
    </Grid>

    <Pagination :total="musicStore.musics.pagination.total" :page="musicStore.musics.pagination.page"
      :perPage="musicStore.musics.pagination.perPage" @update-page="(page) => musicStore.changePage(page)" />

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
  musicStore.fetchMusics({
    sort: route.query.sort ? [{
      orderBy: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : [{
      order: 'ASC', orderBy: 'title'
    }]
  })
}

// Fetch musics on mount
onMounted(() => {
  musicStore.resetPagination()
  loadMusics()
})

// Watch route for changes
watch(() => route.query, loadMusics)

</script>