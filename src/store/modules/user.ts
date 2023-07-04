import { defineStore } from 'pinia';
import store from '@/store';
import { login } from '@/api/user';

const InitUserInfo = {
  name: '',
  roles: ['']
};

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: { ...InitUserInfo }
    };
  },
  getters: {},
  actions: {
    async userLogin() {
      // const data = await login();
      const response = {
        code: 200,
        message: '登陆成功',
        data: 'token_***'
      };
      this.token = response.data;
    },
    async getUserInfo() {
      const response = {
        code: 200,
        message: '请求成功',
        data: {
          name: 'CMZ',
          roles: ['admin']
        }
      };
      this.userInfo = response.data;
    },
    async logout() {
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    }
  },
  persist: true
});

export function getUserStore() {
  return useUserStore(store);
}
