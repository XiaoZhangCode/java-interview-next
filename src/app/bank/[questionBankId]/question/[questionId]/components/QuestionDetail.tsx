"use client";
import { Flex, Menu, message } from "antd";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Title from "antd/es/typography/Title";
import { getQuestionVo, getUserQuestionPage } from "@/api/question";
import { getQuestionBank } from "@/api/questionBank";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useLoadingStore } from "@/stores/loadingStore";
import { MenuProps } from "antd";
import QuestionVo = API.QuestionVo;
import QuestionSimpleVo = API.QuestionSimpleVo;
import QuestionBankVo = API.QuestionBankVo;

interface Props {
  questionBankId: string;
  questionId: string;
}

const QuestionDetail: React.FC<Props> = ({ questionBankId, questionId }) => {
  const [bank, setBank] = useState<QuestionBankVo>();
  const [question, setQuestion] = useState<QuestionSimpleVo>();
  const [questionList, setQuestionList] = useState<QuestionVo[]>([]);
  const [loading, setLoading] = useState(true);
  const { startLoading, stopLoading } = useLoadingStore();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isFetching = useRef(false);

  const fetchData = useCallback(async () => {
    // 如果正在获取数据，则跳过
    if (isFetching.current) return;
    
    try {
      isFetching.current = true;
      
      // 仅在首次加载或 questionId 变化时显示全局 loading
      if (isFirstLoad) {
        startLoading();
      }
      
      // 获取题库详情
      const bankRes = await getQuestionBank({
        id: parseInt(questionBankId),
      });
      if (bankRes.data?.data) {
        setBank(bankRes.data.data);
      }

      // 获取题目列表
      const questionPage = await getUserQuestionPage({
        UserQuestionPageReqDTO: {
          pageSize: 12,
          pageNo: 1,
          questionBankId: parseInt(questionBankId),
        },
      });
      setQuestionList(questionPage.data.data?.list ?? []);

      // 获取题目详情
      const questionRes = await getQuestionVo({
        id: parseInt(questionId),
      });
      if (questionRes.data?.data) {
        setQuestion(questionRes.data.data);
      }
    } catch (error: any) {
      message.error(error.message || '获取数据失败');
    } finally {
      if (isFirstLoad) {
        stopLoading();
        setIsFirstLoad(false);
      }
      setLoading(false);
      isFetching.current = false;
    }
  }, [questionBankId, questionId, isFirstLoad, startLoading, stopLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loading />;
  }

  if (!bank || !question) {
    return (
      <div className="error-container">
        <Title level={3}>获取数据失败</Title>
        <p>请刷新页面重试</p>
      </div>
    );
  }

  // 题目菜单列表
  const questionMenuItemList: MenuProps['items'] = questionList.map((q) => ({
    label: (
      <Link href={`/bank/${bank.id}/question/${q.id}`} prefetch={false}>
        {q.title}
      </Link>
    ),
    key: q.id?.toString() || '',
    type: 'item'
  }));

  return (
    <Flex gap={24}>
      <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
        <Title level={4} style={{ padding: "0 20px" }}>
          {bank.title}
        </Title>
        <Menu
          items={questionMenuItemList}
          selectedKeys={[question.id?.toString() || '']}
        />
      </Sider>
      <Content>
        <QuestionCard question={question} />
      </Content>
    </Flex>
  );
};

export default QuestionDetail; 