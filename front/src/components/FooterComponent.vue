<template>
  <footer>
    <p class="text-center text-gray-light text-sm p-4">{{ VITE_APP_NAME }} - {{ VITE_APP_VERSION }}<br>Made by
      {{ VITE_APP_AUTHOR_NAME }} with &#10084;</p>
  </footer>
</template>

<script setup>
import { VITE_APP_NAME } from '@/config';
import { VITE_APP_VERSION } from '@/config';
import { VITE_APP_AUTHOR_NAME } from '@/config';
</script>