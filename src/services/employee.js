import request from '@/utils/request';
/** 获取员工信息列表 GET /employee/list */

export async function getEmployeeInfo(params, options) {
  return request('/employee/list', {
    method: 'GET',
    params: { ...params },
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
