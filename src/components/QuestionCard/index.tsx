"use client";
import React, { useEffect, useState } from "react";
import { Card, message, Select, Input, Button, Avatar, List, Space, Divider } from "antd";
import Title from "antd/es/typography/Title";
import MdViewer from "@/components/MdViewer";
import "./index.css";
import TagList from "@/components/TagList/TagList";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";
import Image from "next/image";
import { themeList } from "bytemd-plugin-theme";
import { UserOutlined, LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import {addThumb, unLike} from "@/api/dianzanbiaoguanli";
import {addFavourite, unFavourite} from "@/api/shoucangbiaoguanli";
import {addComment, getCommentListByQuestionId} from "@/api/pinglunbiaoguanli";

interface Props {
  question:  API.QuestionSimpleVo;
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
  isLiked?: boolean;
  parentId: number;
  replyUserName?: string;
}

interface CommentResponse {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  createTime: string;
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

  useEffect(
      () => {
          setIsLiked(question.thumbStatus || false);
          setIsStarred(question.favourStatus || false);
          console.log(question)
      },
      [question]
  )

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const buildCommentTree = (comments: any[]) => {
    // 找出所有一级评论（parentId为0）
    const rootComments = comments.filter(comment => comment.parentId == 0).map(comment => ({
      ...comment,
      children: []
    }));

    // 找到每个非一级评论对应的一级评论
    comments.forEach(comment => {
      if (comment.parentId != 0) {
        // 递归查找顶层父评论
        let currentParentId = comment.parentId;
        let topParentComment = null;
        
        while (currentParentId != 0) {
          const parent = comments.find(c => c.id == currentParentId);
          if (!parent) break;
          if (parent.parentId == 0) {
            topParentComment = parent;
            break;
          }
          currentParentId = parent.parentId;
        }

        // 如果找到了顶层父评论，将当前评论添加到其子节点中
        if (topParentComment) {
          const rootComment = rootComments.find(root => root.id == topParentComment.id);
          if (rootComment) {
            rootComment.children.push(comment);
          }
        }
      }
    });

    return rootComments;
  };

  // 获取评论列表
  const fetchCommentList = async () => {
    try {
      const res = await getCommentListByQuestionId({ questionId:question.id as number });
      if (res.data?.data) {
        const commentList = res.data.data.map(item => ({
          id: item.id || 0,
          userId: item.userId || 0,
          userName: item.username || '',
          userAvatar: item.userAvatar || '',
          content: item.content || '',
          likeNum: item.likeNum || 0,
          createTime: formatDate(item.createTime || ''),
          isLiked: item.isLiked || false,
          parentId: item.parentId,
          replyUserName: item.replyUserName || ''
        }));
        setComments(buildCommentTree(commentList));
      }
    } catch (error: any) {
      message.error(error.message || '获取评论列表失败');
    }
  };

  // 初始化时获取评论列表
  useEffect(() => {
    fetchCommentList();
  }, [question.id]);

  const handleChange = (value: string) => {
    setThemeValue(value);
  };

  const handleLike = async () => {
    const param: API.ThumbAddReqDTO = {
      targetId: question.id as number,
      /** 目标类型：0-题目，1-评论 */
      targetType: "0"
    };

    try {
      if (!isLiked) {
        const res = await addThumb(param);
        if (res.data?.data) {
          setIsLiked(true);
          // 更新点赞数
          if (question.thumbNum !== undefined) {
            question.thumbNum += 1;
          }
          message.success('点赞成功');
        }
      } else {
        const res = await unLike(param);
        if (res.data?.data) {
          setIsLiked(false);
          // 更新点赞数
          if (question.thumbNum !== undefined && question.thumbNum > 0) {
            question.thumbNum -= 1;
          }
          message.success('已取消点赞');
        }
      }
    } catch (error: any) {
      message.error(error.message || '操作失败');
    }
  };

  const handleStar = async () => {
    const params: API.FavouriteAddReqDTO = {
      /** 题目id */
      questionId: question.id as number
    };

    try {
      if (!isStarred) {
        const res = await addFavourite(params);
        if (res.data?.data) {
          setIsStarred(true);
          // 更新收藏数
          if (question.favourNum !== undefined) {
            question.favourNum += 1;
          }
          message.success('收藏成功');
        }
      } else {
        const res = await unFavourite(params);
        if (res.data?.data) {
          setIsStarred(false);
          // 更新收藏数
          if (question.favourNum !== undefined && question.favourNum > 0) {
            question.favourNum -= 1;
          }
          message.success('已取消收藏');
        }
      }
    } catch (error: any) {
      message.error(error.message || '操作失败');
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      message.warning('请输入评论内容');
      return;
    }

    try {
      const params = {
        questionId: question.id,
        content: commentText.trim(),
        parentId: replyingTo || 0  // 如果是回复评论，使用对应评论ID，否则为0表示一级评论
      };

      const res = await addComment(params);
      if (res.data.code==0) {
        message.success('评论成功');
        // 重置评论框
        setCommentText("");
        // 重置回复状态
        setReplyingTo(null);
        // 重新获取评论列表
        await fetchCommentList();
      }
    } catch (error: any) {
      message.error(error.message || '评论失败');
    }
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
  };

  const handleCommentLike = async (commentId: number) => {
    const param: API.ThumbAddReqDTO = {
      targetId: commentId,
      /** 目标类型：0-题目，1-评论 */
      targetType: "1"
    };

    try {
      // 这里需要根据评论的点赞状态来判断是点赞还是取消点赞
      // 我们在 comments 数组中存储了每个评论的点赞状态
      const comment = comments.find(c => c.id === commentId);
      if (!comment?.isLiked) {
        const res = await addThumb(param);
        if (res.data?.data) {
          // 更新评论的点赞状态
          setComments(comments.map(c => {
            if (c.id === commentId) {
              return {
                ...c,
                isLiked: true,
                likeNum: (c.likeNum || 0) + 1
              };
            }
            return c;
          }));
          message.success('点赞成功');
        }
      } else {
        const res = await unLike(param);
        if (res.data?.data) {
          // 更新评论的点赞状态
          setComments(comments.map(c => {
            if (c.id === commentId) {
              return {
                ...c,
                isLiked: false,
                likeNum: Math.max((c.likeNum || 1) - 1, 0)
              };
            }
            return c;
          }));
          message.success('已取消点赞');
        }
      }
    } catch (error: any) {
      message.error(error.message || '操作失败');
    }
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
            <LikeOutlined style={{ fontSize: '18px' }} />
            <span className={`count ${isLiked ? 'active' : ''}`}>{question.thumbNum || 0}</span>
          </span>,
          <span
            key="list-favourite"
            className={`action-item ${isStarred ? 'active' : ''} ${hoveredAction === 'favourite' ? 'hover' : ''}`}
            onClick={handleStar}
            onMouseEnter={() => setHoveredAction('favourite')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <StarOutlined style={{ fontSize: '18px' }} />
            <span className={`count ${isStarred ? 'active' : ''}`}>{question.favourNum || 0}</span>
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
        {!replyingTo && (
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
        )}
        <Divider />
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <CommentItem 
              comment={item} 
              replyingTo={replyingTo}
              commentText={commentText}
              onReply={handleReply}
              onSubmit={handleCommentSubmit}
              onLike={handleCommentLike}
              onCancelReply={() => {
                setReplyingTo(null);
                setCommentText('');
              }}
              setCommentText={setCommentText}
            />
          )}
        />
      </Card>
    </div>
  );
};

