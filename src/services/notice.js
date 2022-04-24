import { request } from 'umi';
/** 获取公告列表 GET /api/notices */

export async function getNotices(params, options) {
  return request('/api/notices', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

// import request from '@/utils/request';
// /** 获取公告列表 GET /notice/findAll.do */
//
// export async function getNoticeList(params, options) {
//   return request('/notice/findAll.do', {
//     method: 'GET',
//     params: { ...params },
//     ...(options || {}),
//   });
// }
// /** 获取公告类型 GET /Pub_enum/findOrder_stat.do */
//
// export async function getNoticeType(params, options) {
//   return request('/Pub_enum/findOrder_stat.do', {
//     method: 'GET',
//     params: { ...params, serial_no: 'POST_TYPE' },
//     ...(options || {}),
//   });
// }
