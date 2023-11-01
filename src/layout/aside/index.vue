<template>
  <div v-if="layout === 'side'" class="header-log">
    <img v-if="!isSidebarCompact" width="180" height="60" src="@/assets/image/assets-logo-full.svg" alt="logo" />
    <img v-else width="28" height="60" src="@/assets/image/assets-t-logo.svg" alt="logo" />
  </div>
  <el-scrollbar>
    <el-menu
      :background-color="layout === 'top' ? headerBackground : asideBackground"
      :default-active="active"
      :mode="layout === 'top' ? 'horizontal' : 'vertical'"
      :collapse="layout === 'top' ? false : isSidebarCompact"
      :unique-opened="true"
    >
      <SubMenu :menu-list="menuList" />
    </el-menu>
    <div class="mix-collapse" v-if="layout === 'mix'">
      <el-icon :size="20" v-if="isSidebarCompact" @click="changeCollapsed"><Expand /></el-icon>
      <el-icon :size="20" v-else @click="changeCollapsed"><Fold /></el-icon>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store';
import SubMenu from './SubMenu.vue';
import menuList from './menu';

const route = useRoute();
const settingStore = useSettingStore();
const { layout, headerBackground, asideBackground, isSidebarCompact } = storeToRefs(settingStore);

const active = computed(() => {
  return route.path;
});

onMounted(() => {
  console.log();
});

const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !isSidebarCompact.value,
    sidebarWidth: !isSidebarCompact.value ? '65px' : '230px'
  });
};
</script>

<style lang="scss" scoped>
.header-log {
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 20px;
}
.el-menu {
  position: relative;
  height: calc(100vh - 60px);
  border-right: 0;
}
.el-menu--horizontal {
  height: 60px;
}
.mix-collapse {
  position: absolute;
  right: 20px;
  bottom: 15px;
}
</style>
