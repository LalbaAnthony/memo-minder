<template>
  <div class="flex flex-row justify-between border-2 border-gray rounded-[8px] bg-dark-light h-full overflow-hidden">
    <div class="flex-1 flex justify-left rounded-l-[6px] p-5 cursor-pointer transition-colors duration-200"
      @click="goToPerson()">
      <div class="flex items-center justify-center gap-4 pr-4">
        <UserIcon class="size-10" />
      </div>
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-2xl font-bold">{{ threeDotsString(props?.person?.name) }}</h1>
        <p v-if="daysFromBirthday(props?.person?.birthdate) >= 31" class="text-gray-light">{{
          threeDotsString(props?.person?.description) }}</p>
        <Pill v-if="daysFromBirthday(props?.person?.birthdate) < 31"
          :text="`Birthday in ${daysFromBirthday(props?.person?.birthdate)} days`" type="event" class="mt-1" />
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
import { UserIcon } from '@heroicons/vue/24/solid'
import { threeDotsString } from '@/composables/helpers'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import Pill from '@/components/PillComponent.vue'
import { daysFromBirthday } from '@/composables/helpers'

const router = useRouter()

const personStore = usePersonStore()

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})

function deletePerson() {
  if (confirm('Are you sure you want to delete this person?')) personStore.deleteItem(props.person.personId, true)
}

function goToPerson() {
  router.push(`/person/${props.person.personId}`)
}

</script>
