import request from '@/utils/request';
/** 测试代理接口 */

export async function testProxy(options) {
  return request('/api/department/findAll1.do', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 登录接口 POST /loginAdmin/login */

export async function login(body, options) {
  return request('/loginAdmin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 获取当前的用户信息 GET /loginAdmin/info */

export async function currentUser(params, options) {
  return request('/loginAdmin/info', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 退出登录接口 POST /loginAdmin/logout */

export async function outLogin(options) {
  return request('/loginAdmin/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 获取所有用户 POST /user/findAllUser.do */

export async function getAllUser(params, options) {
  return request('/user/findAllUser.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 获取登录名，需要携带Cookie: Admin-Token GET /order/findLoginName */

export async function getLoginName(params, options) {
  return request('/order/findLoginName', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
