const routes = [
  // ==================== HOME ====================
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: 'Home',
      private: true,
      displayInSearch: true,
      tags: ['home', 'welcome', 'index'],
    },
  },
  // ==================== INFOS ====================
  {
    path: '/infos',
    name: 'infos',
    component: () => import('../pages/InfosPage.vue'),
    meta: {
      title: 'Infos',
      private: true,
      displayInSearch: true,
      tags: ['infos', 'about', 'contact'],
    },
  },
  // ==================== SEARCH ====================
  {
    path: '/search',
    name: 'search',
    component: () => import('../pages/SearchPage.vue'),
    meta: {
      title: 'Search',
      private: true,
      displayInSearch: false,
      tags: ['search', 'find', 'query'],
    },
  },
  // ==================== SEASON ====================
  {
    path: '/seasons',
    name: 'seasons.list',
    component: () => import('../pages/season/SeasonsPage.vue'),
    meta: {
      title: 'Seasons',
      private: true,
      displayInSearch: true,
      tags: ['seasons', 'years', 'periods'],
    },
  },
  {
    path: '/seasons/add',
    name: 'seasons.add',
    component: () => import('../pages/season/SeasonAddPage.vue'),
    meta: {
      title: 'Add a season',
      private: true,
      displayInSearch: true,
      tags: ['seasons', 'years', 'periods', 'add'],
    },
  },
  {
    path: '/season',
    name: 'season',
    children: [
      {
        path: ':seasonId',
        name: 'seasons.details',
        component: () => import('../pages/season/SeasonPage.vue'),
        meta: {
          title: 'Season details',
          private: true,
          displayInSearch: false,
          tags: ['seasons', 'years', 'periods', 'details'],
        },
      },
      {
        path: ':seasonId/edit',
        name: 'seasons.edit',
        component: () => import('../pages/season/SeasonEditPage.vue'),
        meta: {
          title: 'Edit the season',
          private: true,
          displayInSearch: false,
          tags: ['seasons', 'years', 'periods', 'edit'],
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
      title: 'Events',
      private: true,
      displayInSearch: true,
      tags: ['events', 'happenings', 'occurrences'],
    },
  },
  {
    path: '/events/add',
    name: 'events.add',
    component: () => import('../pages/event/EventAddPage.vue'),
    meta: {
      title: 'Add an event',
      private: true,
      displayInSearch: true,
      tags: ['events', 'happenings', 'occurrences', 'add'],
    },
  },
  {
    path: '/event',
    name: 'event',
    children: [
      {
        path: ':eventId',
        name: 'events.details',
        component: () => import('../pages/event/EventPage.vue'),
        meta: {
          title: 'Event details',
          private: true,
          displayInSearch: false,
          tags: ['events', 'happenings', 'occurrences', 'details'],
        },
      },
      {
        path: ':eventId/edit',
        name: 'events.edit',
        component: () => import('../pages/event/EventEditPage.vue'),
        meta: {
          title: 'Edit the event',
          private: true,
          displayInSearch: false,
          tags: ['events', 'happenings', 'occurrences', 'edit'],
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
      title: 'People',
      private: true,
      displayInSearch: true,
      tags: ['people', 'persons', 'humans'],
    },
  },
  {
    path: '/people/add',
    name: 'people.add',
    component: () => import('../pages/person/PersonAddPage.vue'),
    meta: {
      title: 'Add a person',
      private: true,
      displayInSearch: true,
      tags: ['people', 'persons', 'humans', 'add'],
    },
  },
  {
    path: '/person',
    name: 'Person',
    children: [
      {
        path: ':personId',
        name: 'people.details',
        component: () => import('../pages/person/PersonPage.vue'),
        meta: {
          title: 'Person details',
          private: true,
          displayInSearch: false,
          tags: ['people', 'persons', 'humans', 'details'],
        },
      },
      {
        path: ':personId/edit',
        name: 'people.edit',
        component: () => import('../pages/person/PersonEditPage.vue'),
        meta: {
          title: 'Edit the person',
          private: true,
          displayInSearch: false,
          tags: ['people', 'persons', 'humans', 'edit'],
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
      title: 'Musics',
      private: true,
      displayInSearch: true,
      tags: ['musics', 'songs', 'tunes'],
    },
  },
  {
    path: '/musics/add',
    name: 'musics.add',
    component: () => import('../pages/music/MusicAddPage.vue'),
    meta: {
      title: 'Add a music',
      private: true,
      displayInSearch: true,
      tags: ['musics', 'songs', 'tunes', 'add'],
    },
  },
  {
    path: '/music',
    name: 'music',
    children: [
      {
        path: ':musicId',
        name: 'musics.details',
        component: () => import('../pages/music/MusicPage.vue'),
        meta: {
          title: 'Music details',
          private: true,
          displayInSearch: false,
          tags: ['musics', 'songs', 'tunes', 'details'],
        },
      },
      {
        path: ':musicId/edit',
        name: 'musics.edit',
        component: () => import('../pages/music/MusicEditPage.vue'),
        meta: {
          title: 'Edit the music',
          private: true,
          displayInSearch: false,
          tags: ['musics', 'songs', 'tunes', 'edit'],
        },
      },

    ],
  },
  // ==================== AUTH & ACCOUNT ====================
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../pages/auth/AuthPage.vue'),
    meta: {
      title: 'Authentication',
      private: false,
      displayInSearch: false,
      tags: [],
    },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/account/AccountPage.vue'),
    meta: {
      title: 'My account',
      private: true,
      displayInSearch: true,
      tags: ['account', 'profile', 'settings'],
    },
  },
  // ==================== CATCH ====================
  {
    path: '/:catchAll(.*)*',
    name: 'Error',
    component: () => import('../pages/error/ErrorPage.vue'),
    meta: {
      title: 'Error',
      displayInSearch: false,
    },
  },
]

export default routes