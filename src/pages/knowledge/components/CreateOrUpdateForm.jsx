import React, { useState } from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSelect,
  ProForm,
  ProFormTimePicker,
} from '@ant-design/pro-form';

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
        KNOWLEDGE_TYPE: props.values.KNOWLEDGE_TYPE,
        ADD_PERSON: props.values.ADD_PERSON,
        CONTENT: props.values.CONTENT,
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="TITLE"
          label="知识标题"
          width="md"
          rules={[
            {
              required: true,
              message: '知识标题为必填项！',
            },
          ]}
        />
        <ProFormSelect
          name="KNOWLEDGE_TYPE"
          label="知识类型"
          width="md"
          valueEnum={valueEnum}
          rules={[
            {
              required: true,
              message: '知识类型为必填项！',
            },
          ]}
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
        label="知识内容"
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
