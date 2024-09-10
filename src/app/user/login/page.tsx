"use client";
import React from "react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { userLogin } from "@/api/user";
import { useDispatch } from "react-redux";
import "./index.css";
import { message } from "antd";

/**
 * 用户登录页面
 */
const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const containerClassName = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: "100% 100%",
    };
  });

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: any) => {
    try {
      const res = await userLogin(values);
      if (res.data.data) {
        // 保存用户登录态
        dispatch(setLoginUser(res.data.data as API.LoginUserVO));
        message.success("登录成功！");
        router.replace("/");
        form.resetFields();
      }
    } catch (e: any) {
      message.error(e.message);
    }
  };

  return (
    <div id="userLoginPage" className={containerClassName}>
      <LoginForm<API.UserLoginReqDTO>
        form={form}
        logo={
          <Image src="/assets/logo.png" alt="面试宝典" width={44} height={44} />
        }
        title="面试宝典 - 用户登录"
        subTitle="程序员面试宝典"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "登录",
          },
        }}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          还没有账号？
          <Link prefetch={false} href={"/user/register"}>
            去注册
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
