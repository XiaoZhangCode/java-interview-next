"use client";
import {GithubFilled, LogoutOutlined, SearchOutlined,} from "@ant-design/icons";
import dynamic from "next/dynamic";
import {Dropdown, Input} from "antd";
import React, {useState} from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import {menus} from "../../../config/menu";
import "./index.css";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import getAccessibleMenuList from "@/access/menuAccess";

/**
 * 解决 Warning: Prop `className` did not match
 */
const ProLayout = dynamic(
  () => {
    return import("@ant-design/pro-layout");
  },
  {
    ssr: false, // 仅在客户端渲染
  },
);

const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();

  let loginUser = useSelector((state: RootState) => state.loginUser);

  const [text, setText] = useState("");

  return (
    <div
      id="basicLayout"
      className={"basicLayout"}
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试刷题平台"
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
            return loginUser.userName === "未登录" ? (
              <div>{dom}</div>
            ) : (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
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
            <a href={"https://github.com/XiaoZhangCode"} key={"github"}>
              <GithubFilled key="GithubFilled" />,
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
