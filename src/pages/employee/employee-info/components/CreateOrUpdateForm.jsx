import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  StepsForm,
  ProFormRadio,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { getDepartmentList } from '@/services/employee';

const CreateOrUpdateForm = (props) => {
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

  const [currentStep, setCurrentStep] = useState(0);
  // 在每个stepForm组件中配置onFinish，setCurrentStep()，onClose时setCurrentStep(0)
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title={Object.keys(props.values).length === 0 ? '添加员工' : '修改员工信息'}
            visible={props.createOrUpdateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
              setCurrentStep(0); // 回到第一步
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
      current={currentStep}
      submitter={{
        render: (props) => {
          if (props.step === 0) {
            return (
              <Button type="primary" onClick={() => props.onSubmit?.()}>
                下一步
              </Button>
            );
          }

          if (props.step === 1) {
            return [
              <Button key="pre" onClick={() => setCurrentStep((currentStep) => currentStep - 1)}>
                上一步
              </Button>,
              <Button type="primary" key="submit" onClick={() => props.onSubmit?.()}>
                提交
              </Button>,
            ];
          }
        },
      }}
    >
      <StepsForm.StepForm
        initialValues={{
          person_name: props.values.person_name,
          sex: props.values.sex,
          job_number: props.values.job_number,
          department: props.values.department?.toString(), // 后端返回的部门id为数字，需要转为字符串
          post: props.values.post,
          add_time: props.values.add_time,
        }}
        title="基本信息"
        layout={'horizontal'}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={async () => setCurrentStep((currentStep) => currentStep + 1)}
      >
        <ProFormText
          name="person_name"
          label="姓名"
          width="md"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入姓名！',
          //   },
          // ]}
        />
        <ProFormRadio.Group
          name="sex"
          label="性别"
          options={[
            {
              value: '男',
              label: '男',
            },
            {
              value: '女',
              label: '女',
            },
          ]}
          // rules={[
          //   {
          //     required: true,
          //     message: '请选择性别！',
          //   },
          // ]}
        />
        <ProFormText
          name="job_number"
          label="工号"
          width="md"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入工号！',
          //   },
          // ]}
        />
        <ProFormSelect name="department" label="部门" width="md" valueEnum={valueEnum} />
        <ProFormText name="post" label="职位" width="md" />
        <ProFormDatePicker
          name="add_time"
          width="md"
          label="入职时间"
          // rules={[
          //   {
          //     required: true,
          //     message: '请选择入职时间！',
          //   },
          // ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          birthday: props.values.birthday,
          address: props.values.address,
          province: props.values.province,
          mobile: props.values.mobile,
          email: props.values.email,
          degree: props.values.degree,
        }}
        title="其他信息"
        layout={'horizontal'}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={async () => setCurrentStep(0)}
      >
        <ProFormDatePicker name="birthday" label="生日" width="md" />
        <ProFormText name="address" label="居住地址" width="md" />
        <ProFormText name="province" label="籍贯" width="md" />
        <ProFormText name="mobile" label="联系方式" width="md" />
        <ProFormText
          name="email"
          label="邮箱地址"
          width="md"
          rules={[
            {
              type: 'email',
              message: '输入的邮箱不合法!',
            },
          ]}
        />
        <ProFormText name="degree" label="学历" width="md" />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateOrUpdateForm;
