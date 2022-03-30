import request from '@/utils/request';

/** 获取已超时工单（需要cookie） GET /order/findTimedOrders.do */

export async function getOvertimeOrderList(params, options) {
  return request('/order/findTimedOrders.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
