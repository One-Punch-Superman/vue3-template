export default [
  {
    path: '/system',
    redirect: '/system/user',
    meta: { title: '系统管理' },
    children: [
      {
        path: 'user',
        name: 'systemUser',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'systemRole',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: 'menu',
        name: 'systemMenu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: { title: '菜单管理' }
      }
    ]
  }
];
