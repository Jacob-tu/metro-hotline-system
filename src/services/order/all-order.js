import request from '@/utils/request';
/** 获取全部工单列表 GET /order/AllOrderList */

export async function getAllOrderList(params, options) {
  return request('/order/AllOrderList', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 获取工单进程 by id GET /orderProcess/findById.do */

export async function getOrderProcess(params, options) {
  return request('/orderProcess/findById.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 获取工单详情 by id GET /order/findById.do */

export async function getOrderDetail(params, options) {
  return request('/order/findById.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 获取部分工单列表 GET /order/orderList */

export async function getOrderList(params, options) {
  return request('/order/orderList', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 创建工单 POST /order/addOrder.do */

export async function addOrder(data, options) {
  return request('/order/addOrder.do', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 处理工单 POST /orderProcess/addOrderProcessor.do */

export async function processOrder(data, options) {
  return request('/orderProcess/addOrderProcessor.do', {
    method: 'POST',
    data,
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
/** 获取工单来源 GET /Pub_enum/findOrder_stat.do */

export async function getOrderSource(params, options) {
  return request('/Pub_enum/findOrder_stat.do', {
    method: 'GET',
    params: { ...params, serial_no: 'ORDER_SOURCE' },
    ...(options || {}),
  });
}
/** 获取工单转办类型（是否转办） GET /Pub_enum/findOrder_stat.do */

export async function getOrderDispatch(params, options) {
  return request('/Pub_enum/findOrder_stat.do', {
    method: 'GET',
    params: { ...params, serial_no: 'ORDER_DISPATCH_TYPE' },
    ...(options || {}),
  });
}
/** 获取工单紧急程度 GET /Pub_enum/findOrder_stat.do */

export async function getOrderUrgent(params, options) {
  return request('/Pub_enum/findOrder_stat.do', {
    method: 'GET',
    params: { ...params, serial_no: 'ORDER_URGENT' },
    ...(options || {}),
  });
}
