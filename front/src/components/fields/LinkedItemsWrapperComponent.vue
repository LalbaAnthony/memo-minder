<template>
  <LinkedItemsList :item="props.item" @show-picker="setShowPicker(true)"
    @delete="(id, type) => { deleteItem(id, type) }" />

  <LinkedItemsPicker :childrenTypes="props.childrenTypes" :show="showPicker" @close-picker="setShowPicker(false)"
    @add="(object) => { addItem(object) }" />
</template>

<script setup>
import { ref } from 'vue'
import LinkedItemsList from '@/components/fields/LinkedItemsListComponent.vue'
import LinkedItemsPicker from '@/components/fields/LinkedItemsPickerComponent.vue'
import { notif } from '@/composables/notif'
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

function getChildrenPk(type) {
  switch (type) {
    case 'event':
      return 'eventId'
    case 'music':
      return 'musicId'
    case 'person':
      return 'personId'
    case 'season':
      return 'seasonId'
    default:
      throw new Error(`Unknown child type: ${type}`)
  }
}

function addItem(object) {
  const path = getChildrenPath(object.type)
  const pk = getChildrenPk(object.type)

  if (store.value.item.data[path].some(item => item[pk] === object.data[pk])) {
    notif.notify('This item is already linked to this item', 'error')
    return
  }

  store.value.item.data[path].push(object.data)
}

function deleteItem(id, type) {
  const path = getChildrenPath(type)
  const pk = getChildrenPk(type)

  store.value.item.data[path] = store.value.item.data[path].filter(item => item[pk] !== id)
}

function goMid() {
  window.scrollBy({
    top: window.innerHeight * 0.5,
    behavior: 'smooth'
  });
}

function setShowPicker(value) {
  showPicker.value = value
  if (value === true) goMid()
}

</script>
