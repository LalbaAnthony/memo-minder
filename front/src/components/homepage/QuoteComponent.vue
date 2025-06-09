<template>
    <section>
        <h2 class="text-xl font-bold">Quote</h2>
        <div class="my-4">
            <p class="my-2">
                <span class="text-lg">"</span>{{ quoteStore.quote.data.quote }}<span class="text-lg">"</span>
            </p>
            <p class="text-right text-gray-light">{{ quoteStore.quote.data.author }}</p>
        </div>
    </section>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useQuoteStore } from '@/stores/quote'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const quoteStore = useQuoteStore()

onMounted(() => {
    if (authStore?.user?.homePageEnableQuote) quoteStore.fetchQuoteIfTooOld()
})

</script>