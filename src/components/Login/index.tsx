import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, message, Select, Form } from "antd";
import React, { useState } from "react";
import { request } from "umi";
import { ProFormText, LoginForm } from "@ant-design/pro-components";
import { useIntl, history, FormattedMessage, useModel } from "umi";
import styles from "./index.less";

const preset = {
  "sli@corilead": "1",
  "systemadmin@corilead": "password",
  systemadmin: "password",
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const doLogin = async (values: API.LoginParams) => {
  return request(
    `${process.env.HOST}/uaa/oauth/token?client_id=app&client_secret=secret&grant_type=password&password=${values.password}&username=${values.username}`,
    {
      method: "POST",
      data: {},
      headers: {
        Authorization: "Basic YXBwOnNlY3JldA==",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState } = useModel("@@initialState");
  const [form] = Form.useForm();

  const intl = useIntl();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await doLogin(values);
      if (msg && msg.access_token) {
        sessionStorage.setItem("token", msg.access_token);
        // localStorage.setItem("token", msg.access_token);
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: "pages.login.success",
          defaultMessage: "登录成功！",
        });
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || "/");
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: "pages.login.failure",
        defaultMessage: "登录失败，请重试！",
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          form={form}
          title={initialState?.settings?.title || "cpdm"}
          subTitle="用户登录"
          initialValues={{
            username: "sli@corilead",
            password: "1",
          }}
          actions={[]}
          onFinish={async (values) => {
            await handleSubmit({
              username: values.username,
              password: values.password,
            });
          }}
        >
          {status === "error" && loginType === "account" && (
            <LoginMessage
              content={intl.formatMessage({
                id: "pages.login.accountLogin.errorMessage",
                defaultMessage: "账户或密码错误(admin/ant.design)",
              })}
            />
          )}
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
            ]}
          />
          {process.env.NODE_ENV === "development" && (
            <Select
              placeholder="使用预设用户"
              defaultValue="wdang@corilead"
              onChange={(v) => {
                form.setFieldsValue({
                  username: v,
                  passord: preset[v as string],
                });
              }}
              style={{ width: "100%", marginBottom: 16 }}
            >
              {Object.keys(preset).map((key) => (
                <Select.Option key={key} value={key}>
                  {key}
                </Select.Option>
              ))}
            </Select>
          )}
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
