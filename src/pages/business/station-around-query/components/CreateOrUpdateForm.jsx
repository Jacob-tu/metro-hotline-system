import React, { useState } from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSelect,
  ProForm,
} from '@ant-design/pro-form';

const CreateOrUpdateForm = (props) => {
  /** 路线编号valueEnum */
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
        station_id: props.values.station_id,
        station_side_type: props.values.station_side_type,
        line_id: props.values.line_id,
        station_side_info: props.values.station_side_info,
        remark: props.values.remark,
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          name="station_id"
          label="站点名称"
          width="md"
          valueEnum={props.stationValueEnum}
          rules={[
            {
              required: true,
              message: '站点名称为必填项！',
            },
          ]}
          disabled={Object.keys(props.values).length !== 0}
        />
        <ProFormSelect name="line_id" label="路线编号" width="md" valueEnum={valueEnum} />
      </ProForm.Group>

      <ProFormSelect
        name="station_side_type"
        label="信息分类"
        width="md"
        valueEnum={props.typeValueEnum}
        rules={[
          {
            required: true,
            message: '信息分类为必填项！',
          },
        ]}
        disabled={Object.keys(props.values).length !== 0}
      />

      <ProFormTextArea
        name="station_side_info"
        label="周边信息"
        tooltip="最长为 300 字"
        width={666}
        allowClear
        fieldProps={{
          allowClear: true,
          autoSize: { minRows: 3, maxRows: 5 },
          showCount: true,
          maxLength: 300,
        }}
        rules={[
          {
            required: true,
            message: '周边信息为必填项！',
          },
        ]}
      />
      <ProFormText name="remark" label="备注" width="md" />
    </ModalForm>
  );
};

export default CreateOrUpdateForm;
