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
      mobileMainClass: 'min-h-screen pb-24',
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
  // ==================== TERMS ====================
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
      mobileMainClass: 'min-h-screen pb-48',
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
          mobileMainClass: 'min-h-screen pb-48',
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
      mobileMainClass: 'min-h-screen pb-48',
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
          mobileMainClass: 'min-h-screen pb-48',
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
      mobileMainClass: 'min-h-screen pb-48',
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
          mobileMainClass: 'min-h-screen pb-48',
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
      mobileMainClass: 'min-h-screen pb-48',
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
          mobileMainClass: 'min-h-screen pb-48',
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
      mobileMainClass: 'min-h-screen pb-24',
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