<template>
  <LinkedItemsList :item="props.item" @show-picker="showPicker = true"
    @delete="(id, type) => { deleteItem(id, type) }" />

  <LinkedItemsPicker :childrenTypes="props.childrenTypes" :show="showPicker" @close-picker="showPicker = false"
    @add="(object) => { addItem(object) }" />
</template>

<script setup>
import { ref } from 'vue'
import LinkedItemsList from '@/components/fields/LinkedItemsListComponent.vue'
import LinkedItemsPicker from '@/components/fields/LinkedItemsPickerComponent.vue'
import { notif } from '@/composables/notif.js'
import { useEventStore } from '@/stores/event'
import { useMusicStore } from '@/stores/music'
import { usePersonStore } from '@/stores/person'
import { useSeasonStore } from '@/stores/season'
import { computed } from 'vue'

const eventStore = useEventStore()
const musicStore = useMusicStore()
const personStore = usePersonStore()
const seasonStore = useSeasonStore()

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  parentType: {
    type: String,
    required: true,
  },
  childrenTypes: {
    type: Array,
    required: false,
    default: () => {
      return ['event', 'music', 'person', 'season']
    }
  }
})

const showPicker = ref(false)

const store = computed(() => {
  switch (props.parentType) {
    case 'event':
      return eventStore
    case 'music':
      return musicStore
    case 'person':
      return personStore
    case 'season':
      return seasonStore
    default:
      throw new Error(`Unknown parent type: ${props.parentType}`)
  }
})

function getChildrenPath(type) {
  switch (type) {
    case 'event':
      return 'events'
    case 'music':
      return 'musics'
    case 'person':
      return 'people'
    case 'season':
      return 'seasons'
    default:
      throw new Error(`Unknown child type: ${type}`)
  }
}

function addItem(object) {
  if (store.value[props.parentType].data[getChildrenPath(object.type)].some(item => item[object.type + 'Id'] === object.data[object.type + 'Id'])) {
    notif.notify('This item is already linked to this ' + props.parentType, 'error')
    return
  }

  store.value[props.parentType].data[getChildrenPath(object.type)].push(object.data)
}

function deleteItem(id, type) {
  store.value[props.parentType].data[getChildrenPath(type)] = store.value[props.parentType].data[getChildrenPath(type)].filter(item => item[type + 'Id'] !== id)
}

</script>
