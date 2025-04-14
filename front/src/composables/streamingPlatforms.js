export const streamingPlatforms = {
    spotify: {
        slug: 'spotify',
        label: 'Spotify',
        regex: /(spotify)/i,
        links: {
            home: 'https://open.spotify.com',
            search: 'https://open.spotify.com/search/',
        },
    },
    apple: {
        slug: 'apple',
        label: 'Apple',
        regex: /(apple)/i,
        links: {
            home: 'https://music.apple.com/',
            search: 'https://music.apple.com/search?term=',
        },
    },
    youtube: {
        slug: 'youtube',
        label: 'Youtube',
        regex: /(youtube|youtu.be)/i,
        links: {
            home: 'https://www.youtube.com/',
            search: 'https://www.youtube.com/results?search_query=',
        },
    },
    deezer: {
        slug: 'deezer',
        label: 'Deezer',
        regex: /(deezer)/i,
        links: {
            home: 'https://www.deezer.com/',
            search: 'https://www.deezer.com/search/',
        },
    },
    default: {
        slug: 'default',
        label: 'Default',
        regex: null,
        links: {
            home: null,
            search: 'https://www.google.com/search?q=',
        },
    },
}