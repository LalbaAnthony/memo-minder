<template>
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
</template>

<script setup>
import ProgressBar from '@/components/ProgressBarComponent.vue'
import { computed } from 'vue'
import { ageFromDate } from "@/helpers/helpers.js"

const props = defineProps({
    birthdate: {
        type: String,
        required: true
    }
})

const childhoodPercentage = computed(() => {
    const yearStart = 0
    const yearEnd = 18
    const percent = ((ageFromDate(props.birthdate) - yearStart) / yearEnd) * 100
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
})

const adulthoodPercentage = computed(() => {
    const yearStart = 18
    const yearEnd = 64
    const percent = ((ageFromDate(props.birthdate) - yearStart) / yearEnd) * 100
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
})

const oldhoodPercentage = computed(() => {
    const yearStart = 64
    const yearEnd = 80
    const percent = ((ageFromDate(props.birthdate) - yearStart) / yearEnd) * 100
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
})

const lifeTimePercentage = computed(() => {
    const yearStart = 0
    const yearEnd = 80
    const percent = ((ageFromDate(props.birthdate) - yearStart) / yearEnd) * 100
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
});

</script>

<style scoped>
.progress-bars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 0 3rem;
}
</style>