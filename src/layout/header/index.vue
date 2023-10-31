<template>
  <div class="layout-header">
    <div v-if="layout !== 'side'" class="header-log">
      <img width="180" src="@/assets/image/assets-logo-full.svg" alt="logo" />
    </div>
    <div v-if="layout === 'side'">
      <el-icon :size="20" v-if="isSidebarCompact" @click="changeCollapsed"><Expand /></el-icon>
      <el-icon :size="20" v-else @click="changeCollapsed"><Fold /></el-icon>
    </div>
    <div class="but" v-if="layout === 'top'">
      <Aside />
    </div>
    <div class="menu"></div>
    <el-icon><Search /></el-icon>
    <el-icon><Bell /></el-icon>
    <div class="info">
      <el-avatar>
        <img src="@/assets/logo.png" alt="" />
      </el-avatar>
      <el-dropdown trigger="click" size="large" @command="linkTo">
        <span class="dropdown-name">
          {{ userInfo.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="login">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-icon class="icon-setting" @click="changeLayout">
      <Setting />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { Setting, ArrowDown } from '@element-plus/icons-vue';
import { useSettingStore, useUserStore } from '@/store';
import Aside from '@/layout/aside/index.vue';

const router = useRouter();
const settingStore = useSettingStore();
const userStore = useUserStore();
const { layout, isSidebarCompact } = storeToRefs(settingStore);
const { userInfo } = storeToRefs(userStore);

onMounted(() => {
  userStore.getUserInfo();
});
const changeLayout = () => {
  settingStore.updateConfig({
    isShowSetting: true
  });
};
const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !isSidebarCompact.value,
    sidebarWidth: !isSidebarCompact.value ? '65px' : '230px'
  });
};

const linkTo = (command: string) => {
  if (command == 'login') {
    userStore.logout();
  }
  router.push(`/${command}`);
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
.header-log {
  display: flex;
  align-items: center;
  width: 230px;
  height: 60px;
}
</style>
<style>
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
</style>
