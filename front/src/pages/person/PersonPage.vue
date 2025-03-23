<template>
  <div>
    <Loader v-if="personStore.person?.loading" />
    <div v-else>
      <!-- Name and date section -->
      <section>
        <div v-if="personStore.person?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ dateToNiceDate(personStore.person?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="personStore.person.data.name" type="text"
            class="rounded-lg bg-dark text-light text-2xl w-full" placeholder="Person name" />
        </div>
      </section>

      <!-- Description & Mood section -->
      <section>
        <textarea v-model="personStore.person.data.description" class="w-full p-2 rounded-lg bg-gray-dark text-light"
          rows="10" placeholder="..."> </textarea>
      </section>
    </div>

    <BottomActions :createButton="!route.params.personId" :updateButton="!!route.params.personId"
      :deleteButton="!!route.params.personId" @triggerCreate="manualCreation" @triggerUpdate="manualUpdate"
      @triggerDelete="manualDeletion" />
  </div>
</template>

<script setup>
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/BottomActionsComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { usePersonStore } from '@/stores/person'
import { notif } from '@/helpers/notif.js'
import { dateToNiceDate } from '@/helpers/functions.js'
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'

import debounce from 'lodash/debounce'

const route = useRoute()
const router = useRouter()
const personStore = usePersonStore()

const watched = ref(0)

function loadOrInitPerson() {
  if (route.params.personId) {
    personStore.fetchPerson(route.params.personId)
  } else {
    personStore.initPerson()
    if (route.query.name) personStore.person.data.name = route.query.name // From the search page
  }
  watched.value = 0
}

function valid() {
  if (!personStore.person.data.userId) return 'User is required, please reload the page'
  if (!personStore.person.data.name) return 'Name is required'
  return false
}

function manualDeletion() {
  personStore.deletePerson(personStore.person.data.personId, true)
  router.push('/people')
}

function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    personStore.createPerson(personStore.person.data, true)
    router.push('/people')
  }
}

function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
  } else {
    personStore.updatePerson(personStore.person.data, true)
    router.push('/people')
  }
}

const debouncedUpdate = debounce(() => {
  if (route.params.personId) {
    const error = valid()
    if (!error) {
      personStore.updatePerson(personStore.person.data)
    }
  }
}, 10000)

onMounted(() => {
  loadOrInitPerson()
})

onBeforeUnmount(() => {
  if (route.params.personId) personStore.updatePerson(personStore.person.data)
});

watch(() => route.params.personId, () => {
  loadOrInitPerson()
})

watch(() => personStore.person.data,
  () => {
    watched.value += 1
    if (watched.value <= 2) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);
</script>