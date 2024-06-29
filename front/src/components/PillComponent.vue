<template>
  <div class="flex items-center gap-2 rounded-full px-3 py-1 bg-gray">
    <FilmIcon v-if="props.type === 'season'" class="size-6 text-primary-light" />
    <CalendarDaysIcon v-if="props.type === 'event'" class="size-6 text-primary-light" />
    <UsersIcon v-if="props.type === 'person'" class="size-6 text-primary-light" />
    <MusicalNoteIcon v-if="props.type === 'music'" class="size-6 text-primary-light" />
    <span class="text-sm text-light">{{ props.text }}</span>
    <XMarkIcon v-if="props.deleteable" class="size-6 text-light-gray hover:text-light cursor-pointer" @click="$emit('delete', true)" />
  </div>
</template>

<script setup>
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/solid'

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
  deleteable: {
    type: Boolean,
    default: false,
    required: false,
  },
})

// const emit = defineEmits(['delete'])

</script>

<style scoped></style>