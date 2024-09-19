"use client";
import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useState } from "react";
import { getUserQuestionPage } from "@/api/question";
import TagList from "@/components/TagList/TagList";
import { Tag } from "antd";

interface Props {
  defaultQuestionList?: API.QuestionVo[];
  defaultTotal: number;
}

/**
 * 题目管理页面
 *
 * @constructor
 */
const QuestionTable = (props: Props) => {
  const { defaultQuestionList, defaultTotal } = props;

  const [questionList, setQuestionList] = useState<API.QuestionVo[]>(
    defaultQuestionList ?? [],
  );

  const [total, setTotal] = useState<number>(defaultTotal);

  const [init, setInit] = useState<boolean>(true);


  const columns: ProColumns<API.QuestionVo>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
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
    <div className="questionTable" id="questionTable">
      <ProTable<API.QuestionVo>
        rowKey="id"
        size={"large"}
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 12,
          total,
        }}
        dataSource={questionList}
        // @ts-ignore
        request={async (params, sort, filter) => {
          if(init){
            setInit(false);
            if(defaultQuestionList&&defaultTotal){
              return ;
            }
          }

          const sortField = Object.keys(sort)?.[0];
          const { data } = await getUserQuestionPage({
            pageParam: {
              pageNo: params.current || 1,
              pageSize: params.pageSize || 12,
            },
          });
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
    </div>
  );
};
export default QuestionTable;
