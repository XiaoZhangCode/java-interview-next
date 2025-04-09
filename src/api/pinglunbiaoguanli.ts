// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** 创建评论表 POST /comment/add */
export async function addComment(body: API.CommentAddReqDTO, options?: { [key: string]: any }) {
  return request<API.CommonResultLong>('/comment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取评论表 GET /comment/get */
export async function getComment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultCommentVo>('/comment/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据题目Id 获取评论列表 GET /comment/get/list */
export async function getCommentListByQuestionId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentListByQuestionIdParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultListCommentVo>('/comment/get/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取评论表简要信息 GET /comment/get/vo */
export async function getCommentVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentVOParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultCommentSimpleVo>('/comment/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取评论表列表 GET /comment/page */
export async function getCommentPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentPageParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageResultCommentVo>('/comment/page', {
    method: 'GET',
    params: {
      ...params,
      commentPageReqDTO: undefined,
      ...params['commentPageReqDTO'],
    },
    ...(options || {}),
  });
}
