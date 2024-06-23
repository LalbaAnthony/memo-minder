<template>
  <TransitionRoot :show="percentage > 0" class="w-full">
    password: {{ password }}<br>
    percentage: {{ percentage }}<br>
    color: {{ color }}<br>
    <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="opacity-0 scale-95"
      enter-to="opacity-100 scale-100" leave="transition ease-in-out duration-300 transform"
      leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
      <div class="overflow-hidden h-4 my-2 flex rounded-full bg-dark-gray">
        <div :style="`width: ${percentage}%`"
          :class="['flex flex-col text-left justify-center pl-3', color]">
        </div>
      </div>
    </TransitionChild>
  </TransitionRoot>
</template>

<script setup>
import { computed } from 'vue'
import { missingElementsPassword } from '@/helpers/helpers.js'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'

const props = defineProps({
  password: {
    type: String,
    required: false
  }
})

const percentage = computed(() => {
  const p = Math.abs(missingElementsPassword(props.password).length - 5) * 20
  return props.password ? p : 0
})

const color = computed(() => {
  let hexa = ''
  switch (true) {
    case percentage.value < 20:
      hexa = '#dc2626'
      break
    case percentage.value < 40:
      hexa = '#f59e0b'
      break
    case percentage.value < 60:
      hexa = '#fbbf24'
      break
    case percentage.value < 80:
      hexa = '#34d399'
      break
    case percentage.value < 100:
      hexa = '#047857'
      break
    default:
      hexa = '#047857'
      break
  }

  return `bg-[${hexa}]`
})
</script>