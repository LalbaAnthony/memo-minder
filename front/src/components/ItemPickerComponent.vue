<template>
  <TransitionRoot appear :show="props.show" as="template">
    <Dialog as="div" @close="emit('close', true)" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 opacity-90 bg-dark" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-light-dark p-6 transition-all">

              <div class="flex items-center justify-between gap-3">
                <MagnifyingGlassIcon class="size-10 text-light-gray hidden sm:block" />
                <input type="text" class="w-full p-2 rounded-lg bg-dark-gray text-light" placeholder="Search..." />
                <XMarkIcon class="size-10 text-light-gray cursor-pointer"
                  @click.stop="emit('close', true)" />
              </div>

      
              <Grid :items="results">
                <template #item="{ item }">
                  <!-- <div class="flex items-center justify-between gap-3 p-2 rounded-lg bg-dark-gray text-light">
                    <span>{{ item.title }}</span>
                    <button @click="emit('close', true)" class="text-light-gray hover:text-light">Select</button>
                  </div> -->
                </template>
              </Grid>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel
} from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import Grid from '@/components/GridComponent.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
})

const emit = defineEmits(['close'])

</script>
