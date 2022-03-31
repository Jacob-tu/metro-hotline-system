import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Switch } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateOrUpdateForm from '@/pages/system/user-management/components/CreateOrUpdateForm';
import { addUser, getUserList, updateUser } from '@/services/system/user';

/**
 * 获取表格组件数据
 * @param params  条件查询参数
 * @returns {Promise<{total, data, success: boolean}>}
 */

const fetchTableData = async (params, sort) => {
  // console.log('params', params, 'sort', sort);
  const res = await getUserList({
    page: params.current,
    limit: params.pageSize,
    sort: (sort.username === 'descend' ? '-id' : '+id') || '+id',
    name: params.username || '',
  });
  return {
    data: res.data.items,
    success: true,
    total: res.data.total,
  };
};

const User = () => {
  /** 添加用户 */
  const handleAdd = async (fields) => {
    // console.log('添加用户', fields);
    const hide = message.loading('正在添加');

    try {
      await addUser({ ...fields });
      hide();
      message.success('添加成功');
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };
  /** 更新用户信息 */
  const handleUpdate = async (fields, currentRow) => {
    // console.log('修改用户', 'fields:', fields, 'currentRow', currentRow);
    setLoading(true);
    const hide = message.loading('正在修改');

    try {
      await updateUser({ ...currentRow, ...fields });
      hide();
      message.success('修改成功');
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
    setLoading(false);
  };

  /** 添加和更新窗口的弹窗 */
  const [createOrUpdateModalVisible, handleCreateOrUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: '用户编号',
      dataIndex: 'u_no',
      hideInSearch: true,
    },
    {
      title: '员工姓名',
      dataIndex: 'person_name',
      hideInSearch: true,
    },
    {
      title: '添加日期',
      dataIndex: 'add_time',
      hideInSearch: true,
    },
    {
      title: '是否在线',
      dataIndex: 'is_online',
      valueType: 'select',
      valueEnum: {
        1: { text: '在线', status: 'Processing' },
        2: { text: '不在线', status: 'Default' },
      },
      hideInSearch: true,
    },
    {
      title: '启用/禁用',
      dataIndex: 'is_enable',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          defaultChecked={record.is_enable === 1}
          loading={loading}
          onChange={async () => {
            await handleUpdate({ is_enable: record.is_enable === 1 ? 2 : 1 }, record);
            actionRef.current?.reload(); // 刷新table
          }}
        />
      ),
    },
    {
      title: '开启/锁定',
      dataIndex: 'non_locked',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          checkedChildren="开启"
          unCheckedChildren="锁定"
          defaultChecked={record.non_locked === 2}
          loading={loading}
          onChange={async () => {
            await handleUpdate({ non_locked: record.non_locked === 1 ? 2 : 1 }, record);
            actionRef.current?.reload(); // 刷新table
          }}
        />
      ),
    },
    {
      title: '过期时间',
      dataIndex: 'expired_date',
      hideInSearch: true,
    },
    {
      title: '添加人',
      dataIndex: 'add_person_name',
      hideInSearch: true,
    },
    {
      title: '上次登录时间',
      dataIndex: 'last_login_time',
      hideInSearch: true,
    },
    {
      title: '上次登录IP',
      dataIndex: 'last_login_ip',
      hideInSearch: true,
    },
    {
      title: '登录次数',
      dataIndex: 'login_times',
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
            actionRef.current?.reload?.();
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
        rowKey="id"
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
        request={async (params = {}, sort) => fetchTableData(params, sort)}
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

export default User;
