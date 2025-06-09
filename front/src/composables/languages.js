import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const allLanguages = {
    'en-US': {
        code: 'en-US',
        date: 'en-US',
        label: 'English (US)'
    },
    'en-GB': {
        code: 'en-GB',
        date: 'en-GB',
        label: 'English (UK)'
    }
}

function userLanguage() {
    return allLanguages?.[authStore.user?.language || 'en-US'] || {}
}

export {
    allLanguages,
    userLanguage,
}