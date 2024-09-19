"use client";
import React, { useEffect, useState } from "react";
import QuestionTable from "@/components/QuestionTable";
import "./index.css";
import UserQuestionPageReqDTO = API.UserQuestionPageReqDTO;
import Search from "antd/lib/input/Search";
import { getUserQuestionPage } from "@/api/question";
import QuestionVo = API.QuestionVo;

interface Props {
  searchText: string;
  questionList: API.QuestionVo[];
  total: number;
}

/**
 * 题目搜索页面
 *
 * @constructor
 */
export default function SearchQuestion(props: Props) {
  let { searchText, questionList, total } = props;

  const [searchQuestionList, setSearchQuestionList] =
    useState<QuestionVo[]>(questionList);
  const [searchTotal, setSearchTotal] = useState<number>(total);

  const [value, setValue] = useState<string>(searchText);

  const handleSearch = async (value: string) => {
    const res = await getUserQuestionPage({
      UserQuestionPageReqDTO: {
        title: value,
      } as UserQuestionPageReqDTO,
    });
    setSearchQuestionList(res.data.data?.list ?? []);
    setSearchTotal(res.data.data?.total ?? 0);
    setValue(value);
  };

  return (
    <div id="searchQuestion" className="max-width-content">
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        <Search
          style={{ width: 480, margin: "0 auto 40px" }}
          placeholder="搜索题目"
          allowClear
          enterButton="搜索"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          size="large"
          onSearch={(value) => {
            return handleSearch(value);
          }}
        />
      </div>
      <QuestionTable
        defaultQuestionList={searchQuestionList}
        defaultTotal={searchTotal}
        defaultSearchParams={
          {
            title: value as string,
          } as UserQuestionPageReqDTO
        }
      />
    </div>
  );
}
