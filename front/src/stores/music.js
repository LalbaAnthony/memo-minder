import { defineStore } from 'pinia'
import { get, post, put, del } from '@/helpers/api';

export const useMusicStore = defineStore('music', {
  state: () => ({
    musics: {
      loading: true,
      data: [],
      pagination: { page: 1, per_page: 10, total: 1 },
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
          { title: 'Hasarder', artist: 'Lompal', release_date: '2022-09-16', streaming_link: 'https://open.spotify.com/track/6V40xLcDlYwZpz3oKIVNhL?si=e5c24c7bb393460c' },
          { title: 'To live is to die', artist: 'Metallica', release_date: '1988-07-07', streaming_link: 'https://www.youtube.com/watch?v=k7_hwgD1ugg' },
          { title: 'The Unforgiven', artist: 'Metallica', release_date: '1991-08-21', streaming_link: 'https://www.youtube.com/watch?v=Ckom3gf57Yw' },
          { title: 'Nothing Else Matters', artist: 'Metallica', release_date: '1992-04-20', streaming_link: 'https://www.youtube.com/watch?v=Tj75Arhq5ho' },
          { title: 'Enter Sandman', artist: 'Metallica', release_date: '1991-07-29', streaming_link: 'https://www.youtube.com/watch?v=CD-E-LDc384' },
          { title: 'Master of Puppets', artist: 'Metallica', release_date: '1986-02-24', streaming_link: 'https://www.youtube.com/watch?v=xnKhsTXoKCI' },
          { title: 'One', artist: 'Metallica', release_date: '1988-01-10', streaming_link: 'https://www.youtube.com/watch?v=WM8bTdBs-cw' },
          { title: 'Fade to Black', artist: 'Metallica', release_date: '1984-11-23', streaming_link: 'https://www.youtube.com/watch?v=WEQnzs8wl6E' },
          { title: 'Ride the Lightning', artist: 'Metallica', release_date: '1984-07-27', streaming_link: 'https://www.youtube.com/watch?v=5s7_WbiR79E' },
          { title: 'Battery', artist: 'Metallica', release_date: '1986-08-25', streaming_link: 'https://www.youtube.com/watch?v=9Dq5b9FzJdI' },
          { title: 'The Four Horsemen', artist: 'Metallica', release_date: '1983-07-25', streaming_link: 'https://www.youtube.com/watch?v=2Y9u9k8t5W4' },
          { title: 'Seek & Destroy', artist: 'Metallica', release_date: '1983-07-25', streaming_link: 'https://www.youtube.com/watch?v=2Y9u9k8t5W4' },
        ]
        this.musics.loading = false
      }, 1000);
    },
  },
})
