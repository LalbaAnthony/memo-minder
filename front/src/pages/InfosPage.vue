<template>
  <div>
    <section>
      <h1 class="text-2xl font-bold mb-4">Open source</h1>
      <p>
        {{ VITE_APP_NAME }} is an open source project available in <a :href="VITE_GIT_REPO" target="_blank"
          class="text-light text-primary">GitHub</a>.
      </p>
    </section>
  </div>
</template>

<script setup>
import { VITE_APP_NAME, VITE_GIT_REPO } from '@/config';
</script>