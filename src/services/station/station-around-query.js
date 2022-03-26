import request from '@/utils/request';
/** 获取站点周边信息列表 GET /stationAround/list */

export async function getStationAroundList(params, options) {
  return request('/stationAround/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 获取站点周边信息分类 GET /Pub_enum/findOrder_stat.do */

export async function getStationAroundCategory(params, options) {
  return request('/Pub_enum/findOrder_stat.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 修改站点周边信息 POST /stationAround/updateStationAround.do */

export async function updateStationAround(data, options) {
  return request('/stationAround/updateStationAround.do', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 添加站点周边信息 POST /stationAround/addStationAround.do */

export async function addStationAround(data, options) {
  return request('/stationAround/addStationAround.do', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 删除站点周边信息 POST /stationAround/deleteStationAround.do */

export async function removeStationAround(params, options) {
  return request('/stationAround/deleteStationAround.do', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}
