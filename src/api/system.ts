import { get, post, put, del } from '@/utils/request';

// 获取用户列表
export function getUserList(params: any) {
  return get(`/user/list`, params);
}

// 添加|编辑用户
export function addOrEditUser(params: any) {
  if (params.id) {
    return put(`/user`, params);
  }
  return post(`/user`, params);
}

// 删除用户
export function delUser(params: any) {
  return del(`/user`, params);
}
