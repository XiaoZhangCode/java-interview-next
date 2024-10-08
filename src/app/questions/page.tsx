import React from "react";
import Title from "antd/es/typography/Title";
import QuestionTable from "@/components/QuestionTable";
import { getUserQuestionPage } from "@/api/question";
import "./index.css";
import QuestionVo = API.QuestionVo;

/**
 * 题目管理页面
 *
 * @constructor
 */
// @ts-ignore
export default async function QuestionPage() {
  let questionList: QuestionVo[] = [];
  let total = 0;

  try {
    let questionPage = await getUserQuestionPage({
      UserQuestionPageReqDTO: {
        pageSize: 12,
        pageNo: 1,
      },
    });
    questionList = questionPage.data.data?.list ?? [];
    total = questionPage.data.data?.total ?? 0;
  } catch (error: any) {
    console.error("获取题库列表失败", error);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable defaultQuestionList={questionList} defaultTotal={total} />
    </div>
  );
}
