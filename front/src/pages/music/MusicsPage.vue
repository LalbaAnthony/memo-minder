<template>
  <div>
    <SortFilter />
    <Loader v-if="musicStore.musics.loading" />
    <Grid v-else :items="musicStore.musics.data">
      <template #item="{ item }">
        <Music :music="item" />
      </template>
    </Grid>
    <BottomActions :actions="[{
      label: 'Add Music 1',
      icon: 'Add',
      to: '/musics/add',
    }, {
      label: 'Add Music 2',
      icon: 'Add',
      to: '/musics/add',
    }]" />
  </div>
</template>

<script setup>
import SortFilter from '@/components/SortFilterComponent.vue'
import Grid from '@/components/GridComponent.vue'
import Music from '@/components/music/MusicItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/BottomActionsComponent.vue'
import { useRoute } from 'vue-router'
import { useMusicStore } from '@/stores/music'
import { watch } from 'vue'

const route = useRoute()
const musicStore = useMusicStore()

async function loadMusics() {
  musicStore.fetchMusics({
    sort: route.query.sort ? [{
      order_by: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : [
      { order: 'ASC', order_by: 'title' },
    ]
  })
}

// Fetch musics on mount
if (!musicStore.musics.data.length) loadMusics()

// Watch route for changes
watch(() => route.query, loadMusics)

</script>