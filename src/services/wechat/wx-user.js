import { request } from 'umi';
/** 获取公众号用户列表 */

export async function getWxUserList(params, options) {
  return request('/weixin/wxuser/page', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
