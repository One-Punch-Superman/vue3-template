<template>
  <el-drawer v-model="isShowSetting" title="页面配置" size="385px">
    <div class="setting-container">
      <div class="setting-layout">
        <span class="setting-label">导航布局</span>
        <el-radio-group v-model="layout">
          <div v-for="(item, index) in LAYOUT_OPTION" :key="index">
            <el-radio-button :label="item">
              <img :src="getImageUrl(item)" alt="" />
            </el-radio-button>
          </div>
        </el-radio-group>
      </div>
      <div class="setting-hander">
        <span class="setting-label">hander背景色</span>
        <el-color-picker v-model="headerBackground" />
      </div>
      <div class="setting-sidebar">
        <span class="setting-label">sidebar背景色</span>
        <el-color-picker v-model="asideBackground" />
      </div>
      <div class="setting-footer">
        <span class="setting-label">footer显示</span>
        <el-switch v-model="showFooter" />
      </div>
      <div class="setting-info">
        <el-button @click="resetSetting">重置配置项</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store/index';
import { dynamicColor } from '@/utils/color';

const settingStore = useSettingStore();
const { isShowSetting, layout, headerBackground, asideBackground, showFooter } = storeToRefs(settingStore);
const LAYOUT_OPTION = ['side', 'top', 'mix'];

const getImageUrl = (name: string) => {
  return new URL(`/src/assets/image/${name}.png`, import.meta.url).href;
};
const resetSetting = () => {
  settingStore.resetConfig();
};

watch(headerBackground, () => {
  const color = dynamicColor(headerBackground.value);
  console.log('color', color);
});
</script>

<style lang="scss" scoped>
.setting-container {
  font-size: 14px;
  > div {
    margin-bottom: 20px;
  }
  .setting-label {
    display: inline-block;
    width: 300px;
    height: 32px;
    margin-bottom: 10px;
    line-height: 32px;
  }
  .setting-info {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    text-align: center;
  }
}
.el-radio-button {
  img {
    width: 80px;
  }
  .el-radio-button__inner {
    padding: 8px;
  }
}
:deep(.el-radio-group) {
  .el-radio-button__inner {
    padding: 8px 10px;
    margin-right: 12px;
    border: 3px solid #e8e8e8;
    border-left-width: 3px !important;
  }
  > div:nth-child(3) {
    .el-radio-button__inner {
      margin-right: 0;
    }
  }
  .el-radio-button__original-radio:checked + .el-radio-button__inner {
    background-color: #fff;
  }
}
</style>
