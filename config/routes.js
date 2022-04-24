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
        component: './user/login',
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
        redirect: '/order/todo',
      },
      {
        path: '/order/todo',
        name: '待处理工单',
        component: './order/todo',
      },
      {
        name: '工单详情页',
        path: '/order/todo/profile',
        component: './order/profile',
        hideInMenu: true,
      },
      {
        name: '创建工单',
        path: '/order/todo/add-order',
        component: './order/add-order',
        hideInMenu: true,
      },
      {
        path: '/order/all-order',
        name: '全部工单列表',
        component: './order/all-order',
      },
      {
        name: '工单详情页',
        path: '/order/all-order/profile',
        component: './order/profile',
        hideInMenu: true,
      },
      {
        name: '创建工单',
        path: '/order/all-order/add-order',
        component: './order/add-order',
        hideInMenu: true,
      },
      {
        path: '/order/overtime-soon',
        name: '即将超时工单',
        component: './order/overtime-soon',
      },
      {
        name: '工单详情页',
        path: '/order/overtime-soon/profile',
        component: './order/profile',
        hideInMenu: true,
      },
      {
        name: '创建工单',
        path: '/order/overtime-soon/add-order',
        component: './order/add-order',
        hideInMenu: true,
      },
      {
        path: '/order/overtime',
        name: '已超时工单',
        component: './order/overtime',
      },
      {
        name: '工单详情页',
        path: '/order/overtime/profile',
        component: './order/profile',
        hideInMenu: true,
      },
      {
        name: '创建工单',
        path: '/order/overtime/add-order',
        component: './order/add-order',
        hideInMenu: true,
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
        redirect: '/notice/table-list',
      },
      {
        path: '/notice/table-list',
        name: '公告信息',
        component: './notice',
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
        path: '/business/station-around-query',
        name: '站点周边查询',
        component: './business/station-around-query',
      },
      {
        path: '/business/station-around-query/map-check',
        name: '查看地图',
        component: './business/map-check',
        hideInMenu: true,
        layout: {
          hideMenu: false,
          hideNav: false,
          hideFooter: true,
        },
      },
      {
        path: '/business/subway-check',
        name: '查看地铁图',
        component: './business/subway-check',
        layout: {
          hideMenu: false,
          hideNav: false,
          hideFooter: true,
        },
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
        redirect: '/knowledge/table-list',
      },
      {
        path: '/knowledge/table-list',
        name: '知识库信息列表',
        component: './knowledge',
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
    access: 'adminRouteFilter',
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
    path: '/wechat',
    name: '微信公众号管理',
    icon: 'WechatOutlined',
    routes: [
      {
        path: '/wechat',
        redirect: '/wechat/app-list',
      },
      {
        path: '/wechat/app-list',
        name: '公众号列表',
        component: './wechat/app-list',
        icon: 'UnorderedListOutlined',
      },
      {
        path: '/wechat/user-tags',
        name: '用户标签',
        component: './wechat/user-tags',
      },
      {
        path: '/wechat/user-list',
        name: '公众号用户',
        component: './wechat/user-list',
      },
      {
        path: '/wechat/user-msg',
        name: '用户消息',
        component: './wechat/user-msg',
      },
      {
        path: '/wechat/material',
        name: '素材管理',
        component: './wechat/material',
      },
      {
        path: '/wechat/menus',
        name: '自定义菜单',
        component: './wechat/menus',
      },
      {
        path: '/wechat/autoreply',
        name: '消息自动回复',
        component: './wechat/autoreply',
      },
      {
        path: '/wechat/mass-msg',
        name: '消息群发',
        component: './wechat/mass-msg',
      },
      {
        path: '/wechat/statistics',
        name: '数据统计',
        component: './wechat/statistics',
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
    access: 'normalRouteFilter',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
