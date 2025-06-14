import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const allLanguages = {
    'en-US': {
        code: 'en-US',
        date: 'en-US',
        label: 'English (US)',
        flag: {
            html: '&#127482;&#127480;',
            emb: '🇺🇸',
        },
    },
    'en-GB': {
        code: 'en-GB',
        date: 'en-GB',
        label: 'English (UK)',
        flag: {
            html: '&#127468;&#127463;',
            emb: '🇬🇧',
        },
    }
}

function userLanguage() {
    return allLanguages?.[authStore.user?.language || 'en-US'] || {}
}

export {
    allLanguages,
    userLanguage,
}