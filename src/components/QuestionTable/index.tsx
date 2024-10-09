"use client";
import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { searchQuestionVoByPage } from "@/api/question";
import TagList from "@/components/TagList/TagList";
import { Card, Tag } from "antd";
import Link from "next/link";

interface Props {
  questionBankId?: number;
  cardTitle?: React.ReactNode;
  defaultQuestionList?: API.QuestionVo[];
  defaultTotal: number;
  defaultSearchParams?: API.UserQuestionPageReqDTO;
}

/**
 * 题目管理页面
 *
 * @constructor
 */
const QuestionTable = (props: Props) => {
  const {
    defaultQuestionList,
    defaultTotal,
    defaultSearchParams,
    cardTitle,
    questionBankId,
  } = props;
  const [questionList, setQuestionList] = useState<API.QuestionVo[]>(
    defaultQuestionList ?? [],
  );

  const [total, setTotal] = useState<number>(defaultTotal);

  const [init, setInit] = useState<boolean>(true);

  useEffect(() => {
    // 当 defaultQuestionList 或 defaultTotal 变化时，更新状态
    setQuestionList(defaultQuestionList as API.QuestionVo[]);
    setTotal(defaultTotal);
  }, [defaultQuestionList, defaultTotal]); // 依赖项列表

  const columns: ProColumns<API.QuestionVo>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      render: (_, record) => {
        return (
          <Link
            href={
              questionBankId
                ? `/bank/${questionBankId}/question/${record.id}`
                : `/question/${record.id}`
            }
          >
            {record.title}
          </Link>
        );
      },
    },
    {
      title: "仅会员可见",
      sorter: true,
      dataIndex: "needVip",
      valueEnum: {
        true: {
          text: "是",
        },
        false: {
          text: "否",
        },
      },
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "题目来源",
      dataIndex: "source",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => (
        <div>{record.source == null ? <Tag>原创</Tag> : record.source}</div>
      ),
    },
    {
      title: "标签",
      dataIndex: "tags",
      hideInSearch: true,
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tags} />;
      },
    },
  ];

  return (
    <Card className="questionTable" id="questionTable" title={cardTitle}>
      <ProTable<API.QuestionVo>
        rowKey="id"
        size={"large"}
        search={{
          labelWidth: 120,
          filterType: "light",
        }}
        pagination={{
          pageSize: 12,
          total,
        }}
        dataSource={questionList}
        // @ts-ignore
        request={async (params, sort, filter) => {
          if (init) {
            setInit(false);
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }

          const sortField = Object.keys(sort)?.[0];
          const { data } = await searchQuestionVoByPage({
            pageNo: params.current || 1,
            pageSize: params.pageSize || 12,
            title: defaultSearchParams?.title ?? params.title,
            questionBankId: defaultSearchParams?.questionBankId,
          } as API.UserQuestionPageReqDTO);
          setQuestionList(data.data?.list || []);
          setTotal(data.data?.total ?? 0);
          return {
            success: data.code === 0,
            data: data.data?.list || [],
            total: Number(data.data?.total) || 0,
          };
        }}
        columns={columns}
      />
    </Card>
  );
};
export default QuestionTable;
