<template>
  <router-link class="flex justify-between cursor-pointer border-2 border-gray p-5 rounded-lg bg-light-dark p-2 h-full"
    :to="{ path: '/season/', query: { season: props?.season?.season_id } }">
    <div>
      <h1 class="text-2xl font-bold">{{ props?.season?.title }}</h1>
    </div>
  </router-link>
</template>

<script setup>

const props = defineProps({
  season: {
    type: Object,
    required: true,
  },
})

</script>
