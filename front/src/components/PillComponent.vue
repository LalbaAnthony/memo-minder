<template>
  <div class="flex items-center gap-2 rounded-full px-3 py-0.5 bg-gray">
    <FilmIcon v-if="props.type === 'season'" class="size-6 text-light-gray"/>
    <CalendarDaysIcon v-if="props.type === 'event'" class="size-6 text-light-gray"/>
    <UsersIcon v-if="props.type === 'person'" class="size-6 text-light-gray"/>
    <MusicalNoteIcon v-if="props.type === 'music'" class="size-6 text-light-gray"/>
    <span class="text-sm">{{ props.text }}</span>
    </div>
</template>

<script setup>
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    possibleValues: ['event', 'mood', 'music', 'person', 'season'],
    default: '',
    required: false,
  },
})
</script>

<style scoped></style>