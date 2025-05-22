import { shallowRef } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppleIcon from '@/icons/AppleIcon.vue'
import DeezerIcon from '@/icons/DeezerIcon.vue'
import DefaultIcon from '@/icons/DefaultIcon.vue'
import SpotifyIcon from '@/icons/SpotifyIcon.vue'
import YoutubeIcon from '@/icons/YoutubeIcon.vue'

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
        label: 'Default',
        icon: shallowRef(DefaultIcon),
        regex: null,
        links: {
            home: null,
            search: 'https://www.google.com/search?q=',
            placeholder: 'https://example.com/music/song/...',
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
    const streamingPlatform = findStreamingPlatform(music?.streamingLink)

    // If the is a link, just using it
    if (!url && music?.streamingLink) {
        url = music?.streamingLink
    }

    // If no link, use the search link of the streaming platform of the use
    if (!url && authStore.user.streamingPlatform && userStreamingPlatform) {
        url = userStreamingPlatform().links.search
        if (music?.title) url += `${music?.title}`
        if (music?.artist) url += ` ${music?.artist}`
    }

    // If still no url, use the default search link
    if (!url && streamingPlatform.value?.links?.search && music?.title) url = `${streamingPlatform.value.links.search}${music?.title} ${music?.artist}`

    return encodeURI(url)
}

export {
    allStreamingPlatforms,
    findStreamingPlatform,
    userStreamingPlatform,
    smartStreamingLink,
}