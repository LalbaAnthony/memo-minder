<template>
  <div>
    <LoaderComponent v-if="musicStore.musics.loading" />
    <GridComponent v-else :items="musicStore.musics.data">
      <template #item="{ item }">
        <Music :music="item" />
      </template>
    </GridComponent>
  </div>
</template>

<script setup>
import GridComponent from '@/components/GridComponent.vue'
import Music from '@/components/music/MusicItem.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
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