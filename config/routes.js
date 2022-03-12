export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: '登录',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '工作台',
    icon: 'smile',
    path: '/dashboardworkplace',
    component: './DashboardWorkplace',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: '二级管理页',
        icon: 'smile',
        component: './Admin',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '查询表格',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: '新的页面',
    icon: 'table',
    path: '/new-page',
    component: './NewPage',
    access: 'canSeePage',
  },
  {
    path: '/',
    redirect: '/dashboardworkplace',
  },
  {
    component: './404',
  },
];
