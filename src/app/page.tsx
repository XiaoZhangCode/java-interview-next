import Title from "antd/es/typography/Title";
import { Divider, Flex } from "antd";
import "./index.css";
import Link from "next/link";
import { getUserQuestionBankPage } from "@/api/questionBank";
import { getUserQuestionPage } from "@/api/question";
import QuestionVo = API.QuestionVo;
import QuestionBankVo = API.QuestionBankVo;
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
    let questionBankList: QuestionBankVo[] = [];
    let questionList: QuestionVo[] = [];
    try {
        let result = await getUserQuestionBankPage({
            pageParam: {
                pageSize: 12,
                pageNo: 1,
            },
        });
        console.log(result)
        questionBankList = result.data?.data?.list ?? [];
    } catch (error: any) {
        console.error("获取题库列表失败，", error);
    }

    try {
        let result = await getUserQuestionPage({
            pageParam: {
                pageSize: 12,
                pageNo: 1,
            } as API.QuestionPageReqDTO,
        });
        questionList = result.data?.data?.list ?? [];
    } catch (error: any) {
        console.error("获取题目列表失败，", error);
    }

    return (
        <div id="homePage" className="max-width-content">
            <Flex justify="space-between" align="center">
                <Title level={3}>最新题库</Title>
                <Link href={"/banks"}>查看更多</Link>
            </Flex>
            <div>
                <QuestionBankList questionBankList={questionBankList}/>
            </div>
            <Divider/>
            <Flex justify="space-between" align="center">
                <Title level={3}>最新题目</Title>
                <Link href={"/banks"}>查看更多</Link>
            </Flex>
            <div>
                <QuestionList questionList={questionList}/>
            </div>
        </div>
    );
}
