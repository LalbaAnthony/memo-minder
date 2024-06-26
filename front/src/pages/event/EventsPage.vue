<template>
  <div>
    <SortFilter />
    <Loader v-if="eventStore.events.loading" />
    <Grid v-else :items="eventStore.events.data">
      <template #item="{ item }">
        <Event :event="item" />
      </template>
    </Grid>
    <BottomActions/>
  </div>
</template>

<script setup>
import SortFilter from '@/components/SortFilterComponent.vue'
import Grid from '@/components/GridComponent.vue'
import Event from '@/components/event/EventItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import BottomActions from '@/components/BottomActionsComponent.vue'
import { useRoute } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { watch } from 'vue'

const route = useRoute()
const eventStore = useEventStore()

async function loadEvents() {
  eventStore.fetchEvents({
    sort: route.query.sort ? [{
      order_by: route.query.sort?.split('-')[0] || null,
      order: route.query.sort?.split('-')[1] || null
    }] : [
      { order: 'ASC', order_by: 'title' },
    ]
  })
}

// Fetch events on mount
if (!eventStore.events.data.length) loadEvents()

// Watch route for changes
watch(() => route.query, loadEvents)

</script>