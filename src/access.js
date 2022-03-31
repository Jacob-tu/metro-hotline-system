/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser, hasRoutes = ['新的页面'] } = initialState || {};
  return {
    adminRouteFilter: currentUser && currentUser.roles[0] === 'admin', // 只有管理员可访问
    canSeePage: true,
    normalRouteFilter: (route) => hasRoutes.includes(route.name), // initialState 中包含了的路由才有权限访问
  };
}
