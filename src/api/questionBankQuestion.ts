// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** 创建题库题目关联 POST /questionBankQuestion/add */
export async function addQuestionBankQuestion(
  body: API.QuestionBankQuestionAddReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultLong>('/questionBankQuestion/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除题库题目关联 DELETE /questionBankQuestion/delete */
export async function deleteQuestionBankQuestion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionBankQuestionParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/questionBankQuestion/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取题库题目关联 GET /questionBankQuestion/get */
export async function getQuestionBankQuestion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankQuestionParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultQuestionBankQuestionVo>('/questionBankQuestion/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取题库题目关联简要信息 GET /questionBankQuestion/get/vo */
export async function getQuestionBankQuestionVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankQuestionVOParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultQuestionBankQuestionSimpleVo>('/questionBankQuestion/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取题库题目关联列表 GET /questionBankQuestion/page */
export async function getQuestionBankQuestionPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankQuestionPageParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageResultQuestionBankQuestionVo>('/questionBankQuestion/page', {
    method: 'GET',
    params: {
      ...params,
      questionbankquestionPageReqDTO: undefined,
      ...params['questionbankquestionPageReqDTO'],
    },
    ...(options || {}),
  });
}

/** 更新题库题目关联信息 PUT /questionBankQuestion/update */
export async function updateQuestionBankQuestion(
  body: API.QuestionBankQuestionUpdateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/questionBankQuestion/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
