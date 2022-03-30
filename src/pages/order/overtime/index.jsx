import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { statusValueEnum, typeValueEnum } from '@/pages/order/utils/getValueEnum';
import { getOvertimeOrderList } from '@/services/order/overtime';

/**
 * 获取表格组件数据
 * @param params  条件查询参数
 * @returns {Promise<{total, data, success: boolean}>}
 */

const fetchTableData = async (params) => {
  // console.log('params', params);
  const res = await getOvertimeOrderList({
    page: params.current,
    limit: params.pageSize,
    sort: '+id',
    type: params.order_typestr || '',
    title: params.order_title || '',
    customer: params.custom_id || '',
  });
  /** 将后台返回的数据格式转换为 Protable 要求的格式 */
  const data = res.data.items.map((item) => {
    const temp = {};
    for (let [key, value] of Object.entries(item)) {
      // 如果值是对象则合并
      if (Object.prototype.toString.call(value) === '[object Object]') {
        Object.assign(temp, value);
      } else {
        temp[key] = value;
      }
    }
    return temp;
  });
  return {
    data: data,
    success: true,
    total: res.data.total,
  };
};

const OvertimeOrder = () => {
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();

  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 40,
    },
    {
      title: '已超时时间（小时）',
      dataIndex: 'delay_hour',
      tip: '距离工单处理时限已经过了多久',
      hideInSearch: true,
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
    },
    {
      title: '工单状态',
      dataIndex: 'order_statstr',
      hideInSearch: true,
    },
    {
      title: '工单内容',
      dataIndex: 'order_content',
      hideInSearch: true,
      ellipsis: true,
      tip: '内容过长会自动收缩',
    },
    {
      title: '客户姓名',
      dataIndex: 'custom_id',
    },
    {
      title: '客户电话',
      dataIndex: 'custom_tel',
      copyable: true,
      hideInSearch: true,
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
            history.push(`./overtime/profile?order_id=${record?.order_id}&isCheck=${true}`);
          }}
        >
          查看
        </a>,
        <a
          key="handle"
          onClick={() => {
            setCurrentRow(record);
            history.push(`./overtime/profile?order_id=${record?.order_id}&isCheck=${false}`);
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

export default OvertimeOrder;
