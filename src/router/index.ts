import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getUserStore } from '@/store';
import Layout from '@/layout/index.vue';

const modules: any = import.meta.globEager('./modules/**/*.ts');
const moduleRoute: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  moduleRoute.push(...modList);
});

NProgress.configure({ showSpinner: false });

export const allRoutes: Array<RouteRecordRaw> = [
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
    path: '/:w+',
    redirect: '/404'
  }
];

const whiteList = ['/login'];
console.log('allRoutes', allRoutes);
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
  NProgress.start();
  const userStore = getUserStore();
  const { token } = userStore;
  if (token) {
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
