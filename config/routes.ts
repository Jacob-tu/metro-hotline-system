export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', redirect: '/user/login' },
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  {
    name: '新的页面',
    icon: 'table',
    path: '/page',
    component: './Page',
    access: 'canSeePage',
    layout: { hideNav: true, hideFooter: true },
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
