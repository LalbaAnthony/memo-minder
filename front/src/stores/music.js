import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api';

export const useMusicStore = defineStore('music', {
  state: () => ({
    musics: {
      loading: true,
      data: [],
      pagination: { page: 1, perPage: 10, total: 1 },
    },
  }),

  actions: {
    async fetchMusics() {
      // Loading
      this.musics.loading = true

      // Data
      this.musics.data = []

      // const resp = await get('musics');
      // this.musics.data = resp.data || [];

      // Fake data fetch for demo
      setTimeout(() => {
        this.musics.data = [
          { title: 'Hasarder', artist: 'Lompal', releaseDate: '2022-09-16', streamingLink: 'https://open.spotify.com/track/6V40xLcDlYwZpz3oKIVNhL?si=e5c24c7bb393460c' },
          { title: 'To live is to die', artist: 'Metallica', releaseDate: '1988-07-07', streamingLink: 'https://www.youtube.com/watch?v=k7_hwgD1ugg' },
          { title: 'The Unforgiven', artist: 'Metallica', releaseDate: '1991-08-21', streamingLink: 'https://www.youtube.com/watch?v=Ckom3gf57Yw' },
          { title: 'Nothing Else Matters', artist: 'Metallica', releaseDate: '1992-04-20', streamingLink: 'https://www.youtube.com/watch?v=Tj75Arhq5ho' },
          { title: 'Enter Sandman', artist: 'Metallica', releaseDate: '1991-07-29', streamingLink: 'https://www.youtube.com/watch?v=CD-E-LDc384' },
          { title: 'Master of Puppets', artist: 'Metallica', releaseDate: '1986-02-24', streamingLink: 'https://www.youtube.com/watch?v=xnKhsTXoKCI' },
          { title: 'One', artist: 'Metallica', releaseDate: '1988-01-10', streamingLink: 'https://www.youtube.com/watch?v=WM8bTdBs-cw' },
          { title: 'Fade to Black', artist: 'Metallica', releaseDate: '1984-11-23', streamingLink: 'https://www.youtube.com/watch?v=WEQnzs8wl6E' },
          { title: 'Ride the Lightning', artist: 'Metallica', releaseDate: '1984-07-27', streamingLink: 'https://www.youtube.com/watch?v=5s7_WbiR79E' },
          { title: 'Battery', artist: 'Metallica', releaseDate: '1986-08-25', streamingLink: 'https://www.youtube.com/watch?v=9Dq5b9FzJdI' },
          { title: 'The Four Horsemen', artist: 'Metallica', releaseDate: '1983-07-25', streamingLink: 'https://www.youtube.com/watch?v=2Y9u9k8t5W4' },
          { title: 'Seek & Destroy', artist: 'Metallica', releaseDate: '1983-07-25', streamingLink: 'https://www.youtube.com/watch?v=2Y9u9k8t5W4' },
        ]
        this.musics.loading = false
      }, 1000);
    },
  },
})
