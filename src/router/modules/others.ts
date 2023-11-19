export default [
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: { title: '关于项目' }
  }
];
