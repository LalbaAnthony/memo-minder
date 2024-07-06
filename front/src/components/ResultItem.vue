<template>
  <div class="item block p-4 border-b border-gray flex items-center justify-between"
    :style="['animation-delay: 0.' + randomInt(1, 10) / 10 + 's;']" @click="props.item.action">
    <DocumentTextIcon v-if="props.item.type === 'page'" class="size-8 text-light-gray" />
    <FilmIcon v-if="props.item.type === 'season'" class="size-8 text-light-gray" />
    <CalendarDaysIcon v-if="props.item.type === 'event'" class="size-8 text-light-gray" />
    <UsersIcon v-if="props.item.type === 'person'" class="size-8 text-light-gray" />
    <MusicalNoteIcon v-if="props.item.type === 'music'" class="size-8 text-light-gray" />
    <h3 class="text-lg font-semibold">{{ props.item.title }}</h3>
    <ArrowLongRightIcon v-if="props.icon === 'arrow'"
      class="arrow size-8 text-primary ml-2 transition ease-in-out duration-300 transform" />
    <PlusIcon v-else-if="props.icon === 'plus'"
      class="arrow size-8 text-primary ml-2 transition ease-in-out duration-300 transform" />
    <div v-else>&nbsp;</div>
  </div>
</template>

<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/solid'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { randomInt } from '@/helpers/helpers.js'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: 'arrow',
  },
})

</script>

<style scoped>
.item {
  animation-name: slide-in;
  animation-duration: 0.3s;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>