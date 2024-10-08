import {GithubFilled, LogoutOutlined, UserOutlined,} from "@ant-design/icons";
import {Dropdown, message} from "antd";
import React from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import {menus} from "../../../config/menu";
import "./index.css";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import getAccessibleMenuList from "@/access/menuAccess";
import {logout} from "@/api/user";
import {ProLayout} from "@ant-design/pro-layout";
import SearchInput from "@/layout/BasicLayout/components/SearchInput";

/**
 * 解决 Warning: Prop `className` did not match
 */
// const ProLayout = dynamic(
//   () => {
//     return import("@ant-design/pro-layout");
//   },
//   {
//     ssr: true, // 仅在服务端渲染
//   },
// );



interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  let loginUser = useSelector((state: RootState) => state.loginUser);
  return (
    <div
      id="basicLayout"
      className="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试宝典"
        layout="top"
        logo={
          <Image src="/assets/logo.png" alt="logo" width={32} height={32} />
        }
        location={{
          pathname,
        }}
        token={{
          header: {
            colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
          },
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/notLoginUser.png",
          size: "small",
          title: loginUser.userName || "未登录",
          render: (props, dom) => {
            return !loginUser.id ? (
              <div
                onClick={() => {
                  router.replace("/user/login");
                }}
              >
                {dom}
              </div>
            ) : (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "用户中心",
                      onClick: ()=>{
                        router.push("/user/center")
                      }
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                      onClick: async () => {
                        const result = await logout();
                        if (result) {
                          message.success("退出成功！");
                          router.replace("/user/login");
                        }
                      },
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            props.layout !== "side" ? (
              <SearchInput key={"SearchInput"} />
            ) : undefined,
            <a
              href={"https://github.com/XiaoZhangCode"}
              target={"_blank"}
              key={"github"}
              style={{
                width: "55px",
                height: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer !important",
              }}
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuDataRender={() => {
          return getAccessibleMenuList(loginUser, menus);
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
