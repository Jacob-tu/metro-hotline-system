import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateOrUpdateForm from '@/pages/business/station-around-query/components/CreateOrUpdateForm';
import { getAllStation } from '@/services/station/fare-query';
import {
  addStationAround,
  getInfoType,
  getStationAroundList,
  removeStationAround,
  updateStationAround,
} from '@/services/station/station-around-query';
import { history } from 'umi';

/**
 * 添加站点周边信息
 *
 * @param fields
 */

const handleAdd = async (fields) => {
  // console.log('添加站点周边信息', fields);
  const hide = message.loading('正在添加');

  try {
    await addStationAround({ ...fields });
    hide();
    message.success('添加成功');
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
  }
};
/**
 * 更新站点周边信息
 *
 * @param fields
 * @param currentRow
 */

const handleUpdate = async (fields, currentRow) => {
  // console.log('修改站点周边信息', 'fields:', fields, 'currentRow', currentRow);
  const hide = message.loading('正在修改');

  try {
    await updateStationAround({ ...currentRow, ...fields });
    hide();
    message.success('修改成功');
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
  }
};
/**
 * 删除站点周边信息
 *
 * @param selectedRow
 */

const handleRemove = async (selectedRow) => {
  console.log('删除站点周边信息', 'selectedRow:', selectedRow);
  const hide = message.loading('正在删除');

  try {
    await removeStationAround({
      id: selectedRow.station_id,
      type: selectedRow.station_side_type,
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
 * 生成站点名称 Select 的 valueEnum
 */

const getStationValueEnum = async () => {
  const res = await getAllStation();
  const map = {};
  res.data.forEach((item) => {
    map[item.station_id] = item.station_name;
  });
  return map;
};
const stationValueEnum = await getStationValueEnum();
/**
 * 生成站点周边信息分类 Select 的 valueEnum
 */

const getTypeValueEnum = async () => {
  const res = await getInfoType({});
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

const fetchTableData = async (params, sort) => {
  // console.log('params', params, 'sort', sort);
  const res = await getStationAroundList({
    page: params.current,
    limit: params.pageSize,
    sort: (sort.station_id === 'descend' ? '-id' : '+id') || '+id',
    job_Number: params.station_name || '', // 参数为站点id，命名错误
    aroundInfo: params.station_side_info || '',
    divNum: params.enum_name || '',
  });
  res.data.items.map((item, index) => {
    /** dataIndex作为唯一的rowKey，station_name为站点名，enum_name为分类名 */
    item.dataIndex = index;
    item.station_name = stationValueEnum[item.station_id];
    item.enum_name = typeValueEnum[item.station_side_type];
    return item;
  });
  return {
    data: res.data.items,
    success: true,
    total: res.data.total,
  };
};

const StationAroundQuery = () => {
  /** 添加和更新窗口的弹窗 */
  const [createOrUpdateModalVisible, handleCreateOrUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();

  const columns = [
    {
      title: '站点编号',
      dataIndex: 'station_id',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '站点名称',
      dataIndex: 'station_name',
      valueType: 'select',
      valueEnum: stationValueEnum,
    },
    {
      title: '站点周边信息',
      dataIndex: 'station_side_info',
      ellipsis: true,
      tip: '内容过长会自动收缩',
      width: 400,
    },
    {
      title: '信息分类',
      dataIndex: 'enum_name',
      valueType: 'select',
      valueEnum: typeValueEnum,
    },
    {
      title: '路线',
      dataIndex: 'line_name',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
      ellipsis: true,
      tip: '备注过长会自动收缩',
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
            // console.log(record);
            history.push(
              `./station-around-query/map-check?station_id=${record?.station_id}&station_side_type=${record?.station_side_type}`,
            );
          }}
        >
          查看
        </a>,
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
        rowKey={(record) => record.dataIndex}
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
        stationValueEnum={stationValueEnum}
        typeValueEnum={typeValueEnum}
      />
    </PageContainer>
  );
};

export default StationAroundQuery;
