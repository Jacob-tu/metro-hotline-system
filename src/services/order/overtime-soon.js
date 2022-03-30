import request from '@/utils/request';

/** 获取即将超时工单（需要cookie） GET /order/findTimingOutOrders.do */

export async function getOvertimeSoonOrderList(params, options) {
  return request('/order/findTimingOutOrders.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
