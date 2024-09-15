"use client";
import React, {useEffect, useState} from "react";
import {
    Avatar,
    Card,
    Col, Drawer,
    message,
    Row,
    Select,
    Tag,
} from "antd";
import {getQuestion} from "@/api/question";
import TagList from "@/components/TagList/TagList";
import MdViewer from "@/components/MdViewer";
import Image from "next/image";
import {UserOutlined} from "@ant-design/icons";
import {themeList} from "bytemd-plugin-theme";

import moment from "moment";

interface Props {
    id: string | number | undefined;
    visible: boolean;
    onCancel: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const DetailModal: React.FC<Props> = (props) => {
    const {visible, onCancel} = props;
    const [questionDetail, setQuestionDetail] = useState<API.QuestionVo>();
    const [themeValue, setThemeValue] = useState<string>("channing-cyan");
    const handleChange = (value: string) => {
        setThemeValue(value);
    };

    const getQuestionDetail = async (id: string | number) => {
        try {
            const res = await getQuestion({
                id: id,
            } as API.getQuestionParams);
            if (res.data) {
                setQuestionDetail(res.data.data);
            }
        } catch (e: any) {
            message.error(e.message);
        }
    };

    useEffect(() => {
        if (visible && props.id != 0) {
            getQuestionDetail(props.id as string);
        }
    }, [visible]);


    return (
        <>
            <Drawer
                width={"100vw"}
                style={{
                    height: "100vh",
                    top: 0,
                    overflowY: "auto",
                    paddingBottom: 0,
                }}
                destroyOnClose
                title={"详情"}
                open={visible}
                footer={null}
                onClose={() => {
                    onCancel?.();
                }}
            >
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Card
                                bordered={true}
                                actions={[
                                    <span
                                        key="list-view"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                    <Image
                        src={`/assets/view.png`}
                        alt="浏览"
                        width={20}
                        height={20}
                        style={{marginRight: 5}}
                    />
                                        {questionDetail?.viewNum}
                  </span>,
                                    <span
                                        key="list-thumb"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                    <Image
                        src={`/assets/thumb.png`}
                        alt="点赞"
                        width={20}
                        height={20}
                        style={{marginRight: 5}}
                    />
                                        {questionDetail?.thumbNum}
                  </span>,
                                    <span
                                        key="list-favourite"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                    <Image
                        src={`/assets/favourite.png`}
                        alt="收藏"
                        width={20}
                        height={20}
                        style={{marginRight: 5}}
                    />
                                        {questionDetail?.favourNum}
                  </span>,
                                    <span
                                        key="list-source"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                    <Image
                        src={`/assets/source.png`}
                        alt="来源"
                        width={20}
                        height={20}
                        style={{marginRight: 5}}
                    />
                                        {questionDetail?.source ?? "原创"}
                  </span>,
                                ]}
                            >
                                <h2>{questionDetail?.title}</h2>
                                <div style={{marginTop: 20}}>
                                    {<TagList tagList={questionDetail?.tags}/>}
                                </div>
                                <div style={{margin: "10px 0"}}>
                                    <MdViewer value={questionDetail?.content} theme={themeValue}></MdViewer>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="site-card-wrapper" style={{marginTop: 20}}>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Card
                                title="题目信息"
                                bordered={true}
                                style={{lineHeight: 2.5}}
                            >
                                <p>
                                    作者：
                                    <Avatar
                                        style={{verticalAlign: "middle", marginRight: 5}}
                                        size="small"
                                        icon={<UserOutlined/>}
                                        src={questionDetail?.authorAvatar}
                                    ></Avatar>
                                    {questionDetail?.creatorName}
                                </p>
                                <p>
                                    审核人：
                                    <Avatar
                                        style={{verticalAlign: "middle", marginRight: 5}}
                                        size="small"
                                        icon={<UserOutlined/>}
                                        src={questionDetail?.reviewerAvatar}
                                    ></Avatar>
                                    {questionDetail?.reviewer}
                                </p>
                                <p>
                                    创建时间：
                                    {moment(questionDetail?.createTime).format(
                                        "YYYY-MM-DD HH:mm:ss",
                                    )}
                                </p>
                                <p>
                                    审核时间：
                                    {questionDetail?.reviewTime
                                        ? moment(questionDetail?.reviewTime).format(
                                            "YYYY-MM-DD HH:mm:ss",
                                        )
                                        : ""}
                                </p>
                                <p>审核信息：{questionDetail?.reviewMessage}</p>
                                <p>
                                    审核状态：
                                    {questionDetail?.reviewStatus === 0 ? (
                                        <Tag color="default">未审核</Tag>
                                    ) : questionDetail?.reviewStatus === 1 ? (
                                        <Tag color="green">通过</Tag>
                                    ) : (
                                        <Tag color="red">拒绝</Tag>
                                    )}
                                </p>
                                <p>
                                    仅会员可见：{questionDetail?.needVip == true ? "是" : "否"}
                                </p>
                            </Card>
                        </Col>
                        <Col span={20}>
                            <Card
                                title={
                                    <div style={{display: "flex", justifyContent: "left"}}>
                                        <h3>推荐答案</h3>
                                        <div style={{marginLeft: 20}}>
                                            <Select
                                                defaultValue={themeValue}
                                                style={{width: 205}}
                                                onChange={handleChange}
                                                options={themeList.map((item) => {
                                                    return {
                                                        key: item.theme,
                                                        label: item.title,
                                                        value: item.theme,
                                                    };
                                                })}
                                            />
                                        </div>
                                    </div>
                                }
                                bordered={true}
                            >
                                <MdViewer value={questionDetail?.answer} theme={themeValue}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Drawer>
        </>
    );
};
export default DetailModal;
