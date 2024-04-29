<template>
  <div>
    <Music
      :music="{ title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', type_streaming: 'spotify', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' }" 
      :platform="'spotify'"
      />
  </div>
</template>

<script setup>
import Music from '@/components/music/MusicItem.vue'

</script>