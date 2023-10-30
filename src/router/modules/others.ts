import Layout from '@/layout/index.vue';

export default [
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '',
        name: 'userBase',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: { title: '关于项目' }
      }
    ]
  }
];
