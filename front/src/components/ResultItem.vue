<template>
  <div class="pop-animation block p-4 border-b border-gray flex items-center gap-4 justify-between overflow-hidden"
    :style="['animation-delay: 0.' + randomInt(1, 10) / 10 + 's;']" @click="props.item.action">
    <DocumentTextIcon v-if="props.item.type === 'page'" class="size-8 text-gray-light" />
    <FilmIcon v-if="props.item.type === 'season'" class="size-8 text-gray-light" />
    <CalendarDaysIcon v-if="props.item.type === 'event'" class="size-8 text-gray-light" />
    <UserIcon v-if="props.item.type === 'person'" class="size-8 text-gray-light" />
    <MusicalNoteIcon v-if="props.item.type === 'music'" class="size-8 text-gray-light" />
    <h3 class="text-lg font-semibold">{{ limitString(props.item.title) }}</h3>
    <ArrowLongRightIcon v-if="props.icon === 'arrow'"
      class="arrow size-8 text-primary ml-2 transition ease-in-out duration-300 transform" />
    <PlusIcon v-if="props.icon === 'plus'"
      class="arrow size-8 text-primary ml-2 transition ease-in-out duration-300 transform" />
  </div>
</template>

<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/solid'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UserIcon } from '@heroicons/vue/24/solid'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { randomInt } from '@/composables/helpers'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { limitString } from '@/composables/beautify'
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
.pop-animation {
  animation-name: pop;
  animation-duration: 0.3s;
}

@keyframes pop {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>