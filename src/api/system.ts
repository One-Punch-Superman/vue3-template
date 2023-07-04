import { get, post, put, del } from '@/utils/request';

export function getUserList(params: any) {
  return get(`/user/list`, params);
}

export function postUser(params: any) {
  return post(`/user`, params);
}

export function putUser(params: any) {
  return put(`/user`, params);
}

export function delUser(id: any) {
  return del(`/user/${id}`);
}
