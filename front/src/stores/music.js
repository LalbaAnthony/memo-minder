import { defineStore } from 'pinia'
import { get } from '@/helpers/api';

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
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
          { title: 'Hasarder', artist: 'Lompal', release_date: '2021-10-31', streaming_link: 'https://open.spotify.com/track/4lp2Zff8wuXAccfNkFn1Q9?si=f056cbb4d1454813' },
        ]
        this.musics.loading = false
      }, 1000);
    },
  },
})
