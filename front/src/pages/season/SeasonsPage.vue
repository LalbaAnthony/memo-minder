<template>
  <div>
    <SortFilter :sortItems="[
      { value: 'title-asc', label: 'Title (A-Z)' },
      { value: 'title-desc', label: 'Title (Z-A)' },
      { value: 'dateEnd-asc', label: 'Date (Oldest)' },
      { value: 'dateEnd-desc', label: 'Date (Newest)' }
    ]" />
    <Loader v-if="seasonStore.seasons.loading" />
    <Grid v-else :items="seasonStore.seasons.data">
      <template #item="{ item }">
        <Season :season="item" />
      </template>
    </Grid>
    <BottomActions />
  </div>
</template>

<script setup>
import SortFilter from '@/components/SortFilterComponent.vue'
import Grid from '@/components/GridComponent.vue'
import Season from '@/components/season/SeasonItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/BottomActionsComponent.vue'
import { useRoute } from 'vue-router'
import { useSeasonStore } from '@/stores/season'
import { watch } from 'vue'

const route = useRoute()
const seasonStore = useSeasonStore()

async function loadSeasons() {
  seasonStore.fetchSeasons({
    sort: route.query.sort ? [{
      orderBy: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : [
      { order: 'ASC', orderBy: 'createdAt' },
    ]
  })
}

// Fetch seasons on mount
if (!seasonStore.seasons.data || seasonStore.seasons.data.length === 0) loadSeasons()

// Watch route for changes
watch(() => route.query, loadSeasons)

</script>