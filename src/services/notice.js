import request from '@/utils/request';
/** 获取新闻列表 GET /notice/findAll.do */

export async function getNoticeList(params, options) {
  return request('/notice/findAll.do', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 获取新闻类型 GET /Pub_enum/findOrder_stat.do */

export async function getNoticeType(params, options) {
  return request('/Pub_enum/findOrder_stat.do', {
    method: 'GET',
    params: { ...params, serial_no: 'POST_TYPE' },
    ...(options || {}),
  });
}
