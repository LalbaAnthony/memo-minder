<template>
  <footer>
    <p class="text-center text-gray-light text-sm p-4">{{ VITE_SITE_NAME }}<br>Made by {{ VITE_AUTHOR_NAME }} with {{`
      <3`}} </p>
  </footer>
</template>

<script setup>
import { VITE_SITE_NAME } from '@/config';
import { VITE_AUTHOR_NAME } from '@/config';
</script>