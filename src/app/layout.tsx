"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React, { useCallback, useEffect } from "react";
import "./globals.css";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUser } from "@/api/user";
import { setLoginUser } from "@/stores/loginUser";
import { usePathname } from "next/navigation";
import AccessLayout from "@/access/AccessLayout";
import FullLayout from "@/layout/FullLayout";

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
      !pathname.startsWith("/user/login") &&
      !pathname.startsWith("/user/register")
    ) {
      const result = await getLoginUser();
      if (result.data.data) {
        dispatch(setLoginUser(result.data.data as API.LoginUserVO));
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
              <FullLayout>
                <AccessLayout>{children}</AccessLayout>
              </FullLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
