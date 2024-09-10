"use client";
import React from "react";
import "./index.css";
import { usePathname } from "next/navigation";
import BasicLayout from "@/layout/BasicLayout";

interface Props {
  children: React.ReactNode;
}

export default function FullLayout({ children }: Props) {
  let pathname = usePathname();
  if (
    !pathname.startsWith("/user/login") &&
    !pathname.startsWith("/user/register")
  ) {
    return <BasicLayout>{children}</BasicLayout>;
  } else {
    return (
      <div
        id="fullLayout"
        className={"fullLayout"}
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        {children}
      </div>
    );
  }
}
