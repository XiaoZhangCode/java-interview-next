import { Avatar, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import "./index.css";
import QuestionTable from "@/components/QuestionTable";
import { getUserQuestionPage } from "@/api/question";
import { getQuestionBank } from "@/api/questionBank";
import QuestionVo = API.QuestionVo;

// @ts-ignore
export default async function BankPage({ params }) {
  const { questionBankId } = params;

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
  let total = 0;

  try {
    let questionPage = await getUserQuestionPage({
      UserQuestionPageReqDTO: {
        pageSize: 12,
        pageNo: 1,
        questionBankId: questionBankId,
      },
    });
    questionList = questionPage.data.data?.list ?? [];
    total = questionPage.data.data?.total ?? 0;
  } catch (error: any) {
    console.error("获取题库列表失败", error);
  }

  // 获取第一道题目，用于 “开始刷题” 按钮跳转
  let firstQuestionId;
  if (questionList && questionList.length > 0) {
    firstQuestionId = questionList[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                disabled={!firstQuestionId}
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
              >
                开始刷题
              </Button>
            </>
          }
        ></Meta>
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={
          { questionBankId: questionBankId } as API.UserQuestionPageReqDTO
        }
        cardTitle={`题目列表（${total || 0}）`}
        questionBankId={questionBankId}
      />
    </div>
  );
}
