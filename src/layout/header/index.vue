<template>
  <div class="layout-header" :style="{ color: textColor }">
    <div v-if="layout !== 'side'" class="header-logo">
      <SvgIcon name="resource" size="32"></SvgIcon>
      <span class="logo">后台管理系统</span>
    </div>
    <div v-else>
      <el-icon :size="20" v-if="isSidebarCompact" @click="changeCollapsed"><Expand /></el-icon>
      <el-icon :size="20" v-else @click="changeCollapsed"><Fold /></el-icon>
    </div>

    <div v-if="layout === 'top'">
      <Aside />
    </div>

    <div class="menu"></div>

    <el-icon :size="18" :color="textColor"><Search /></el-icon>
    <el-icon :size="18" :color="textColor"><Bell /></el-icon>
    <div class="info">
      <el-avatar>
        <img src="@/assets/logo.png" alt="" />
      </el-avatar>
      <el-dropdown trigger="click" @command="linkTo">
        <span :style="{ color: textColor }">
          {{ userInfo.name }}
          <el-icon class="el-icon--right"><ArrowDownBold /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-icon :size="18" class="icon-setting" @click="changeLayout">
      <Setting />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore, useUserStore } from '@/store';
import Aside from '@/layout/aside/index.vue';
import { dynamicColor } from '@/utils/color';

const router = useRouter();
const settingStore = useSettingStore();
const userStore = useUserStore();
const { layout, isSidebarCompact, headerBackground } = storeToRefs(settingStore);
const { userInfo } = storeToRefs(userStore);

const textColor = computed(() => dynamicColor(headerBackground.value));
const changeLayout = () => {
  settingStore.updateConfig({
    isShowSetting: true
  });
};
const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !isSidebarCompact.value
  });
};

const linkTo = (command: string) => {
  if (command == 'logout') {
    userStore.logout();
    router.push({
      path: '/login',
      query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) }
    });
  } else {
    router.push(`/${command}`);
  }
};
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  align-items: center;
  height: 100%;
  .menu {
    flex: 1;
  }
  .info {
    display: flex;
    align-items: center;
    .el-avatar {
      width: 35px;
      height: 35px;
    }
    .el-dropdown {
      margin-right: 15px;
      margin-left: 10px;
    }
  }
  > .el-icon {
    display: inline-block;
    margin-right: 18px;
  }
  .icon-setting {
    margin-right: 5px;
  }
}
.header-logo {
  display: flex;
  align-items: center;
  width: $layout-aside-width;
  height: $layout-header-height;
  cursor: pointer;
  .logo {
    margin-left: 5px;
    font-size: 22px;
    font-weight: bold;
  }
}
</style>
<!-- <style>
@media (prefers-color-scheme: dark) {
  .layout-header .el-icon,
  .layout-header .dropdown-name {
    color: #303133 !important;
  }
}
@media (prefers-color-scheme: light) {
  .layout-header .el-icon,
  .layout-header .dropdown-name {
    color: #fff !important;
  }
}
</style> -->
