import { request } from 'umi';
/** 获取知识库列表 GET /api/knowledge */

export async function getKnowledgeList(params, options) {
  return request('/api/knowledge', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
