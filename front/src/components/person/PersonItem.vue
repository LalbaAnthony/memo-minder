<template>
  <div class="flex flex-row justify-between border-2 border-gray rounded-[8px] bg-dark-light h-full overflow-hidden">
    <div class="flex-1 flex justify-left rounded-l-[6px] p-5 cursor-pointer transition-colors duration-200"
      @click="goToPerson()">
      <div class="flex items-center justify-center gap-4 pr-4">
        <UserIcon class="size-10" />
      </div>
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-2xl font-bold">{{ limitString(props?.person?.name) }}</h1>
        <p v-if="remainingsUntilBirthday > props.birthdayScope" class="text-gray-light">{{
          limitString(props?.person?.description) }}</p>
        <p v-if="remainingsUntilBirthday <= props.birthdayScope" class="text-gray-light inline-flex items-end gap-1">
          <CalendarDaysIcon class="size-6 text-primary-light" />
          <span v-if="remainingsUntilBirthday > 1">
            Birthday in {{ remainingsUntilBirthday }} days
          </span>
          <span v-if="remainingsUntilBirthday === 1">
            Birthday tomorrow
          </span>
          <span v-if="remainingsUntilBirthday === 0">
            Birthday today!
          </span>
        </p>
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
import { limitString } from '@/composables/beautify'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
import { daysFromBirthday } from '@/composables/helpers'
import { computed } from 'vue'

const router = useRouter()

const personStore = usePersonStore()

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
  birthdayScope: {
    type: Number,
    default: 31,
  },
})


const remainingsUntilBirthday = computed(() => {
  return daysFromBirthday(props.person.birthdate)
})

function deletePerson() {
  if (confirm('Are you sure you want to delete this person?')) personStore.deleteItem(props.person.personId, true)
}

function goToPerson() {
  router.push(`/person/${props.person.personId}`)
}

</script>
