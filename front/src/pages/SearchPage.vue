<template>
  <div>
    WIP
    <p> Search: {{ route.query.search }}</p>

    <!-- Also search in (possible ?)  -->
    <pre>
      {{ router.options.routes }}
    </pre>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>