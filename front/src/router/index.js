import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { SITE_NAME } from '@/config';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0, behavior: 'smooth' }),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - ${SITE_NAME}` : SITE_NAME;
  next();
});

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

export default router
