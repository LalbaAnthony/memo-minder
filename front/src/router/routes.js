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
    path: '/time-spans',
    name: 'time-spans',
    component: () => import('../pages/timespan/TimeSpansPage.vue'),
    meta: {
      title: 'Time spans', private: false,
    },
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../pages/event/EventsPage.vue'),
    meta: {
      title: 'Events', private: false,
    },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/account/AccountPage.vue'),
    meta: {
      title: 'Account', private: false,
    },
  },
  {
    path: '/musics',
    name: 'musics',
    component: () => import('../pages/music/MusicsPage.vue'),
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