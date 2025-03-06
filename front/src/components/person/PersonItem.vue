<template>
  <div class="flex flex-row justify-between border-2 border-gray rounded-[8px] bg-dark-light h-full">
    <div
      class="flex-1 flex justify-between rounded-l-[6px] p-5 cursor-pointer transition-colors duration-200">
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-2xl font-bold">{{ props?.person?.name }}</h1>
        <p class="text-gray-light">{{ threeDotString(props?.person?.description) }}</p>
      </div>
      <div>
      </div>
    </div>
    <div class="grid grid-rows-2 divide-y-2 divide-gray cursor-pointer">
      <div class="flex justify-center items-center p-3 bg-gray-dark rounded-tr-[6px]" @click="deletePerson()">
        <TrashIcon class="size-6" />
      </div>
      <div class="flex justify-center items-center p-3 bg-gray-dark rounded-br-[6px]" @click="goToPerson()">
        <PencilSquareIcon class="size-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePersonStore } from '@/stores/person'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { threeDotString } from '@/helpers/functions'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

const personStore = usePersonStore()

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})

function deletePerson() {
  if (confirm('Are you sure you want to delete this person?')) personStore.deletePerson(props.person.personId, true)
}

function goToPerson() {
  router.push(`/person/${props.person.personId}`)
}

</script>
