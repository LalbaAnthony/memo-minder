<template>
    <section>
        <div class="my-4">
            <div class="progress-bars-grid">
                <div>
                    <h4 class="text-l font-bold">Spent childhood</h4>
                    <ProgressBar :value="childhoodPercentage" />
                </div>
                <div>
                    <h4 class="text-l font-bold">Spent adulthood</h4>
                    <ProgressBar :value="adulthoodPercentage" />
                </div>
                <div>
                    <h4 class="text-l font-bold">Spent oldhood</h4>
                    <ProgressBar :value="oldhoodPercentage" />
                </div>
                <div>
                    <h4 class="text-l font-bold">Total spent</h4>
                    <ProgressBar :value="lifeTimePercentage" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import ProgressBar from '@/components/ProgressBarComponent.vue'
import { computed } from 'vue'
import { ageFromDate } from '@/composables/helpers'

const props = defineProps({
    birthdate: {
        type: String,
        required: true
    }
})

const age = computed(() => ageFromDate(props?.birthdate || '2000-01-01'))

const childhoodPercentage = computed(() => {
    const yearStart = 0
    const yearEnd = 18
    if (age.value >= yearEnd) return 100
    const percent = ((age.value - yearStart) / yearEnd) * 100
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
})

const adulthoodPercentage = computed(() => {
    const yearStart = 18
    const yearEnd = 64
    if (age.value >= yearEnd) return 100
    const percent = ((age.value - yearStart) / yearEnd) * 100
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
})

const oldhoodPercentage = computed(() => {
    const yearStart = 64
    const yearEnd = 80
    if (age.value >= yearEnd) return 100
    const percent = ((age.value - yearStart) / yearEnd) * 100
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
})

const lifeTimePercentage = computed(() => {
    const yearStart = 0
    const yearEnd = 80
    if (age.value >= yearEnd) return 100
    const percent = ((age.value - yearStart) / yearEnd) * 100
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
});

</script>

<style scoped>
.progress-bars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    grid-gap: 0 3rem;
}
</style>