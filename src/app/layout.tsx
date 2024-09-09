"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React, { useCallback, useEffect } from "react";
import BasicLayout from "@/layout/BasicLayout";
import "./globals.css";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUser } from "@/api/user";
import { setLoginUser } from "@/stores/loginUser";
import { usePathname } from "next/navigation";
import AccessLayout from "@/access/AccessLayout";

/**
 * 全局初始化组件
 * @param children 子组件
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  let dispatch = useDispatch<AppDispatch>();
  let pathname = usePathname();

  // 全局初始化 函数
  const doInitLoginUser = useCallback(async () => {
    if (
      !(
        pathname.startsWith("user/login") &&
        pathname.startsWith("/user/register")
      )
    ) {
      const result = await getLoginUser();
      if (result.data) {
        dispatch(setLoginUser(result.data as API.LoginUserVO));
      } else {
        // // 跳转到登录页面
        // window.location.href = "/user/login";
        // setTimeout(() => {
        //   const testUser = {
        //     userName: "codeZhang",
        //     userProfile: "暂无简介",
        //     userAvatar: "/assets/logo.png",
        //     userRole: "admin",
        //   };
        //   dispatch(setLoginUser(testUser as API.LoginUserVO));
        // }, 3000);
      }
    }
  }, []);

  useEffect(() => {
    doInitLoginUser();
  }, []);

  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
