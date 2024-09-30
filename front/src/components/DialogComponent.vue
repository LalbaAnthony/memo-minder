<template>
  <div>
    <!-- dialog -->
    <TransitionRoot :show="showDialog">
      <!-- Hide at click outside -->
      <TransitionChild v-click-outside="() => showDialog = false" as="div"
        enter="transition ease-in-out duration-300 transform" enter-from="translate-y-full" enter-to="translate-y-0"
        leave="transition ease-in-out duration-300 transform" leave-from="translate-y-0" leave-to="translate-y-full"
        class="fixed bottom-0 left-0 h-64 w-full bg-dark-light z-30 border-t border-gray">

        <!-- Close dialog -->
        <div class="flex justify-end p-4">
          <XMarkIcon class="size-8 text-gray-light cursor-pointer" @click.stop="showDialog = false" />
        </div>

        <!-- Dialog content -->
        <div class="flex flex-col justify-center items-center w-full mx-6">
          <h2 class="text-xl font-bold"> {{ text }} </h2>
        </div>

        <div class="flex flex-col-reverse sm:flex-row items-center justify-center h-48 gap-4">
          <div
            class="flex justify-center items-center bg-dark-light text-light p-2 rounded-lg min-w-48 cursor-pointer hover:bg-gray-dark"
            @click="cancel">
            Cancel
          </div>
          <div class="flex justify-center items-center bg-primary text-dark-light p-2 rounded-lg min-w-48 cursor-pointer"
            @click="confirm">
            Confirm
          </div>
        </div>

      </TransitionChild>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import vClickOutside from '@/directives/clickOutside.js'

const props = defineProps({
  text: {
    type: String,
    default: 'Are you sure you want to perform this action?',
    required: false,
  },
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const showDialog = ref(props.show)

const emit = defineEmits(['confirm', 'cancel'])

function confirm() {
  showDialog.value = false
  emit('confirm', true)
}

function cancel() {
  showDialog.value = false
  emit('cancel', true)
}


</script>