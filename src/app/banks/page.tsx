"use server";
import Title from "antd/es/typography/Title";
import QuestionBankList from "@/components/QuestionBankList";
import "./index.css";
import { getUserQuestionBankPage } from "@/api/questionBank";
import QuestionBankVo = API.QuestionBankVo;

/**
 * 题库列表页面
 * @constructor
 */
export default async function BanksPage() {
  let questionBankList: QuestionBankVo[] = [];
  // 题库数量不多，直接全量获取
  const pageSize = 200;

  try {
    const questionBankRes = await getUserQuestionBankPage({
      pageParam: {
        pageSize: pageSize,
        pageNo: 1,
      },
    });
    questionBankList = questionBankRes.data.data?.list ?? [];
  } catch (e: any) {
    console.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="banksPage" className="max-width-content">
      <Title level={3}>题库大全</Title>
      <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
