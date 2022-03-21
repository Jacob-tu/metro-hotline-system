import request from '@/utils/request';
/** 获取员工信息列表 GET /employee/list */

export async function getEmployeeInfo(params, options) {
  return request('/employee/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 获取所有部门信息列表 GET /loginAdmin/info */

export async function getDepartmentList(options) {
  return request('/department/findAll1.do', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 通过id获取员工信息 GET /employee/findById.do */

export async function getEmployeeInfoById(params, options) {
  return request('/employee/findById.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 添加员工 POST /employee/create */

export async function addEmployee(data, options) {
  return request('/employee/create', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 修改员工信息 POST /employee/update */

export async function updateEmployee(data, options) {
  return request('/employee/update', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 删除员工 POST /employee/delete */

export async function removeEmployee(params, options) {
  return request('/employee/delete', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}
