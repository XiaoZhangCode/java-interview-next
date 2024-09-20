import React from "react";
import { getUserQuestionPage } from "@/api/question";
import "./index.css";
import SearchQuestion from "@/components/SearchQuestion/page";
import QuestionVo = API.QuestionVo;

/**
 * 题目搜索页面
 *
 * @constructor
 */
// @ts-ignore
export default async function SearchPage({ searchParams }) {
  let { q: searchText } = searchParams;
  let questionList: QuestionVo[] = [];
  let total = 0;

  try {
    let questionPage = await getUserQuestionPage({
      UserQuestionPageReqDTO: {
        pageSize: 12,
        pageNo: 1,
        title: searchText as string,
      },
    });
    questionList = questionPage.data.data?.list ?? [];
    total = questionPage.data.data?.total ?? 0;
  } catch (error: any) {
    console.error("获取题库列表失败", error);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <SearchQuestion
        searchText={searchText}
        questionList={questionList}
        total={total}
      />
    </div>
  );
}
