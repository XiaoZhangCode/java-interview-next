// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** 创建题目 POST /question/add */
export async function addQuestion(body: API.QuestionAddReqDTO, options?: { [key: string]: any }) {
  return request<API.CommonResultLong>('/question/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除题目 DELETE /question/delete */
export async function deleteQuestion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/question/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取题目 GET /question/get */
export async function getQuestion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultQuestionVo>('/question/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取题目简要信息 GET /question/get/vo */
export async function getQuestionVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionVOParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultQuestionSimpleVo>('/question/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据题目id获取到关联到题库列表 GET /question/getQuestionBankIdList */
export async function getQuestionBankIdList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankIdListParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultListQuestionBankVo>('/question/getQuestionBankIdList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据题库编号获取题目信息 GET /question/list */
export async function getQuestionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionListParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultListQuestionVo>('/question/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取题目列表 GET /question/page */
export async function getQuestionPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionPageParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageResultQuestionVo>('/question/page', {
    method: 'GET',
    params: {
      ...params,
      questionPageReqDTO: undefined,
      ...params['questionPageReqDTO'],
    },
    ...(options || {}),
  });
}

/** 审核题目 POST /question/review */
export async function reviewQuestion(
  body: API.QuestionReviewReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/question/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量审核题目 POST /question/review/batch */
export async function reviewQuestionBatch(
  body: API.QuestionBatchReviewReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/question/review/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新题目信息 PUT /question/update */
export async function updateQuestion(
  body: API.QuestionUpdateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/question/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改题目所属题库 PUT /question/updateQuestionBank */
export async function updateQuestionBank1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateQuestionBank1Params,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/question/updateQuestionBank', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户分页获取题目列表 GET /question/user/page */
export async function getUserQuestionPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserQuestionPageParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageResultQuestionVo>('/question/user/page', {
    method: 'GET',
    params: {
      ...params,
      UserQuestionPageReqDTO: undefined,
      ...params['UserQuestionPageReqDTO'],
    },
    ...(options || {}),
  });
}
