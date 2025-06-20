<template>
    <section>
        <h2 class="text-xl font-bold">Lasts seasons added</h2>
        <div class="my-4">
            <Loader v-if="seasonStore.items.loading" position="static" />
            <div v-else>
                <Grid v-if="seasonStore.items?.data?.length > 0" :items="seasonStore.items.data">
                    <template #item="{ item }">
                        <Season :season="item" />
                    </template>
                </Grid>
                <router-link to="/seasons/add" :class="['mt-6 flex items-center justify-center rounded-lg border-dashed border-2 cursor-pointer border-gray transition-all transition-200',
                    seasonStore.items?.data?.length === 0 ? 'p-16' : 'py-1.5']">
                    <span v-if="seasonStore.items?.data?.length === 0" class="text-light"> Add your first
                        season</span>
                    <PlusIcon class="arrow size-8 text-gray-light ml-2 transition ease-in-out duration-300 transform" />
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import Grid from '@/components/GridComponent.vue'
import Season from '@/components/season/SeasonItem.vue'
import Loader from '@/components/LoaderComponent.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/auth'
import { useSeasonStore } from '@/stores/season'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const seasonStore = useSeasonStore()

onMounted(() => {
    if (authStore?.user?.homePageEnableLasts) {
        seasonStore.fetchItems({
            sort: [{ order: 'DESC', orderBy: 'createdAt' }],
            perPage: 3
        })
    }
})

</script>