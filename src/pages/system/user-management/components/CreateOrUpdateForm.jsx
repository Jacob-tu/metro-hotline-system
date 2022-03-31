import React, { useState } from 'react';
import {
  ProFormText,
  ModalForm,
  ProFormSelect,
  ProForm,
  ProFormDatePicker,
} from '@ant-design/pro-form';

const CreateOrUpdateForm = (props) => {
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
        username: props.values.username,
        expired_date: props.values.expired_date,
        is_enable: props.values.is_enable,
        non_locked: props.values.non_locked,
        password: props.values.password,
        add_person_name: props.values.add_person_name,
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="username"
          label="用户名"
          tooltip="登录用户名"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        />
        <ProFormText.Password
          label="密码"
          tooltip="登录密码"
          name="password"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </ProForm.Group>
      {Object.keys(props.values).length === 0 && (
        <ProForm.Group>
          <ProFormSelect
            name="is_enable"
            label="启用/禁用"
            width="md"
            valueEnum={
              new Map([
                [1, { text: '启用' }],
                [2, { text: '禁用' }],
              ])
            }
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
          />
          <ProFormSelect
            name="non_locked"
            label="开启/锁定"
            width="md"
            valueEnum={
              new Map([
                [2, { text: '开启' }],
                [1, { text: '锁定' }],
              ])
            }
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
          />
        </ProForm.Group>
      )}
      <ProForm.Group>
        <ProFormDatePicker name="expired_date" width="md" label="过期日期" />
        <ProFormText
          name="add_person_name"
          label="添加人"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入添加人！',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default CreateOrUpdateForm;
