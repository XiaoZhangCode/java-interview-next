import { Flex } from "antd";
import React from "react";
import "./index.css";
import { getQuestionVo } from "@/api/question";
import { Content } from "antd/lib/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import QuestionVo = API.QuestionVo;

// @ts-ignore
export default async function QuestionPage({ params }) {
  const { questionId } = params;

  // 获取题库详情
  let question = undefined;
  try {
    const questionRes = await getQuestionVo({
      id: questionId,
    });
    question = questionRes.data.data;
  } catch (e: any) {
    console.error("获取题目详情失败，" + e.message);
  }
  if (!question) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  return (
    <div id="bankQuestionPage" className="max-width-content">
      <Flex gap={24}>
        <Content>
          <QuestionCard question={question as QuestionVo} />
        </Content>
      </Flex>
    </div>
  );
}
