// @ts-ignore

/* eslint-disable */
// import { request } from 'umi';
import request from '@/utils/request';
/** 获取项目通知 GET /api/project/notice */

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeChartData() {
  return request('/api/fake_workplace_chart_data');
}
