import Layout from '@/layout/index.vue';

export default [
  {
    path: '/result',
    component: Layout,
    redirect: '/403',
    children: [
      {
        path: '/403',
        name: '403Page',
        component: () => import('@/views/result/403/index.vue'),
        meta: { title: '无权限' }
      },
      {
        path: '/404',
        name: '404Page',
        component: () => import('@/views/result/404/index.vue'),
        meta: { title: '访问页面不存在页' }
      },
      {
        path: '/500',
        name: '500Page',
        component: () => import('@/views/result/500/index.vue'),
        meta: { title: '服务器出错页' }
      }
    ]
  }
];
