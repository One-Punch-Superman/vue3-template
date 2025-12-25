<template>
  <div v-if="layout === 'side'" class="header-logo" :style="{ color: textColor }" @click="toHome">
    <SvgIcon name="resource" :size="32" :color="textColor"></SvgIcon>
    <span v-if="!isSidebarCompact" class="logo">后台管理系统</span>
  </div>

  <el-menu
    :background-color="layout === 'top' ? headerBackground : asideBackground"
    :text-color="textColor"
    :default-active="active"
    :mode="layout === 'top' ? 'horizontal' : 'vertical'"
    :collapse="layout === 'top' ? false : isSidebarCompact"
    :unique-opened="true"
  >
    <SubMenu :menu-list="menuList" />
  </el-menu>

  <div v-if="layout === 'mix'" class="mix-collapse">
    <el-icon v-if="isSidebarCompact" :size="20" :color="textColor" @click="changeCollapsed">
      <Expand />
    </el-icon>
    <el-icon v-else :size="20" :color="textColor" @click="changeCollapsed">
      <Fold />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store';
import SubMenu from './SubMenu.vue';
import menuList from './menu';
import { dynamicColor } from '@/utils/color';

const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
const { layout, headerBackground, asideBackground, isSidebarCompact } = storeToRefs(settingStore);

const textColor = computed(() => {
  const background = layout.value === 'top' ? headerBackground.value : asideBackground.value;
  return dynamicColor(background);
});

const active = computed(() => {
  return route.path;
});

const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !isSidebarCompact.value
  });
};

const toHome = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped>
.header-logo {
  display: flex;
  align-items: center;
  height: $layout-header-height;
  padding-left: 20px;
  cursor: pointer;
  .logo {
    margin-left: 15px;
    overflow: hidden;
    font-size: 22px;
    font-weight: bold;
    line-height: 32px;
    white-space: nowrap;
    transition: width 0.3s ease;
  }
}
.el-menu {
  position: relative;
  height: calc(100vh - $layout-header-height - 40px);
  overflow: auto;
  border-right: 0;
}
.el-menu::-webkit-scrollbar {
  display: none;
}
.el-menu--horizontal.el-menu {
  height: $layout-header-height;
  border-bottom: 0;
}
.mix-collapse {
  position: relative;
  top: 8px;
  right: 22px;
  float: right;
}
</style>
