import request from '@/utils/request';
/** 获取所有站点信息 GET /station/findAll1.do */

export async function getAllStation(options) {
  return request('/station/findAll1.do', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 票价查询 GET /query/findPrice.do */

export async function getPrice(params, options) {
  return request('/query/findPrice.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
