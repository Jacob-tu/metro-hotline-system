import request from '@/utils/request';

/** 获取待处理工单（需要cookie） GET /order/undoList */

export async function getTodoOrderList(params, options) {
  return request('/order/undoList', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
