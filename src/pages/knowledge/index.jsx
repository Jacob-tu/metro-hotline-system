import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { nanoid } from 'nanoid';
import { getStationList, removeStation, updateStation } from '@/services/station/station-query';
import CreateOrUpdateForm from '@/pages/knowledge/components/CreateOrUpdateForm';
import { getKnowledgeList } from '@/services/knowledge';

/**
 * 添加知识库
 *
 * @param fields
 */

const handleAdd = async (fields) => {
  console.log('添加知识库', fields, 'total', total);
  // const hide = message.loading('正在添加');
  //
  // try {
  //   await addStation({ ...fields, station_id: nanoid() });
  //   hide();
  //   message.success('添加成功');
  // } catch (error) {
  //   hide();
  //   message.error('添加失败请重试！');
  // }
};
/**
 * 更新知识库
 *
 * @param fields
 * @param currentRow
 */

const handleUpdate = async (fields, currentRow) => {
  console.log('修改知识库', 'fields:', fields, 'currentRow', currentRow);
  const hide = message.loading('正在修改');

  try {
    await updateStation({ ...currentRow, ...fields });
    hide();
    message.success('修改成功');
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
  }
};
/**
 * 删除知识库
 *
 * @param selectedRow
 */

const handleRemove = async (selectedRow) => {
  console.log('删除知识库', 'selectedRow:', selectedRow);
  const hide = message.loading('正在删除');

  try {
    await removeStation({
      id: selectedRow.station_id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
/**
 * 获取表格组件数据
 * @param params  条件查询参数
 * @returns {Promise<{total, data, success: boolean}>}
 */
const fetchTableData = async (params) => {
  // console.log('params', params);
  // const res = await getStationList({
  //   page: params.current,
  //   limit: params.pageSize,
  //   sort: '+id',
  //   stationid: null,
  //   stationname: params.station_name || '',
  //   lineid: null,
  // });
  const res = await getKnowledgeList();
  return {
    data: res.data.items,
    success: true,
    total: res.data.total,
  };
};

const KnowledgeList = () => {
  /** 添加和更新窗口的弹窗 */
  const [createOrUpdateModalVisible, handleCreateOrUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();

  const columns = [
    {
      title: '知识标题',
      dataIndex: 'TITLE',
    },
    {
      title: '知识类型',
      dataIndex: 'KNOWLEDGE_TYPE',
      valueType: 'select',
    },
    {
      title: '添加时间',
      dataIndex: 'ADD_TIME',
      hideInSearch: true,
    },
    {
      title: '添加人',
      dataIndex: 'ADD_PERSON',
      hideInSearch: true,
    },
    {
      title: '知识内容',
      dataIndex: 'CONTENT',
      width: 500,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleCreateOrUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除该条站点信息吗?"
          onConfirm={async () => {
            await handleRemove(record);
            actionRef.current?.reload?.(); // 刷新table
          }}
          okText="是"
          cancelText="否"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="ID"
        search={{
          labelWidth: 120,
          span: 8,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateOrUpdateModalVisible(true);
            }}
          >
            <PlusOutlined /> 添加
          </Button>,
        ]}
        request={async (params = {}) => fetchTableData(params)}
        columns={columns}
      />

      <CreateOrUpdateForm
        onSubmit={async (value) => {
          handleCreateOrUpdateModalVisible(false);
          if (currentRow === undefined) {
            await handleAdd(value);
          } else {
            await handleUpdate(value, currentRow);
            setCurrentRow(undefined);
          }

          actionRef.current?.reload(); // 刷新table
        }}
        onCancel={() => {
          handleCreateOrUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        createOrUpdateModalVisible={createOrUpdateModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default KnowledgeList;
