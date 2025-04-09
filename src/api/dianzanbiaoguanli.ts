// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** 获取点赞表 GET /thumb/get */
export async function getThumb(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getThumbParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultThumbVo>('/thumb/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取点赞表简要信息 GET /thumb/get/vo */
export async function getThumbVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getThumbVOParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultThumbSimpleVo>('/thumb/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 点赞 POST /thumb/like */
export async function addThumb(body: API.ThumbAddReqDTO, options?: { [key: string]: any }) {
  return request<API.CommonResultLong>('/thumb/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取点赞表列表 GET /thumb/page */
export async function getThumbPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getThumbPageParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageResultThumbVo>('/thumb/page', {
    method: 'GET',
    params: {
      ...params,
      thumbPageReqDTO: undefined,
      ...params['thumbPageReqDTO'],
    },
    ...(options || {}),
  });
}

/** 取消点赞 POST /thumb/unLike */
export async function unLike(body: API.ThumbAddReqDTO, options?: { [key: string]: any }) {
  return request<API.CommonResultBoolean>('/thumb/unLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
