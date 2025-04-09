// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** 收藏 POST /favourite/favourite */
export async function addFavourite(body: API.FavouriteAddReqDTO, options?: { [key: string]: any }) {
  return request<API.CommonResultLong>('/favourite/favourite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消收藏 PUT /favourite/unFavourite */
export async function unFavourite(body: API.FavouriteAddReqDTO, options?: { [key: string]: any }) {
  return request<API.CommonResultBoolean>('/favourite/unFavourite', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
