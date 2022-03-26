import request from '@/utils/request';
/** 获取站点信息列表 GET /station/list */

export async function getStationList(params, options) {
  return request('/station/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 更新站点信息 POST /station/updateStation.do */

export async function updateStation(data, options) {
  return request('/station/updateStation.do', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 添加站点信息 POST /station/addStation.do */

export async function addStation(data, options) {
  return request('/station/addStation.do', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 删除站点信息 POST /station/deleteStation.do */

export async function removeStation(params, options) {
  return request('/station/deleteStation.do', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}
