import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getUserStore } from '@/store';
import Layout from '@/layout/index.vue';

import system from './modules/system';
import others from './modules/others';

export const allRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      ...system,
      ...others
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/components/notFound/index.vue')
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
    if (to.path === '/login') {
      next('/');
      return;
    }
    if (!userInfo.name) {
      try {
        await userStore.getUserInfo();
      } catch (error) {
        userStore.logout();
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
      }
    }
    next();
  } else {
    whiteList.includes(to.path) ? next() : next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});

export default router;
