import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getTodoOrderList } from '@/services/order/todo';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { typeValueEnum } from '@/pages/order/utils/getValueEnum';

/**
 * 获取表格组件数据
 * @param params  条件查询参数
 * @returns {Promise<{total, data, success: boolean}>}
 */

const fetchTableData = async (params) => {
  console.log('params', params);
  const res = await getTodoOrderList({
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

const TodoOrder = () => {
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
      hideInSearch: true,
    },
    {
      title: '客户电话',
      dataIndex: 'custom_tel',
      copyable: true,
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
            history.push(`./todo/profile?order_id=${record?.order_id}&isCheck=${true}`);
          }}
        >
          查看
        </a>,
        <a
          key="handle"
          onClick={() => {
            setCurrentRow(record);
            history.push(`./todo/profile?order_id=${record?.order_id}&isCheck=${false}`);
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
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push(`./todo/add-order`);
            }}
          >
            <PlusOutlined /> 创建工单
          </Button>,
        ]}
        request={async (params = {}) => fetchTableData(params)}
        columns={columns}
        pagination={{ showQuickJumper: true }}
      />
    </PageContainer>
  );
};

export default TodoOrder;
