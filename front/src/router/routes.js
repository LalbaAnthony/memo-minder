const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: 'Home', private: false,
    },
  },
  {
    path: '/musics',
    name: 'musics',
    component: () => import('../pages/MusicsPage.vue'),
    meta: {
      title: 'Musics', private: false,
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/error/ErrorPage.vue'),
  },
]

export default routes