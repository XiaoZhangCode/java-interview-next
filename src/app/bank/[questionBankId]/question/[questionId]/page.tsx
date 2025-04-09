"use client";
import React from "react";
import "./index.css";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

// 动态导入客户端组件
const ClientQuestionDetail = dynamic(
  () => import('./components/QuestionDetail'),
  {
    ssr: false,
    loading: () => <Loading />
  }
);

// @ts-ignore
export default function QuestionBankPage({ params }) {
  const { questionBankId, questionId } = params;

  return (
    <div id="bankQuestionPage">
      <ClientQuestionDetail
        questionBankId={questionBankId}
        questionId={questionId}
      />
    </div>
  );
}
