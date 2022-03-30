import { Card, Statistic, Descriptions, Table, message } from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import ProDescriptions from '@ant-design/pro-descriptions';
import React, { useState, useEffect } from 'react';
import { history, useRequest } from 'umi';
import styles from './style.less';
import {
  addOrder,
  getOrderDetail,
  getOrderProcess,
  processOrder,
} from '@/services/order/all-order';
import {
  dispatchValueEnum,
  sourceValueEnum,
  statusValueEnum,
  timeLimitValueEnum,
  urgentValueEnum,
} from '@/pages/order/utils/getValueEnum';
import ProForm, {
  ProFormCascader,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { getAllEmployeeByDepartment } from '@/services/employee';

const OrderProfile = () => {
  // 返回顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { order_id, isCheck } = history.location.query;
  const [orderDetail, setOrderDetail] = useState({});
  useEffect(() => {
    (async function () {
      const { data = {} } = await getOrderDetail({ order_id });
      setOrderDetail(data);
    })();
  }, []);

  const [tabActiveKey, setTabActiveKey] = useState(isCheck === 'true' ? 'detail' : 'process');
  /** 展示查看工单还是处理工单 */
  const [isShowCheck, setIsShowCheck] = useState(isCheck === 'true' ? true : false);

  const onTabChange = (tabActiveKey) => {
    setTabActiveKey(tabActiveKey);
    setIsShowCheck((isShowCheck) => !isShowCheck);
  };

  const { data: orderProcess = [] } = useRequest(() => getOrderProcess({ order_id }));

  const onFinish = async (values) => {
    try {
      const process_user_id = values.process_user_id[1];
      console.log('提交表单，values', { ...values, process_user_id, order_id });
      const res = await processOrder({ ...values, process_user_id, order_id });

      if (res.code === 20000) {
        message.success('处理成功！');
        console.log('处理工单成功，跳转到其他页面。');
        return;
      }

      // console.log('如果失败去提示信息，封装的请求中对错误进行了统一的处理');
    } catch {
      message.error('处理失败，请重试');
    }
  };

  const extra = (
    <div className={styles.moreInfo}>
      <Statistic title="状态" value={orderDetail.order_statstr} />
    </div>
  );
  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="创建人">{orderDetail.created_user}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{orderDetail.creation_date}</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

  const [cascaderOptions, setCascaderOptions] = useState([]);
  /**
   * 获取级联选择框的数据，示例：
   * const cascaderOptions = [
   *     {
   *       value: 'zhejiang',
   *       label: 'Zhejiang',
   *       children: [
   *         {
   *           value: 'hangzhou',
   *           label: 'Hangzhou',
   *         },
   *       ],
   *     },
   *   ]
   */
  useEffect(() => {
    (async function () {
      const { data } = await getAllEmployeeByDepartment();
      const res = [];
      data.forEach((item) => {
        const option = {},
          children = [];
        option.value = item.person_id;
        option.label = item.person_name;
        item.persons.forEach((person) => {
          const childrenOption = {};
          childrenOption.value = person.person_id;
          childrenOption.label = person.person_name;
          children.push(childrenOption);
        });
        option.children = children;
        res.push(option);
      });
      setCascaderOptions(res);
    })();
  }, []);

  return (
    <PageContainer
      title={`工单编号：${orderDetail.order_id}`}
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
      tabActiveKey={tabActiveKey}
      onTabChange={onTabChange}
      tabList={[
        {
          key: 'detail',
          tab: '查看工单',
        },
        {
          key: 'process',
          tab: '处理工单',
        },
      ]}
    >
      <div className={styles.main}>
        <GridContent>
          <Card
            title="工单信息"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <ProDescriptions
              style={{
                marginBottom: 24,
              }}
              column={{ xs: 1, sm: 2, md: 3 }}
              bordered={isShowCheck ? true : false}
              dataSource={orderDetail}
              columns={[
                {
                  title: '客户名称',
                  key: 'custom_id',
                  dataIndex: 'custom_id',
                },
                {
                  title: '来电电话',
                  key: 'custom_tel',
                  dataIndex: 'custom_tel',
                  copyable: true,
                },
                {
                  title: '回复电话',
                  key: 'custom_tel_reply',
                  dataIndex: 'custom_tel_reply',
                  copyable: true,
                },
                {
                  title: '是否转办',
                  key: 'is_turn',
                  dataIndex: 'is_turn',
                  valueEnum: dispatchValueEnum,
                },
                {
                  title: '工单类型',
                  key: 'order_typestr',
                  dataIndex: 'order_typestr',
                },
                {
                  title: '工单来源',
                  key: 'order_source',
                  dataIndex: 'order_source',
                  valueEnum: sourceValueEnum,
                },
                {
                  title: '紧急程度',
                  key: 'order_level',
                  dataIndex: 'order_level',
                  valueEnum: urgentValueEnum,
                },
                {
                  title: '处理时限',
                  key: 'time_limit',
                  dataIndex: 'time_limit',
                  valueEnum: timeLimitValueEnum,
                },
                {
                  title: '下发状态',
                  key: 'order_stat',
                  dataIndex: 'order_stat',
                  valueEnum: statusValueEnum,
                },
                {
                  title: '工单标题',
                  key: 'order_title',
                  dataIndex: 'order_title',
                  span: 3,
                },
                {
                  title: '工单内容',
                  key: 'order_content',
                  dataIndex: 'order_content',
                  span: 3,
                },
              ]}
            />
          </Card>
          {isShowCheck ? (
            <Card
              title="工单流转记录"
              style={{
                marginBottom: 24,
              }}
            >
              <Table
                rowKey={'handler_id'}
                pagination={false}
                dataSource={orderProcess}
                columns={[
                  {
                    title: '处理时间',
                    dataIndex: 'process_time',
                    key: 'process_time',
                  },
                  {
                    title: '分发人',
                    dataIndex: 'process_user_id',
                    key: 'process_user_id',
                  },
                  {
                    title: '接收人',
                    dataIndex: 'process_user',
                    key: 'process_user',
                  },
                  {
                    title: '工单状态',
                    dataIndex: 'process_statstr',
                    key: 'process_statstr',
                  },
                  {
                    title: '处理描述',
                    dataIndex: 'process_title',
                    key: 'process_title',
                  },
                  {
                    title: '处理工单内容',
                    dataIndex: 'process_content',
                    key: 'process_content',
                  },
                  {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 'remark',
                  },
                ]}
              />
            </Card>
          ) : (
            <Card
              title={'处理工单'}
              style={{
                marginBottom: 24,
              }}
            >
              <ProForm
                style={{
                  margin: 'auto',
                  marginTop: 8,
                  maxWidth: 600,
                }}
                name="basic"
                layout="vertical"
                initialValues={{}}
                onFinish={onFinish}
              >
                <ProFormSelect
                  width="md"
                  label="工单状态"
                  name="order_stat"
                  rules={[
                    {
                      required: true,
                      message: '请选择',
                    },
                  ]}
                  valueEnum={statusValueEnum}
                />
                <ProFormCascader
                  width="md"
                  label="处理人"
                  name="process_user_id"
                  fieldProps={{
                    options: cascaderOptions,
                  }}
                  rules={[
                    {
                      required: true,
                      message: '请选择',
                    },
                  ]}
                />
                <ProFormSelect
                  width="md"
                  label="处理时限"
                  name="time_limit"
                  rules={[
                    {
                      required: true,
                      message: '请选择',
                    },
                  ]}
                  valueEnum={timeLimitValueEnum}
                />
                <ProFormText
                  label={'处理描述'}
                  name="process_title"
                  rules={[
                    {
                      required: true,
                      message: '请输入',
                    },
                  ]}
                />
                <ProFormTextArea
                  label={'处理内容'}
                  name="process_content"
                  tooltip="最长为 500 字"
                  fieldProps={{
                    allowClear: true,
                    showCount: true,
                    maxLength: 500,
                  }}
                />
              </ProForm>
            </Card>
          )}
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default OrderProfile;
