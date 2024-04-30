<template>
  <footer>
    <p class="text-center text-light-gray text-sm p-4">{{ new Date().getFullYear() }} - {{ SITE_NAME }}</p>
  </footer>
</template>

<script setup>
import { SITE_NAME } from '@/config';
</script>