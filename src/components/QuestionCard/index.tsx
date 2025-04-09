"use client";
import { Card, message, Select, Input, Button, Avatar, List, Space, Divider } from "antd";
import Title from "antd/es/typography/Title";
import MdViewer from "@/components/MdViewer";
import "./index.css";
import TagList from "@/components/TagList/TagList";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";
import Image from "next/image";
import { themeList } from "bytemd-plugin-theme";
import { useState } from "react";
import { UserOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";

interface Props {
  question: API.QuestionVo;
}

interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  likeNum: number;
  createTime: string;
  children?: Comment[];
}

/**
 * 题目卡片组件
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;
  const [themeValue, setThemeValue] = useState<string>("juejin");
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  useAddUserSignInRecord();

  const handleChange = (value: string) => {
    setThemeValue(value);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: 调用点赞接口
    console.log('点赞状态:', !isLiked);
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
    // TODO: 调用收藏接口
    console.log('收藏状态:', !isStarred);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      message.warning('请输入评论内容');
      return;
    }
    // TODO: 调用评论接口
    console.log('提交评论:', commentText);
    setCommentText("");
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
  };

  const handleCommentLike = (commentId: number) => {
    // TODO: 调用评论点赞接口
    console.log('点赞评论:', commentId);
  };

  return (
    <div className="question-card">
      <Card 
        bordered={false}
        actions={[
          <span
            key="list-view"
            className={`action-item ${hoveredAction === 'view' ? 'hover' : ''}`}
            onMouseEnter={() => setHoveredAction('view')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <Image
              src="/assets/view.png"
              alt="浏览"
              width={20}
              height={20}
              style={{ marginRight: 5 }}
            />
            {question.viewNum || 0}
          </span>,
          <span
            key="list-thumb"
            className={`action-item ${isLiked ? 'active' : ''} ${hoveredAction === 'thumb' ? 'hover' : ''}`}
            onClick={handleLike}
            onMouseEnter={() => setHoveredAction('thumb')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <Image
              src="/assets/thumb.png"
              alt="点赞"
              width={20}
              height={20}
              style={{ marginRight: 5 }}
            />
            {question.thumbNum || 0}
          </span>,
          <span
            key="list-favourite"
            className={`action-item ${isStarred ? 'active' : ''} ${hoveredAction === 'favourite' ? 'hover' : ''}`}
            onClick={handleStar}
            onMouseEnter={() => setHoveredAction('favourite')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <Image
              src="/assets/favourite.png"
              alt="收藏"
              width={20}
              height={20}
              style={{ marginRight: 5 }}
            />
            {question.favourNum || 0}
          </span>,
          <span
            key="list-source"
            className={`action-item ${hoveredAction === 'source' ? 'hover' : ''}`}
            onMouseEnter={() => setHoveredAction('source')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <Image
              src="/assets/source.png"
              alt="来源"
              width={20}
              height={20}
              style={{ marginRight: 5 }}
            />
            {question.source || "原创"}
          </span>,
        ]}
      >
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tags} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={question.content} theme={themeValue} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card 
        title={
          <div className="answer-header">
            <span>推荐答案</span>
            <Select
              defaultValue={themeValue}
              style={{ width: 205 }}
              onChange={handleChange}
              options={themeList.map((item) => ({
                key: item.theme,
                label: item.title,
                value: item.theme,
              }))}
            />
          </div>
        } 
        bordered={false}
      >
        <MdViewer value={question.answer} theme={themeValue} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card 
        title="评论"
        bordered={false}
      >
        <div className="comment-input">
          <Input.TextArea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="写下你的评论..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <div className="comment-submit">
            <Button type="primary" onClick={handleCommentSubmit}>
              发表评论
            </Button>
          </div>
        </div>
        <Divider />
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Space key="like" onClick={() => handleCommentLike(item.id)}>
                  <LikeOutlined />
                  <span>{item.likeNum}</span>
                </Space>,
                <Space key="reply" onClick={() => handleReply(item.id)}>
                  <MessageOutlined />
                  <span>回复</span>
                </Space>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.userAvatar} icon={<UserOutlined />} />}
                title={item.userName}
                description={
                  <div>
                    <div>{item.content}</div>
                    <div className="comment-time">{item.createTime}</div>
                    {replyingTo === item.id && (
                      <div className="reply-input">
                        <Input.TextArea
                          placeholder="写下你的回复..."
                          autoSize={{ minRows: 2, maxRows: 4 }}
                        />
                        <div className="reply-submit">
                          <Button type="primary" size="small">
                            回复
                          </Button>
                          <Button size="small" onClick={() => setReplyingTo(null)}>
                            取消
                          </Button>
                        </div>
                      </div>
                    )}
                    {item.children && item.children.length > 0 && (
                      <List
                        className="comment-children"
                        itemLayout="horizontal"
                        dataSource={item.children}
                        renderItem={(child) => (
                          <List.Item
                            actions={[
                              <Space key="like" onClick={() => handleCommentLike(child.id)}>
                                <LikeOutlined />
                                <span>{child.likeNum}</span>
                              </Space>,
                            ]}
                          >
                            <List.Item.Meta
                              avatar={<Avatar src={child.userAvatar} icon={<UserOutlined />} />}
                              title={child.userName}
                              description={
                                <div>
                                  <div>{child.content}</div>
                                  <div className="comment-time">{child.createTime}</div>
                                </div>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default QuestionCard;
