"use client";
import { Card, List } from "antd";
import "./index.css";
import Link from "next/link";
import TagList from "@/components/TagList/TagList";

interface Props {
  questionList: API.QuestionVo[];
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList = [] } = props;

  return (
    <Card className="question-list">
      <List
        dataSource={questionList}
        renderItem={(item: API.QuestionVo) => (
          <List.Item extra={<TagList tagList={item.tags} />}>
            <List.Item.Meta
              title={<Link href={`/question/${item.id}`}>{item.title}</Link>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuestionList;
