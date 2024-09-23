"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React, { useCallback, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "@/stores";
import { getLoginUser } from "@/api/user";
import { setLoginUser } from "@/stores/loginUser";
import { usePathname, useRouter } from "next/navigation";
import AccessLayout from "@/access/AccessLayout";
import FullLayout from "@/layout/FullLayout";
import "./globals.css";

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
  const router = useRouter();

  // 全局初始化 函数
  const doInitLoginUser = useCallback(async () => {
    if (
      !pathname.startsWith("/user/login") &&
      !pathname.startsWith("/user/register")
    ) {
      try {
        const result = await getLoginUser();
        if (result.data?.data) {
          dispatch(setLoginUser(result.data.data));
        } else {
          // 处理用户未登录的情况，例如重定向到登录页面
          router.push("/user/login");
        }
      } catch (error) {
        console.error("获取用户信息失败：", error);
        // 处理错误情况，例如重定向到登录页面或显示错误消息
        router.push("/user/login");
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
