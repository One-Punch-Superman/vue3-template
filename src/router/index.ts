import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getUserStore } from '@/store';
import Layout from '@/layout/index.vue';

const modules: any = import.meta.globEager('./modules/**/*.ts');
const moduleRoute: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  moduleRoute.push(...modList);
});

export const allRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  ...moduleRoute,
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/notFound/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];

const whiteList = ['/login'];

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    };
  }
});

router.beforeEach(async (to, from, next) => {
  const userStore = getUserStore();
  const { token, userInfo } = userStore;
  if (token) {
    if (userInfo.name) {
      to.path === '/login' ? next('/') : next();
    } else {
      await userStore.getUserInfo();
      next();
    }
  } else {
    whiteList.includes(to.path) ? next() : next(`/login?redirect=${to.path}`);
  }
});

export default router;
