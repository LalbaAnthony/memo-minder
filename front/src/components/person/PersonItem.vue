<template>
  <div class="flex flex-row justify-between border-2 border-gray rounded-[8px] bg-dark-light h-full">
    <!-- Card -->
    <div
      class="flex-1 flex justify-between rounded-l-[6px] p-5 cursor-pointer transition-colors duration-200">
      <!-- Infos -->
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-2xl font-bold">{{ props?.person?.name }}</h1>
        <p class="text-gray-light">{{ threeDotString(props?.person?.description) }}</p>
      </div>
      <!-- None -->
      <div>
      </div>
    </div>
    <!-- Button -->
    <div class="flex justify-center items-center p-4 bg-gray-light cursor-pointer rounded-r-[6px]"
      @click="deletePerson()">
      <TrashIcon class="size-6" />
    </div>
  </div>
</template>

<script setup>
import { usePersonStore } from '@/stores/person'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { threeDotString } from '@/helpers/functions'

const personStore = usePersonStore()

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})

function deletePerson() {
  if (confirm('Are you sure you want to delete this person?')) personStore.deletePerson(props.person.personId)
}

</script>
