import request from '@/utils/request';
/** 获取全部工单列表 GET /order/AllOrderList */

export async function getAllOrderList(params, options) {
  return request('/order/AllOrderList', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 获取工单状态 GET /Pub_enum/findOrder_stat.do */

export async function getOrderStatus(params, options) {
  return request('/Pub_enum/findOrder_stat.do', {
    method: 'GET',
    params: { ...params, serial_no: 'ORDER_STAT' },
    ...(options || {}),
  });
}
/** 获取工单类型 GET /Pub_enum/findOrder_stat.do */

export async function getOrderType(params, options) {
  return request('/Pub_enum/findOrder_stat.do', {
    method: 'GET',
    params: { ...params, serial_no: 'ORDER_TYPE' },
    ...(options || {}),
  });
}
/** 获取工单进程 GET /orderProcess/findById.do */

export async function getOrderProcess(params, options) {
  return request('/orderProcess/findById.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
