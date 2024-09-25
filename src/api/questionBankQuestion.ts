// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** 绑定题库题目关联 POST /questionBankQuestion/bind */
export async function bindQuestionBankQuestion(
  body: API.QuestionBankQuestionAddReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultLong>('/questionBankQuestion/bind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 解绑题库题目关联 POST /questionBankQuestion/unbind */
export async function unBindQuestionBankQuestion(
  body: API.QuestionBankQuestionAddReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultLong>('/questionBankQuestion/unbind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
