import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateOrUpdateForm from './components/CreateOrUpdateForm';
import {
  getEmployeeInfo,
  getDepartmentList,
  updateEmployee,
  addEmployee,
  removeEmployee,
  getEmployeeInfoById,
} from '@/services/employee';
import { nanoid } from 'nanoid';

/**
 * 添加员工
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  // console.log('添加员工', fields);
  const hide = message.loading('正在添加');

  try {
    await addEmployee({ ...fields, id: nanoid() });
    hide();
    message.success('添加成功');
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
  }
};
/**
 * 更新员工信息
 *
 * @param fields
 */

const handleUpdate = async (fields, currentRow) => {
  // console.log('修改员工信息', 'fields:', fields, 'currentRow', currentRow);
  const hide = message.loading('正在修改');

  try {
    await updateEmployee({ ...currentRow, ...fields });
    hide();
    message.success('修改成功');
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
  }
};
/**
 * 删除员工
 *
 * @param selectedRow
 */

const handleRemove = async (selectedRow) => {
  console.log('删除员工', 'selectedRow:', selectedRow);
  const hide = message.loading('正在删除');

  try {
    await removeEmployee({
      id: selectedRow.id, // 接口要求int型，这里为string无法删除
    });
    console.log('接口参数id要求int型，这里为string无法删除');
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const fetchTableData = async (params, sort) => {
  // console.log(params, sort);
  const res = await getEmployeeInfo({
    page: params.current,
    limit: params.pageSize,
    sort: (sort.job_number === 'descend' ? '-id' : '+id') || '+id',
    job_Number: params.job_number || '',
    depart: params.department_id || '',
    name: params.person_name || '',
  });
  console.log(res.data);
  return {
    data: res.data.items,
    success: true,
    total: res.data.total,
  };
};

const fetchDescData = async (id) => {
  const res = await getEmployeeInfoById({ id });
  return {
    data: res.data,
    success: true,
  };
};

const EmployeeInfo = () => {
  /** 添加和更新窗口的弹窗 */

  const [createOrUpdateModalVisible, handleCreateOrUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const [valueEnum, setValueEnum] = useState({});
  useEffect(async () => {
    const res = await getDepartmentList();
    const departmentList = res.data;
    const newValueEnum = {};
    departmentList.forEach((item) => {
      newValueEnum[item.department_id] = item.department_name;
    });
    setValueEnum(newValueEnum);
  }, []);

  const columns = [
    {
      title: '工号',
      dataIndex: 'job_number',
      tip: '工号是唯一的 key',
      sorter: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'person_name',
      valueType: 'textarea',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '入职时间',
      dataIndex: 'add_time',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'department_id',
      valueType: 'select',
      valueEnum: valueEnum,
      render: (_, record) => {
        return (
          <>
            <span>{record.depart.department_name}</span>
          </>
        );
      },
    },
    {
      title: '职位',
      dataIndex: 'post',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      valueType: 'textarea',
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
          title="确定删除该条员工信息吗?"
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
        rowKey="job_number"
        search={{
          labelWidth: 120,
          span: 6,
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
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            type="primary"
            onClick={async () => {
              alert('批量删除');
              // await handleRemove(selectedRowsState);
              // setSelectedRows([]);
              // actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

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
          return true;
        }}
        onCancel={() => {
          handleCreateOrUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        createOrUpdateModalVisible={createOrUpdateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.job_number && (
          <ProDescriptions
            column={2}
            title={'员工详细信息'}
            request={async () => fetchDescData(currentRow.id)}
            columns={[
              {
                title: '工号',
                dataIndex: 'job_number',
              },
              {
                title: '姓名',
                dataIndex: 'person_name',
              },
              {
                title: '性别',
                dataIndex: 'sex',
              },
              {
                title: '入职时间',
                dataIndex: 'add_time',
              },
              {
                title: '部门',
                dataIndex: 'department_id',
                render: (_, record) => {
                  return (
                    <>
                      <span>{record.depart.department_name}</span>
                    </>
                  );
                },
              },
              {
                title: '职位',
                dataIndex: 'post',
              },
              {
                title: '联系方式',
                dataIndex: 'mobile',
              },
              {
                title: '生日',
                dataIndex: 'birthday',
              },
              {
                title: '居住地址',
                dataIndex: 'address',
              },
              {
                title: '籍贯',
                dataIndex: 'province',
              },
              {
                title: '邮箱地址',
                dataIndex: 'email',
              },
              {
                title: '学历',
                dataIndex: 'degree',
              },
            ]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default EmployeeInfo;
