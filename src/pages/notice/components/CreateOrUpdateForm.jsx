import React, { useState } from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSelect,
  ProForm,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CreateOrUpdateForm = (props) => {
  const [valueEnum, setValueEnum] = useState({});
  return (
    <ModalForm
      title={Object.keys(props.values).length === 0 ? '添加' : '修改'}
      visible={props.createOrUpdateModalVisible}
      modalProps={{
        bodyStyle: {
          padding: '32px 40px 48px',
        },
        destroyOnClose: true,
        onCancel: props.onCancel,
      }}
      onFinish={props.onSubmit}
      initialValues={{
        TITLE: props.values.TITLE,
        POST_TYPE: props.values.POST_TYPE,
        SCROLL_STAT_NAME: props.values.SCROLL_STAT_NAME,
        STICKY_NAME: props.values.STICKY_NAME,
        STAT_NAME: props.values.STAT_NAME,
        VALIDITY: props.values.VALIDITY,
        ADD_PERSON: props.values.ADD_PERSON,
        CONTENT: props.values.CONTENT,
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="TITLE"
          label="公告标题"
          width="md"
          rules={[
            {
              required: true,
              message: '公告标题为必填项！',
            },
          ]}
        />
        <ProFormSelect
          name="POST_TYPE"
          label="公告类型"
          width="md"
          valueEnum={valueEnum}
          rules={[
            {
              required: true,
              message: '公告类型为必填项！',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="SCROLL_STAT_NAME"
          label="是否滚动"
          width="md"
          valueEnum={valueEnum}
          // rules={[
          //   {
          //     required: true,
          //     message: '该项为必填项！',
          //   },
          // ]}
        />
        <ProFormSelect
          name="STICKY_NAME"
          label="是否置顶"
          width="md"
          valueEnum={valueEnum}
          // rules={[
          //   {
          //     required: true,
          //     message: '该项为必填项！',
          //   },
          // ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="STAT_NAME"
          width="md"
          label="审核状态"
          // rules={[
          //   {
          //     required: true,
          //     message: '该项为必填项！',
          //   },
          // ]}
        />
        <ProFormDateTimePicker
          name="VALIDITY"
          width="md"
          label="截至时间"
          // rules={[
          //   {
          //     required: true,
          //     message: '该项为必填项！',
          //   },
          // ]}
        />
      </ProForm.Group>

      <ProFormText
        name="ADD_PERSON"
        width="md"
        label="添加人"
        rules={[
          {
            required: true,
            message: '该项为必填项！',
          },
        ]}
      />
      <ProFormTextArea
        name="CONTENT"
        label="公告内容"
        tooltip="最长为 600 字"
        width={666}
        allowClear
        fieldProps={{
          allowClear: true,
          autoSize: { minRows: 3, maxRows: 6 },
          showCount: true,
          maxLength: 600,
        }}
      />
    </ModalForm>
  );
};

export default CreateOrUpdateForm;
