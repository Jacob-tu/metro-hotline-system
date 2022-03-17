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
    icon: 'dashboard',
    path: '/dashboard',
    component: './DashboardWorkplace',
  },
  {
    path: '/record',
    name: '话务查询',
    icon: 'PhoneOutlined',
    routes: [
      {
        path: '/record',
        redirect: '/record/record-list',
      },
      {
        path: '/record/record-list',
        name: '话务信息列表',
        component: './record/record-list',
      },
      {
        path: '/record/record-stat',
        name: '话务量工单统计',
        component: './record/record-stat',
      },
      {
        path: '/record/satisfaction-view',
        name: '满意度查看',
        component: './record/satisfaction-view',
      },
      {
        path: '/record/satisfaction-stat',
        name: '满意度统计',
        component: './record/satisfaction-stat',
      },
      {
        path: '/record/voice-box',
        name: '语音信箱',
        component: './record/voice-box',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '员工管理',
    icon: 'UserOutlined',
    path: '/employee',
    routes: [
      {
        path: '/employee',
        redirect: '/employee/employee-info',
      },
      {
        path: '/employee/employee-info',
        name: '员工信息管理',
        component: './employee/employee-info',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/order',
    name: '工单管理',
    icon: 'UnorderedListOutlined',
    routes: [
      {
        path: '/order',
        redirect: '/order/todo-order',
      },
      {
        path: '/order/todo-order',
        name: '待处理工单',
        component: './order/todo-order',
      },
      {
        path: '/order/order-list',
        name: '工单列表',
        component: './order/order-list',
      },
      {
        path: '/order/overtime-order-soon',
        name: '即将超时工单',
        component: './order/overtime-order-soon',
      },
      {
        path: '/order/overtime-order',
        name: '已超时工单',
        component: './order/overtime-order',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '企业新闻公告',
    icon: 'NotificationOutlined',
    path: '/notice',
    routes: [
      {
        path: '/notice',
        redirect: '/notice/notice-list',
      },
      {
        path: '/notice/notice-list',
        name: '公告信息',
        component: './notice/notice-list',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/business',
    name: '业务查询',
    icon: 'SearchOutlined',
    routes: [
      {
        path: '/business',
        redirect: '/business/fare-query',
      },
      {
        path: '/business/fare-query',
        name: '票价查询',
        component: './business/fare-query',
      },
      {
        path: '/business/station-query',
        name: '地铁站点查询',
        component: './business/station-query',
      },
      {
        path: '/business/time-query',
        name: '地铁时刻查询',
        component: './business/time-query',
      },
      {
        path: '/business/station-around-query',
        name: '站点周边查询',
        component: './business/station-around-query',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '知识库',
    icon: 'BookOutlined',
    path: '/knowledge',
    routes: [
      {
        path: '/knowledge',
        redirect: '/knowledge/knowledge-list',
      },
      {
        path: '/knowledge/knowledge-list',
        name: '知识库信息列表',
        component: './knowledge/knowledge-list',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'LockOutlined',
    routes: [
      {
        path: '/system',
        redirect: '/system/user-management',
      },
      {
        path: '/system/user-management',
        name: '用户管理',
        component: './system/user-management',
      },
      {
        path: '/system/role-management',
        name: '角色管理',
        component: './system/role-management',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    // access: 'canAdmin',
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
    name: '新的页面',
    icon: 'table',
    path: '/new-page',
    component: './NewPage',
    access: 'canSeePage',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
