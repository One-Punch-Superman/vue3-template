export default [
  {
    icon: 'Printer',
    title: '首页',
    path: '/'
  },
  {
    icon: 'Tickets',
    title: '系统管理',
    path: '/system',
    children: [
      {
        path: '/system/user',
        title: '用户管理'
      },
      {
        path: '/system/role',
        title: '角色管理'
      },
      {
        path: '/system/menu',
        title: '菜单管理'
      }
    ]
  },
  {
    icon: 'Memo',
    title: '外部页面',
    path: '/list',
    children: [
      {
        path: '/list/base',
        title: 'Vue3文档'
      },
      {
        path: '/list/card',
        title: 'Vue Router文档'
      },
      {
        path: '/list/filter',
        title: 'Pinia文档'
      },
      {
        path: '/list/filter',
        title: 'Element Plus文档'
      },
      {
        path: '/list/filter',
        title: 'Vite文档'
      },
      {
        path: '/list/filter',
        title: 'VitePress文档'
      }
    ]
  },
  {
    icon: 'Tickets',
    title: '个人中心',
    path: '/user'
  },
  {
    icon: 'Tickets',
    title: '关于项目',
    path: '/about'
  }
];
