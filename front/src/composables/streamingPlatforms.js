import { shallowRef } from 'vue'
import AppleIcon from '@/icons/AppleIcon.vue'
import DeezerIcon from '@/icons/DeezerIcon.vue'
import DefaultIcon from '@/icons/DefaultIcon.vue'
import SpotifyIcon from '@/icons/SpotifyIcon.vue'
import YoutubeIcon from '@/icons/YoutubeIcon.vue'

export const streamingPlatforms = {
    spotify: {
        slug: 'spotify',
        label: 'Spotify',
        icon: shallowRef(SpotifyIcon),
        regex: /(spotify)/i,
        links: {
            home: 'https://open.spotify.com',
            search: 'https://open.spotify.com/search/',
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
        },
    },
}