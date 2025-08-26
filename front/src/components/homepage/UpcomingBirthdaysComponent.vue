<template>
    <section>
        <h2 class="text-xl font-bold">Upcoming birthdays</h2>
        <div class="my-4">
            <Loader v-if="personStore.items.loading" position="static" />
            <div v-else>
                <Grid v-if="personStore.items?.data?.length > 0" :items="personStore.items.data"
                    noItemPosition="static">
                    <template #item="{ item }">
                        <Person :person="item" />
                    </template>
                </Grid>
                <div v-else class="text-center text-gray-light py-8">
                    No upcoming birthdays
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Grid from '@/components/GridComponent.vue'
import Person from '@/components/person/PersonItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { usePersonStore } from '@/stores/person'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const personStore = usePersonStore()

onMounted(() => {
    if (authStore?.user?.homePageEnableUpcomings) {
        personStore.fetchUpcomingBirthdays({
            days: 31,
            perPage: 2
        })
    }
})

</script>