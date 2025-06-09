import { shallowRef } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppleIcon from '@/icons/AppleIcon.vue'
import DeezerIcon from '@/icons/DeezerIcon.vue'
import DefaultIcon from '@/icons/DefaultIcon.vue'
import SpotifyIcon from '@/icons/SpotifyIcon.vue'
import YoutubeIcon from '@/icons/YoutubeIcon.vue'
import { isValidUrl } from '@/composables/helpers'

const authStore = useAuthStore()

const allStreamingPlatforms = {
    spotify: {
        slug: 'spotify',
        label: 'Spotify',
        icon: shallowRef(SpotifyIcon),
        regex: /(spotify)/i,
        links: {
            home: 'https://open.spotify.com',
            search: 'https://open.spotify.com/search/',
            placeholder: 'https://open.spotify.com/track/...',
        },
    },
    apple: {
        slug: 'apple',
        label: 'Apple',
        icon: shallowRef(AppleIcon),
        regex: /(apple)/i,
        links: {
            home: 'https://music.apple.com/',
            search: 'https://music.apple.com/search?term=',
            placeholder: 'https://music.apple.com/album/...',
        },
    },
    youtube: {
        slug: 'youtube',
        label: 'Youtube',
        icon: shallowRef(YoutubeIcon),
        regex: /(youtube|youtu.be)/i,
        links: {
            home: 'https://www.youtube.com/',
            search: 'https://www.youtube.com/results?search_query=',
            placeholder: 'https://www.youtube.com/watch?v=...',
        },
    },
    deezer: {
        slug: 'deezer',
        label: 'Deezer',
        icon: shallowRef(DeezerIcon),
        regex: /(deezer)/i,
        links: {
            home: 'https://www.deezer.com/',
            search: 'https://www.deezer.com/search/',
            placeholder: 'https://www.deezer.com/track/...',
        },
    },
    default: {
        slug: 'default',
        label: 'None',
        icon: shallowRef(DefaultIcon),
        regex: null,
        links: {
            home: null,
            search: 'https://www.google.com/search?q=',
            placeholder: 'https://example.com/music/...',
        },
    },
}

function findStreamingPlatform(string) {
    let found = null

    Object.keys(allStreamingPlatforms).forEach((key) => {
        const regex = allStreamingPlatforms[key].regex
        if (string?.match(regex)) {
            found = key
        }
    })

    return allStreamingPlatforms?.[found || 'default'] || {}
}

function userStreamingPlatform() {
    return allStreamingPlatforms?.[authStore.user?.streamingPlatform || 'default'] || {}
}

function smartStreamingLink(music = {}) {
    let url = ''

    let terms = []
    if (music?.artist) terms.push(music?.artist)
    if (music?.title) terms.push(music?.title)

    // If there is a link, just using it
    if (!url && music?.streamingLink) {
        if (isValidUrl(music?.streamingLink)) url = music?.streamingLink
    }

    // If still no url, use the search link of the streaming platform of the url (used for badly formatted links)
    const streamingPlatform = findStreamingPlatform(music?.streamingLink)
    if (!url && terms?.length > 0 && streamingPlatform && streamingPlatform?.links?.search) {
        const builtUrl = `${streamingPlatform.links.search}${terms.join(' ')}`
        if (isValidUrl(builtUrl, true)) url = builtUrl
    }

    // If still no url, use the search link of the streaming platform of the user
    if (!url && terms?.length > 0 && authStore.user.streamingPlatform && userStreamingPlatform) {
        const builtUrl = `${userStreamingPlatform().links.search}${terms.join(' ')}`
        if (isValidUrl(builtUrl, true)) url = builtUrl
    }

    return encodeURI(url)
}

export {
    allStreamingPlatforms,
    findStreamingPlatform,
    userStreamingPlatform,
    smartStreamingLink,
}