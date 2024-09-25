// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** 创建题库表 POST /questionBank/add */
export async function addQuestionBank(
  body: API.QuestionBankAddReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultLong>('/questionBank/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除题库表 DELETE /questionBank/delete */
export async function deleteQuestionBank(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionBankParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/questionBank/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取题库简要表 GET /questionBank/get */
export async function getQuestionBank(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultQuestionBankVo>('/questionBank/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取题库表信息 GET /questionBank/get/vo */
export async function getQuestionBankVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankVOParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultQuestionBankSimpleVo>('/questionBank/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取题库表列表 GET /questionBank/page */
export async function getQuestionBankPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankPageParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageResultQuestionBankVo>('/questionBank/page', {
    method: 'GET',
    params: {
      ...params,
      questionBankPageReqDTO: undefined,
      ...params['questionBankPageReqDTO'],
    },
    ...(options || {}),
  });
}

/** 审核题库 POST /questionBank/review */
export async function reviewQuestionBank(
  body: API.QuestionBankReviewReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/questionBank/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量审核题库 POST /questionBank/review/batch */
export async function reviewQuestionBankBatch(
  body: API.QuestionBankBatchReviewReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/questionBank/review/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据关键词搜索题库 GET /questionBank/searchList */
export async function searchQuestionBankList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchQuestionBankListParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultListQuestionBankVo>('/questionBank/searchList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新题库表信息 PUT /questionBank/update */
export async function updateQuestionBank(
  body: API.QuestionBankUpdateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean>('/questionBank/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户分页获取题库表列表 GET /questionBank/user/page */
export async function getUserQuestionBankPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserQuestionBankPageParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageResultQuestionBankVo>('/questionBank/user/page', {
    method: 'GET',
    params: {
      ...params,
      pageParam: undefined,
      ...params['pageParam'],
    },
    ...(options || {}),
  });
}
