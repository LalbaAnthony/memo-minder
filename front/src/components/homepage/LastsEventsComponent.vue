<template>
    <section>
        <h2 class="text-xl font-bold">Lasts events added</h2>
        <div class="my-4">
            <Loader v-if="eventStore.items.loading" position="static" />
            <div v-else>
                <Grid v-if="eventStore.items?.data?.length > 0" :items="eventStore.items.data">
                    <template #item="{ item }">
                        <Event :event="item" />
                    </template>
                </Grid>
                <router-link to="/events/add" :class="['mt-6 flex items-center justify-center rounded-lg border-dashed border-2 cursor-pointer border-gray transition-all transition-200',
                    eventStore.items?.data?.length === 0 ? 'p-16' : 'py-1.5']">
                    <span v-if="eventStore.items?.data?.length === 0" class="text-light"> Add your first
                        event</span>
                    <PlusIcon class="arrow size-8 text-gray-light ml-2 transition ease-in-out duration-300 transform" />
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import Grid from '@/components/GridComponent.vue'
import Event from '@/components/event/EventItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const eventStore = useEventStore()

onMounted(() => {
    if (authStore?.user?.homePageEnableLasts) {
        eventStore.fetchItems({
            sort: [{ order: 'DESC', orderBy: 'createdAt' }],
            perPage: 3
        })
    }
})

</script>