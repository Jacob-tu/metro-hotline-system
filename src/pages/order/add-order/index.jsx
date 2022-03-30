import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ProForm, {
  ProFormCascader,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import {
  statusValueEnum,
  typeValueEnum,
  dispatchValueEnum,
  urgentValueEnum,
  sourceValueEnum,
  timeLimitValueEnum,
} from '@/pages/order/utils/getValueEnum';
import styles from './style.less';
import { addOrder } from '@/services/order/all-order';
import { getAllEmployeeByDepartment } from '@/services/employee';
import { getAllUser, getLoginName } from '@/services/user';
const fieldLabels = {
  custom_id: '客户姓名',
  custom_tel: '来电电话',
  custom_tel_reply: '回复电话',
  is_turn: '是否转办',
  order_type: '工单类型',
  order_source: '工单来源',
  order_level: '紧急程度',
  time_limit: '处理时限',
  order_stat: '下发状态',
  order_title: '工单标题',
  order_content: '工单内容',
  created_user: '转办人',
};

const AddOrder = () => {
  const [error, setError] = useState([]);

  const getErrorInfo = (errors) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;

    if (!errors || errorCount === 0) {
      return null;
    }

    const scrollToField = (fieldKey) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);

      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };

    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }

      const key = err.name[0];
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode;
            }

            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values) => {
    setError([]);

    try {
      console.log('提交表单，values', values);
      const res = await addOrder({ ...values, created_user_id: userId });
      if (res.code === 20000) {
        message.success('创建成功！');
        console.log('创建工单成功，跳转到其他页面。');
        return;
      }

      // console.log('如果失败去提示信息，封装的请求中对错误进行了统一的处理');
    } catch {
      message.error('创建失败，请重试');
    }
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo.errorFields);
  };
  const [isTurn, setIsTurn] = useState(true);
  // 绑定一个 ProFormInstance 实例
  const formRef = useRef();
  const [userId, setUserId] = useState();
  // 获取登陆用户的 id
  useEffect(() => {
    (async function () {
      const { data: username } = await getLoginName();
      const { data: users } = await getAllUser();
      const user = users.find((user) => user.username === username);
      setUserId(user.id);
    })();
  }, []);

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
    <ProForm
      layout="vertical"
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{
        time_limit: 48,
        order_level: '30000201',
        order_stat: '30000001',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      formRef={formRef}
    >
      <PageContainer>
        <Card title="工单信息录入" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.custom_id}
                name="custom_id"
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormText
                label={fieldLabels.custom_tel}
                name="custom_tel"
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                fieldProps={{
                  showCount: true,
                  maxLength: 11,
                }}
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormText
                label={fieldLabels.custom_tel_reply}
                name="custom_tel_reply"
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                fieldProps={{
                  showCount: true,
                  maxLength: 11,
                }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.is_turn}
                name="is_turn"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                valueEnum={dispatchValueEnum}
                onChange={(value) => {
                  if (value === '30000401') {
                    setIsTurn(true);
                    formRef.current.setFieldsValue({ order_stat: '30000001' });
                  } else {
                    setIsTurn(false);
                    formRef.current.setFieldsValue({ order_stat: '30000004' });
                  }
                }}
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.order_type}
                name="order_type"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                valueEnum={typeValueEnum}
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.order_source}
                name="order_source"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                valueEnum={sourceValueEnum}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.order_level}
                name="order_level"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                valueEnum={urgentValueEnum}
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.time_limit}
                name="time_limit"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                valueEnum={timeLimitValueEnum}
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.order_stat}
                name="order_stat"
                rules={[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]}
                valueEnum={statusValueEnum}
                disabled={true}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col md={14} sm={24}>
              <ProFormText
                label={fieldLabels.order_title}
                name="order_title"
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
              />
            </Col>
            {isTurn && (
              <Col
                xl={{
                  span: 6,
                  offset: 2,
                }}
                lg={{
                  span: 8,
                }}
                md={{
                  span: 12,
                }}
                sm={24}
              >
                <ProFormCascader
                  label={fieldLabels.created_user}
                  name="created_user"
                  fieldProps={{
                    options: cascaderOptions,
                  }}
                />
              </Col>
            )}
          </Row>
          <Row gutter={16}>
            <Col md={14} sm={24}>
              <ProFormTextArea
                label={fieldLabels.order_content}
                name="order_content"
                tooltip="最长为 500 字"
                allowClear
                fieldProps={{
                  allowClear: true,
                  autoSize: { minRows: 4, maxRows: 12 },
                  showCount: true,
                  maxLength: 500,
                }}
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AddOrder;
