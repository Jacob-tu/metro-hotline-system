import { Button, message, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getAllOrderList, getOrderStatus, getOrderType } from '@/services/order/order-list';

/**
 * 生成工单状态 Select 的 valueEnum
 */

const getStatusValueEnum = async () => {
  const res = await getOrderStatus({});
  const map = {};
  res.data.forEach((item) => {
    map[item.enum_id] = item.enum_name;
  });
  return map;
};
const statusValueEnum = await getStatusValueEnum();
/**
 * 生成工单类型 Select 的 valueEnum
 */

const getTypeValueEnum = async () => {
  const res = await getOrderType({});
  const map = {};
  res.data.forEach((item) => {
    map[item.enum_id] = item.enum_name;
  });
  return map;
};
const typeValueEnum = await getTypeValueEnum();
/**
 * 获取表格组件数据
 * @param params  条件查询参数
 * @returns {Promise<{total, data, success: boolean}>}
 */

const fetchTableData = async (params) => {
  // console.log('params', params);
  const res = await getAllOrderList({
    page: params.current,
    limit: params.pageSize,
    state: params.order_statstr || '',
    type: params.order_typestr || '',
    title: params.order_title || '',
    custom_tel: params.custom_tel || '',
  });
  return {
    data: res.data.items,
    success: true,
    total: res.data.total,
  };
};

const AllOrderList = () => {
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();

  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 40,
    },
    {
      title: '工单类型',
      dataIndex: 'order_typestr',
      valueType: 'select',
      valueEnum: typeValueEnum,
    },
    {
      title: '工单来源',
      dataIndex: 'order_sourcestr',
      hideInSearch: true,
    },
    {
      title: '工单标题',
      dataIndex: 'order_title',
      ellipsis: true,
      tip: '内容过长会自动收缩',
      width: 150,
    },
    {
      title: '工单状态',
      dataIndex: 'order_statstr',
      valueType: 'select',
      valueEnum: statusValueEnum,
    },
    {
      title: '工单内容',
      dataIndex: 'order_content',
      hideInSearch: true,
      ellipsis: true,
      tip: '内容过长会自动收缩',
      width: 250,
      copyable: true,
    },
    {
      title: '客户',
      dataIndex: 'custom_id',
      hideInSearch: true,
    },
    {
      title: '客户电话',
      dataIndex: 'custom_tel',
    },
    {
      title: '创建人',
      dataIndex: 'created_user',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'creation_date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="check"
          onClick={() => {
            setCurrentRow(record);
          }}
        >
          查看
        </a>,
        <a
          key="handle"
          onClick={() => {
            setCurrentRow(record);
          }}
        >
          处理
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="order_id"
        search={{
          labelWidth: 120,
          span: 6,
        }}
        request={async (params = {}) => fetchTableData(params)}
        columns={columns}
        pagination={{ showQuickJumper: true }}
      />
    </PageContainer>
  );
};

export default AllOrderList;
