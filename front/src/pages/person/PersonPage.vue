<template>
  <div>
    <TopActions :goBackButton="true" />

    <Loader v-if="personStore.item.loading" />
    <div v-else>
      <!-- Name and date section -->
      <section>
        <div v-if="personStore.item?.data?.updatedAt" class="mb-4">
          <span class="text-gray">Updated the {{ dateToNiceDate(personStore.item?.data?.updatedAt) }}</span>
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <input v-model="personStore.item.data.name" type="text"
            class="rounded-lg bg-dark placeholder-gray text-light text-2xl w-full" placeholder="Person name" />
        </div>
      </section>

      <!-- Description & Mood section -->
      <section>
        <textarea v-model="personStore.item.data.description"
          class="w-full p-2 rounded-lg bg-gray-dark placeholder-gray-light text-light" rows="10"
          placeholder="..."> </textarea>
      </section>

      <!-- Pills section -->
      <section>
        <h4 class="text-lg font-semibold text-light mb-4">Linked items</h4>
        <LinkedItemsWrapper :item="personStore.item.data" :parentType="'person'"
          :childrenTypes="['season', 'music', 'event']" />
      </section>
    </div>

    <BottomActions :createButton="!route.params.personId" :updateButton="!!route.params.personId"
      :deleteButton="!!route.params.personId" @triggerCreate="manualCreation" @triggerUpdate="manualUpdate"
      @triggerDelete="manualDeletion" />
  </div>
</template>

<script setup>
import Loader from '@/components/LoaderComponent.vue'
import TopActions from '@/components/actions/TopActionsComponent.vue'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import LinkedItemsWrapper from '@/components/fields/LinkedItemsWrapperComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { usePersonStore } from '@/stores/person'
import { notif } from '@/composables/notif.js'
import { dateToNiceDate } from '@/composables/helpers.js'
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import debounce from '@/composables/debounce.js'

const route = useRoute()
const router = useRouter()
const personStore = usePersonStore()

const watched = ref(0)

function loadOrInitPerson() {
  if (route.params.personId) {
    personStore.fetchItem(route.params.personId)
  } else {
    personStore.initItem()
    if (route.query.name) personStore.item.data.name = route.query.name // From the search page
  }
  watched.value = 0
  personStore.item.loading = false
}

function valid() {
  if (!personStore.item.data.userId) return 'User is required, please reload the page'
  if (!personStore.item.data.name) return 'Name is required'
  return false
}

function manualDeletion() {
  personStore.deleteItem(personStore.item.data.personId, true)
  router.push('/people')
}

async function manualCreation() {
  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await personStore.createItem(personStore.item.data, true)
  if (success) router.push('/people')
}

async function manualUpdate() {
  debouncedUpdate.cancel()

  const error = valid()
  if (error) {
    notif.notify(error, 'error')
    return
  }

  const success = await personStore.updateItem(personStore.item.data, true)
  if (success) router.push('/people')
}

const debouncedUpdate = debounce(() => {
  if (route.params.personId) {
    const error = valid()
    if (!error) {
      personStore.updateItem(personStore.item.data)
    }
  }
}, 10000)

onMounted(() => {
  loadOrInitPerson()
})

onBeforeUnmount(() => {
  if (route.params.personId) personStore.updateItem(personStore.item.data)
});

watch(() => route.params.personId, () => {
  loadOrInitPerson()
})

watch(() => personStore.item.data,
  () => {
    watched.value += 1
    if (watched.value <= 2) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);
</script>