export const streamingPlatforms = {
    spotify: {
        slug: 'spotify',
        label: 'Spotify',
        regex: /(spotify)/i,
        colors: {
            color: '#1DD05D',
            background: '#080808',
        },
        links: {
            home: 'https://open.spotify.com',
            search: 'https://open.spotify.com/search/',
        },
    },
    apple: {
        slug: 'apple',
        label: 'Apple',
        regex: /(apple)/i,
        colors: {
            color: '#FFFFFF',
            background: '#FB3D55',
        },
        links: {
            home: 'https://music.apple.com/',
            search: 'https://music.apple.com/search?term=',
        },
    },
    youtube: {
        slug: 'youtube',
        label: 'Youtube',
        regex: /(youtube|youtu.be)/i,
        colors: {
            color: '#FFFFFF',
            background: '#FF0808',
        },
        links: {
            home: 'https://www.youtube.com/',
            search: 'https://www.youtube.com/results?search_query=',
        },
    },
    deezer: {
        slug: 'deezer',
        label: 'Deezer',
        regex: /(deezer)/i,
        colors: {
            color: '#A238FF',
            background: '#080808',
        },
        links: {
            home: 'https://www.deezer.com/',
            search: 'https://www.deezer.com/search/',
        },
    },
}