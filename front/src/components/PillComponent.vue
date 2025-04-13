<template>
  <div
    :class="['flex justify-between items-center gap-2 rounded-full px-3 py-1 bg-gray', props.clickable ? 'cursor-pointer' : '']">
    <HeartIcon v-if="props.type === 'mood'" class="size-6 text-primary-light" />
    <FilmIcon v-if="props.type === 'season'" class="size-6 text-primary-light" />
    <CalendarDaysIcon v-if="props.type === 'event'" class="size-6 text-primary-light" />
    <UserIcon v-if="props.type === 'person'" class="size-6 text-primary-light" />
    <MusicalNoteIcon v-if="props.type === 'music'" class="size-6 text-primary-light" />
    <span class="text-sm text-light">{{ threeDotsString(props.text, 30) }}</span>
    <PlusIcon v-if="props.addable" class="size-6 text-gray-light hover:text-light cursor-pointer"
      @click.stop="$emit('add', true)" />
    <XMarkIcon v-if="props.deleteable" class="size-6 text-gray-light hover:text-light cursor-pointer"
      @click.stop="$emit('delete', true)" />
  </div>
</template>

<script setup>
import { threeDotsString } from '@/composables/helpers'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { HeartIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UserIcon } from '@heroicons/vue/24/solid'
import { PlusIcon } from '@heroicons/vue/24/solid'
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
  addable: {
    type: Boolean,
    default: false,
    required: false,
  },
  clickable: {
    type: Boolean,
    default: false,
    required: false,
  },
})

</script>
