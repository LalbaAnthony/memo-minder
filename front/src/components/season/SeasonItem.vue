<template>
  <router-link class="flex flex-col cursor-pointer border-2 border-gray rounded-[8px] bg-light-dark h-full"
    :to="{ path: '/season/', query: { season: props?.season?.season_id } }">
    <div class="h-6 w-full rounded-t-[6px]" :style="`background-color: ${props?.season?.color};`"></div>
    <div class="p-5">
      <div class="flex flex-col justify-center items-center w-full my-2">
        <h1 class="text-2xl font-bold">{{ props?.season?.title }}</h1>
        <p class="text-sm text-light-gray">on 05/03/2023</p>
      </div>
      <div class="my-4">
        <div class="flex justify-start flex-wrap items-center w-full m-2 gap-2">
          <div class="rounded-full px-2 bg-primary">Calm</div>
          <div class="rounded-full px-2 bg-gray">Romain</div>
          <div class="rounded-full px-2 bg-gray">Maga</div>
        </div>
        <p>{{ threeDotString('Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat eveniet mollitia labore repellendus ?') }}</p>
      </div>
    </div>
    <div class="grid grid-cols-2 divide-x-2 divide-gray cursor-pointer">
      <div class="flex justify-center items-center p-2 bg-light-gray rounded-bl-[6px]">
        <TrashIcon class="size-6" />
      </div>
      <div class="flex justify-center items-center p-2 bg-light-gray rounded-br-[6px]">
        <PencilSquareIcon class="size-6" />
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { TrashIcon } from '@heroicons/vue/24/solid'
import { PencilSquareIcon } from '@heroicons/vue/24/solid'
import { threeDotString } from '@/helpers/helpers';

const props = defineProps({
  season: {
    type: Object,
    required: true,
  },
})

</script>
