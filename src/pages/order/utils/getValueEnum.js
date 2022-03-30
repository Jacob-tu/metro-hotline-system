import {
  getOrderDispatch,
  getOrderSource,
  getOrderStatus,
  getOrderType,
  getOrderUrgent,
} from '@/services/order/all-order';

/**
 * 生成工单状态 Select 的 valueEnum
 */

const getStatusValueEnum = async () => {
  const res = await getOrderStatus({});
  const valueEnum = {};
  res.data.forEach((item) => {
    valueEnum[item.enum_id] = item.enum_name;
  });
  return valueEnum;
};
/**
 * 生成工单类型 Select 的 valueEnum
 */

const getTypeValueEnum = async () => {
  const res = await getOrderType({});
  const valueEnum = {};
  res.data.forEach((item) => {
    valueEnum[item.enum_id] = item.enum_name;
  });
  return valueEnum;
};
/**
 * 生成工单来源 Select 的 valueEnum
 */

const getSourceValueEnum = async () => {
  const res = await getOrderSource({});
  const valueEnum = {};
  res.data.forEach((item) => {
    valueEnum[item.enum_id] = item.enum_name;
  });
  return valueEnum;
};
/**
 * 生成工单转办类型（是否转办） Select 的 valueEnum
 */

const getDispatchValueEnum = async () => {
  const res = await getOrderDispatch({});
  const valueEnum = {};
  res.data.forEach((item) => {
    valueEnum[item.enum_id] = item.enum_name;
  });
  return valueEnum;
};
/**
 * 生成工单紧急程度 Select 的 valueEnum
 */

const getUrgentValueEnum = async () => {
  const res = await getOrderUrgent({});
  const valueEnum = {};
  res.data.forEach((item) => {
    valueEnum[item.enum_id] = item.enum_name;
  });
  return valueEnum;
};
export const timeLimitValueEnum = {
  2: '2小时',
  4: '4小时',
  8: '8小时',
  12: '12小时',
  24: '24小时',
  48: '48小时',
  72: '72小时',
};
export const statusValueEnum = await getStatusValueEnum();
export const typeValueEnum = await getTypeValueEnum();
export const sourceValueEnum = await getSourceValueEnum();
export const dispatchValueEnum = await getDispatchValueEnum();
export const urgentValueEnum = await getUrgentValueEnum();
