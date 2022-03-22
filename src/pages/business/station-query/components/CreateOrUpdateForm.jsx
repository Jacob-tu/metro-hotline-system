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
        station_name: props.values.station_name,
        line_id: props.values.line_id,
        up_first_time: props.values.up_first_time,
        down_first_time: props.values.down_first_time,
        up_end_time: props.values.up_end_time,
        down_end_time: props.values.down_end_time,
        station_description: props.values.station_description,
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="station_name"
          label="站点名称"
          width="md"
          rules={[
            {
              required: true,
              message: '站点名称为必填项！',
            },
          ]}
        />
        <ProFormSelect name="line_id" label="路线编号" width="md" valueEnum={valueEnum} />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTimePicker
          name="up_first_time"
          width="md"
          label="上行首班"
          rules={[
            {
              required: true,
              message: '该项为必填项！',
            },
          ]}
        />
        <ProFormTimePicker
          name="down_first_time"
          width="md"
          label="下行首班"
          rules={[
            {
              required: true,
              message: '该项为必填项！',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTimePicker
          name="up_end_time"
          width="md"
          label="上行末班"
          rules={[
            {
              required: true,
              message: '该项为必填项！',
            },
          ]}
        />
        <ProFormTimePicker
          name="down_end_time"
          width="md"
          label="下行末班"
          rules={[
            {
              required: true,
              message: '该项为必填项！',
            },
          ]}
        />
      </ProForm.Group>

      <ProFormTextArea
        name="station_description"
        label="站点描述"
        tooltip="最长为 300 字"
        width={666}
        allowClear
        fieldProps={{
          allowClear: true,
          autoSize: { minRows: 3, maxRows: 5 },
          maxLength: 300,
        }}
      />
    </ModalForm>
  );
};

export default CreateOrUpdateForm;
