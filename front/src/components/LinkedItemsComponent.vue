<template>
  <div class="flex justify-start flex-wrap items-center w-full my-4 gap-4">
    <Pill v-for="music in props.item?.musics" :key="music.musicId" :text="music.title" type="music"
      deleteable @delete="emit('delete', music.musicId, 'music')" clickable
      @click="router.push(`/music/${music.musicId}`)" />
    <Pill v-for="person in props.item?.people" :key="person.personId" :text="person.name" type="person"
      deleteable @delete="emit('delete', person.personId, 'person')" clickable
      @click="router.push(`/person/${person.personId}`)" />
    <Pill v-for="event in props.item?.events" :key="event.eventId" :text="event.title" type="event"
      deleteable @delete="emit('delete', event.eventId, 'event')" clickable
      @click="router.push(`/event/${event.eventId}`)" />
    <div
      class="flex items-center justify-center rounded-full px-16 py-0.5 border-dashed border-2 cursor-pointer border-gray hover:border-gray-light transition-all transition-200"
      @click="emit('showItemPicker', true)">
      <PlusIcon class="size-6 text-gray-light" />
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid'
import Pill from '@/components/PillComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  types: {
    type: Array,
    required: false,
    default: () => {
      return ['event', 'music', 'person', 'season']
    }
  }
})

const emit = defineEmits(['delete', 'showItemPicker'])
</script>
