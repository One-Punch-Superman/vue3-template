import { defineStore } from 'pinia';
import store from '@/store';
import { login, getInfo } from '@/api/user';

const initUserInfo = {
  name: '',
  roles: ['']
};

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: { ...initUserInfo }
    };
  },
  getters: {},
  actions: {
    async userLogin() {
      // const res = await login();
      const res = {
        code: 200,
        message: '登陆成功',
        data: 'token_***'
      };
      this.token = res.data;
    },
    async getUserInfo() {
      // const res = await getInfo();
      const res = {
        code: 200,
        message: '请求成功',
        data: {
          name: 'CMZ',
          roles: ['admin']
        }
      };
      this.userInfo = res.data;
    },
    async logout() {
      this.token = '';
      this.userInfo = { ...initUserInfo };
    }
  },
  persist: true
});

export function getUserStore() {
  return useUserStore(store);
}
