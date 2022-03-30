import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/user';
import styles from './index.less';
import { setToken } from '@/utils/auth';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    try {
      // 登录
      const msg = await login({ ...values });

      if (msg.code === 20000) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        /** 将 token 保存在 Cookie 中 */
        setToken(msg.data.token);
        // 获取用户信息并保存到全局初始数据中（namespace 为 @@initialState  的 model）
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const { query } = history.location;
        console.log('query', query);
        const { redirect } = query;
        history.replace(redirect || '/');
        return;
      }

      console.log('如果失败去设置用户错误信息', msg); // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const { data } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.png" />}
          title="南昌地铁热线后台系统"
          subTitle={'请使用 IE11 及以上版本、Firfox、Chrome 浏览器浏览'}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Tabs>
            <Tabs.TabPane key="account" tab={'账户密码登录'} />
          </Tabs>

          {data === 'fail' && <LoginMessage content={'错误的用户名和密码'} />}
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            rules={[
              {
                required: true,
                message: '用户名是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            rules={[
              {
                required: true,
                message: '密码是必填项！',
              },
            ]}
          />

          <div
            style={{
              marginBottom: 24,
            }}
          >
            超级管理员账号密码
            <br />
            Username : admin &nbsp;&nbsp;&nbsp; Password : xga414
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
