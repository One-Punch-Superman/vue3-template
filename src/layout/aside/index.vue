<template>
  <div v-if="layout === 'side'" class="header-log">
    <img v-if="!isSidebarCompact" width="180" height="60" src="@/assets/image/assets-logo-full.svg" alt="logo" />
    <img v-else width="28" height="60" src="@/assets/image/assets-t-logo.svg" alt="logo" />
  </div>
  <el-scrollbar>
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
  </el-scrollbar>
  <div class="mix-collapse" v-if="layout === 'mix'">
    <el-icon :size="20" :color="textColor" v-if="isSidebarCompact" @click="changeCollapsed"><Expand /></el-icon>
    <el-icon :size="20" :color="textColor" v-else @click="changeCollapsed"><Fold /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store';
import SubMenu from './SubMenu.vue';
import menuList from './menu';
import { dynamicColor } from '@/utils/color';

const route = useRoute();
const settingStore = useSettingStore();
const { layout, headerBackground, asideBackground, isSidebarCompact } = storeToRefs(settingStore);

const textColor = computed(() => dynamicColor(asideBackground.value));

const active = computed(() => {
  return route.path;
});

onMounted(() => {
  console.log();
});

const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !isSidebarCompact.value
  });
};
</script>

<style lang="scss" scoped>
.header-log {
  display: flex;
  align-items: center;
  height: $layout-header-height;
  padding-left: 20px;
}
.el-scrollbar {
  height: calc(100vh - $layout-header-height - 40px);
}
.el-menu {
  position: relative;
  height: calc(100vh - $layout-header-height - 40px);
  border-right: 0;
}
.el-menu--horizontal {
  height: $layout-header-height;
}
.mix-collapse {
  position: relative;
  top: 8px;
  right: 22px;
  float: right;
}
</style>
