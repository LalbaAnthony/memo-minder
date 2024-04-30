<template>
  <div>
    <GridComponent :items="musics">
      <template #item="{ item }">
        <Music :music="item" />
      </template> 
    </GridComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GridComponent from '@/components/GridComponent.vue'
import Music from '@/components/music/MusicItem.vue'

const musics = ref([
  { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
  { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
  { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
])

</script>