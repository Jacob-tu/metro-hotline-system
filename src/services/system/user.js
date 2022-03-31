import request from '@/utils/request';
/** 获取用户列表 GET /user/findAll.do */

export async function getUserList(params, options) {
  return request('/user/findAll.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 添加用户 POST /user/saveUser.do */

export async function addUser(data, options) {
  return request('/user/saveUser.do', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 更新用户 POST /user/updateUser.do */

export async function updateUser(data, options) {
  return request('/user/updateUser.do', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
