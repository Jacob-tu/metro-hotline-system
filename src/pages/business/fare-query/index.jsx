import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getPrice, getAllStation } from '@/services/station/fare-query';

/**
 * 获取表格组件数据
 * @param params  条件查询参数
 * @returns {Promise<{total, data, success: boolean}>}
 */

const fetchTableData = async (params) => {
  // console.log('params', params);
  /** 最开始，表格不请求数据，只在查询表单有内容时请求数据 */
  if (Object.keys(params).length === 0) return;

  const res = await getPrice({
    stationid1: params.start_station,
    stationid2: params.end_station,
  });
  const temp = res.data;
  /** 为表格添加起始站和终点站项 */
  temp.start_station = params.start_station;
  temp.end_station = params.end_station;

  /** 将响应数据转为数组返回 */
  const arr = [temp];
  return {
    data: arr,
    success: true,
  };
};

const FareQuery = () => {
  const actionRef = useRef();

  const [valueEnum, setValueEnum] = useState({});
  useEffect(async () => {
    const res = await getAllStation();
    const stationList = res.data;
    const newValueEnum = {};
    stationList.forEach((item) => {
      newValueEnum[item.station_name] = item.station_name;
    });
    setValueEnum(newValueEnum);
  }, []);

  const columns = [
    {
      title: '起始站',
      dataIndex: 'start_station',
      valueType: 'select',
      valueEnum: valueEnum,
      fieldProps: {
        placeholder: '请选择起始站',
      },
      /** 默认的查询表单 rules 是不生效的。需要配置 ignoreRules */
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择起始站',
          },
        ],
      },
    },
    {
      title: '终点站',
      dataIndex: 'end_station',
      valueType: 'select',
      valueEnum: valueEnum,
      fieldProps: {
        placeholder: '请选择终点站',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择终点站',
          },
        ],
      },
    },
    {
      title: '距离（公里）',
      dataIndex: 'dis',
      hideInSearch: true,
    },
    {
      title: '票价（元）',
      dataIndex: 'price',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="dis"
        search={{
          labelWidth: 120,
          span: 8,
        }}
        request={async (params = {}) => fetchTableData(params)}
        columns={columns}
        form={{
          ignoreRules: false,
        }}
        pagination={false}
      />
    </PageContainer>
  );
};

export default FareQuery;
