import { Flex, Menu } from "antd";
import React from "react";
import Title from "antd/es/typography/Title";
import "./index.css";
import { getQuestionVo, getUserQuestionPage } from "@/api/question";
import { getQuestionBank } from "@/api/questionBank";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";
import QuestionVo = API.QuestionVo;

// @ts-ignore
export default async function QuestionBankPage({ params }) {
  const { questionBankId, questionId } = params;

  // 获取题库详情
  let bank = undefined;

  try {
    const bankRes = await getQuestionBank({
      id: questionBankId,
    });
    bank = bankRes.data.data;
  } catch (e: any) {
    console.error("获取题库详情失败，" + e.message);
  }

  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  // 获取题目分页 第一页数据
  let questionList: QuestionVo[] = [];

  try {
    let questionPage = await getUserQuestionPage({
      UserQuestionPageReqDTO: {
        pageSize: 12,
        pageNo: 1,
        questionBankId: questionBankId,
      },
    });
    questionList = questionPage.data.data?.list ?? [];
  } catch (error: any) {
    console.error("获取题库列表失败", error);
  }

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

  // 题目菜单列表
  const questionMenuItemList = (questionList || []).map((q) => {
    return {
      label: (
        <Link href={`/bank/${bank.id}/question/${q.id}`} prefetch={false}>
          {q.title}
        </Link>
      ),
      key: q.id,
    } as any;
  });

  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu
            items={questionMenuItemList}
            selectedKeys={[question.id as any]}
          />
        </Sider>
        <Content>
          <QuestionCard question={question as QuestionVo} />
        </Content>
      </Flex>
    </div>
  );
}
