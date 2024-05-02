const routes = [
  // ==================== HOME ====================
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: 'Home', private: true,
    },
  },
  // ==================== SEARCH ====================
  {
    path: '/search',
    name: 'search',
    component: () => import('../pages/SearchPage.vue'),
    meta: {
      title: 'Search', private: true,
    },
  },
  // ==================== SEASON ====================
  {
    path: '/seasons',
    name: 'seasons.list',
    component: () => import('../pages/season/SeasonsPage.vue'),
    meta: {
      title: 'Seasons', private: true,
    },
  },
  {
    path: '/seasons/add',
    name: 'seasons.add',
    component: () => import('../pages/season/SeasonAddPage.vue'),
    meta: {
      title: 'Add a season', private: true,
    },
  },
  {
    path: '/season',
    name: 'season',
    children: [
      {
        path: ':id_season',
        name: 'seasons.details',
        component: () => import('../pages/season/SeasonPage.vue'),
        meta: {
          title: 'Season details', private: true,
        },
      },
      {
        path: ':id_season/edit',
        name: 'seasons.edit',
        component: () => import('../pages/season/SeasonEditPage.vue'),
        meta: {
          title: 'Edit the season', private: true,
        },
      },

    ],
  },
  // ==================== EVENT ====================
  {
    path: '/events',
    name: 'events.list',
    component: () => import('../pages/event/EventsPage.vue'),
    meta: {
      title: 'Events', private: true,
    },
  },
  {
    path: '/events/add',
    name: 'events.add',
    component: () => import('../pages/event/EventAddPage.vue'),
    meta: {
      title: 'Add an event', private: true,
    },
  },
  {
    path: '/event',
    name: 'event',
    children: [
      {
        path: ':id_event',
        name: 'events.details',
        component: () => import('../pages/event/EventPage.vue'),
        meta: {
          title: 'Event details', private: true,
        },
      },
      {
        path: ':id_event/edit',
        name: 'events.edit',
        component: () => import('../pages/event/EventEditPage.vue'),
        meta: {
          title: 'Edit the event', private: true,
        },
      },

    ],
  },
  // ==================== PERSON ====================
  {
    path: '/people',
    name: 'people.list',
    component: () => import('../pages/person/PeoplePage.vue'),
    meta: {
      title: 'People', private: true,
    },
  },
  {
    path: '/people/add',
    name: 'people.add',
    component: () => import('../pages/person/PersonAddPage.vue'),
    meta: {
      title: 'Add a person', private: true,
    },
  },
  {
    path: '/person',
    name: 'Person',
    children: [
      {
        path: ':id_person',
        name: 'people.details',
        component: () => import('../pages/person/PersonPage.vue'),
        meta: {
          title: 'Person details', private: true,
        },
      },
      {
        path: ':id_person/edit',
        name: 'people.edit',
        component: () => import('../pages/person/PersonEditPage.vue'),
        meta: {
          title: 'Edit the person', private: true,
        },
      },

    ],
  },
  // ==================== MUSIC ====================
  {
    path: '/musics',
    name: 'musics.list',
    component: () => import('../pages/music/MusicsPage.vue'),
    meta: {
      title: 'Musics', private: true,
    },
  },
  {
    path: '/musics/add',
    name: 'musics.add',
    component: () => import('../pages/music/MusicAddPage.vue'),
    meta: {
      title: 'Add a music', private: true,
    },
  },
  {
    path: '/music',
    name: 'music',
    children: [
      {
        path: ':id_music',
        name: 'musics.details',
        component: () => import('../pages/music/MusicPage.vue'),
        meta: {
          title: 'Music details', private: true,
        },
      },
      {
        path: ':id_music/edit',
        name: 'musics.edit',
        component: () => import('../pages/music/MusicEditPage.vue'),
        meta: {
          title: 'Edit the music', private: true,
        },
      },

    ],
  },
  // ==================== ACCOUNT ====================
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/account/AccountPage.vue'),
    meta: {
      title: 'My account', private: true,
    },
  },
  // ==================== INFOS ====================
  {
    path: '/infos',
    name: 'infos',
    component: () => import('../pages/InfosPage.vue'),
    meta: {
      title: 'Infos', private: true,
    },
  },
  // ==================== CATCH ====================
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/error/ErrorPage.vue'),
  },
]

export default routes