const CommentItem = ({ 
  comment, 
  replyingTo, 
  commentText, 
  onReply, 
  onSubmit, 
  onLike, 
  onCancelReply,
  setCommentText,
  level = 1
}: {
  comment: Comment;
  replyingTo: number | null;
  commentText: string;
  onReply: (id: number) => void;
  onSubmit: () => void;
  onLike: (id: number) => void;
  onCancelReply: () => void;
  setCommentText: (text: string) => void;
  level?: number;
}) => {
  const renderContent = () => {
    if (level === 1) {
      return <span className="comment-content-text">{comment.content}</span>;
    } else {
      return (
        <>
          <span className="reply-text">回复</span>
          <span className="reply-user">@{comment.replyUserName}</span>
          <span className="comment-content-text">：{comment.content}</span>
        </>
      );
    }
  };

  return (
    <List.Item className="comment-item">
      <div className="comment-main">
        <div className="comment-avatar">
          <Avatar src={comment.userAvatar} icon={<UserOutlined />} />
        </div>
        <div className="comment-content">
          <div className="comment-user">{comment.userName}</div>
          <div className="comment-text">
            {renderContent()}
          </div>
          <div className="comment-footer">
            <Space size={16}>
              <span className="comment-time">{comment.createTime}</span>
              <span className={`action-item ${comment.isLiked ? 'active' : ''}`} onClick={() => onLike(comment.id)}>
                <LikeOutlined />
                <span className="action-count">{comment.likeNum}</span>
              </span>
              <span className="action-item" onClick={() => onReply(comment.id)}>
                <MessageOutlined />
                <span>回复</span>
              </span>
            </Space>
          </div>
          {replyingTo === comment.id && (
            <div className="reply-input">
              <Input.TextArea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={`回复 ${comment.userName}：`}
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
              <div className="reply-submit">
                <Button type="primary" size="small" onClick={onSubmit}>
                  回复
                </Button>
                <Button size="small" onClick={onCancelReply}>
                  取消
                </Button>
              </div>
            </div>
          )}
          {comment.children && comment.children.length > 0 && (
            <List
              className="comment-children"
              itemLayout="horizontal"
              dataSource={comment.children}
              renderItem={(child) => (
                <CommentItem
                  comment={child}
                  replyingTo={replyingTo}
                  commentText={commentText}
                  onReply={onReply}
                  onSubmit={onSubmit}
                  onLike={onLike}
                  onCancelReply={onCancelReply}
                  setCommentText={setCommentText}
                  level={level + 1}
                />
              )}
            />
          )}
        </div>
      </div>
    </List.Item>
  );
};

// 更新样式
const style = document.createElement('style');
style.innerHTML = `
.comment-item {
  padding: 16px 0 !important;
}

.comment-main {
  display: flex;
  width: 100%;
}

.comment-avatar {
  margin-right: 12px;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-user {
  font-weight: 500;
  color: #333;
  font-size: 14px;
  margin-bottom: 4px;
}

.comment-text {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 8px;
}

.comment-footer {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.comment-time {
  color: #999;
  font-size: 12px;
}

.action-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #8c8c8c;
  cursor: pointer;
  font-size: 12px;
  transition: color 0.3s;
}

.action-item:hover {
  color: #1890ff;
}

.action-item.active {
  color: #1890ff;
}

.action-item .count {
  color: inherit;
  transition: color 0.3s;
}

.action-item .count.active {
  color: #1890ff;
}

.reply-text {
  color: #8c8c8c;
  margin-right: 4px;
}

.reply-user {
  color: #1890ff;
  cursor: pointer;
}

.reply-user:hover {
  opacity: 0.8;
}

.reply-input {
  margin-top: 12px;
  background: #f7f7f7;
  padding: 12px;
  border-radius: 4px;
}

.reply-submit {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.comment-children {
  margin-top: 12px;
  margin-left: 52px;
}
`;
document.head.appendChild(style);

export default QuestionCard;
