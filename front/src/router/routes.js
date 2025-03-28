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
      private: false,
      displayInSearch: true,
      tags: ['infos', 'about', 'contact'],
    },
  },
  // ==================== INFOS ====================
  {
    path: '/terms-and-conditions',
    name: 'terms-and-conditions',
    component: () => import('../pages/TermsAndConditionsPage.vue'),
    meta: {
      title: 'Terms and conditions',
      private: false,
      displayInSearch: false,
      tags: ['terms', 'conditions', 'legal'],
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
      title: 'All Seasons',
      private: true,
      displayInSearch: true,
      tags: ['seasons', 'years', 'periods'],
    },
  },
  {
    path: '/seasons/add',
    name: 'seasons.add',
    component: () => import('../pages/season/SeasonPage.vue'),
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
    ],
  },
  // ==================== EVENT ====================
  {
    path: '/events',
    name: 'events.list',
    component: () => import('../pages/event/EventsPage.vue'),
    meta: {
      title: 'All Events',
      private: true,
      displayInSearch: true,
      tags: ['events', 'happenings', 'occurrences'],
    },
  },
  {
    path: '/events/add',
    name: 'events.add',
    component: () => import('../pages/event/EventPage.vue'),
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
    ],
  },
  // ==================== PERSON ====================
  {
    path: '/people',
    name: 'people.list',
    component: () => import('../pages/person/PeoplePage.vue'),
    meta: {
      title: 'All People',
      private: true,
      displayInSearch: true,
      tags: ['people', 'persons', 'humans'],
    },
  },
  {
    path: '/people/add',
    name: 'people.add',
    component: () => import('../pages/person/PersonPage.vue'),
    meta: {
      title: 'Add a person',
      private: true,
      displayInSearch: true,
      tags: ['people', 'persons', 'humans', 'add'],
    },
  },
  {
    path: '/person',
    name: 'person',
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
    ],
  },
  // ==================== MUSIC ====================
  {
    path: '/musics',
    name: 'musics.list',
    component: () => import('../pages/music/MusicsPage.vue'),
    meta: {
      title: 'All Musics',
      private: true,
      displayInSearch: true,
      tags: ['musics', 'songs', 'tunes'],
    },
  },
  {
    path: '/musics/add',
    name: 'musics.add',
    component: () => import('../pages/music/MusicPage.vue'),
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
    path: '/error-server',
    name: 'error.server',
    component: () => import('../pages/error/ErrorServerPage.vue'),
    meta: {
      title: 'Error',
      displayInSearch: false,
    },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'error.routing',
    component: () => import('../pages/error/ErrorRoutingPage.vue'),
    meta: {
      title: 'Error',
      displayInSearch: false,
    },
  },
]

export default routes