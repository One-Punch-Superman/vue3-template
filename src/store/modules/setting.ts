import { defineStore } from 'pinia';
import SETTING_CONFIG from '@/config/setting';

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      ...SETTING_CONFIG,
      isSidebarCompact: false, // 是否收缩sideBar
      isShowSetting: false
    };
  },
  getters: {},
  actions: {
    updateConfig(payload: any) {
      for (const key in payload) {
        if (payload[key] !== undefined) {
          this[key] = payload[key];
        }
      }
    },
    resetConfig() {
      for (const key in SETTING_CONFIG) {
        this[key] = SETTING_CONFIG[key];
      }
    }
  },
  persist: {
    paths: Object.keys(SETTING_CONFIG)
  }
});
