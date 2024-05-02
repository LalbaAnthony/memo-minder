<template>
  <div>
    WIP
    <p> Search: {{ route.query.search }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>