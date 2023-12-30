<template>
  <div class="layout-container">
    <el-container v-if="layout === 'side'">
      <el-aside :style="{ background: asideBackground }" :class="{ compact: isSidebarCompact }">
        <Aside />
      </el-aside>
      <el-container>
        <el-header :style="{ background: headerBackground }">
          <Header />
        </el-header>
        <el-main>
          <Main />
          <el-footer v-if="showFooter"><Footer /></el-footer>
        </el-main>
      </el-container>
    </el-container>

    <el-container v-else>
      <el-header :style="{ background: headerBackground }">
        <Header />
      </el-header>
      <el-container>
        <el-aside
          v-if="layout === 'mix'"
          :style="{ background: asideBackground }"
          :class="{ compact: isSidebarCompact }"
        >
          <Aside />
        </el-aside>
        <el-main>
          <Main />
          <el-footer v-if="showFooter"><Footer /></el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <SettingDrawer></SettingDrawer>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue';
import Aside from '@/layout/aside/index.vue';
import Main from '@/layout/main/index.vue';
import Footer from '@/layout/footer/index.vue';
import SettingDrawer from '@/layout/setting.vue';
import { useSettingStore } from '@/store';

const settingStore = useSettingStore();
const { layout, headerBackground, asideBackground, showFooter, isSidebarCompact } = storeToRefs(settingStore);
</script>

<style lang="scss" scoped>
.layout-container {
  background: #f0f2f5;
  .el-header {
    height: $layout-header-height;
    border-bottom: 1px solid #e8e8e8;
  }
  .el-aside {
    width: $layout-aside-width;
    overflow: hidden;
    border-right: 1px solid #e8e8e8;
    transition: width 0.3s;
  }
  .el-main {
    height: calc(100vh - $layout-header-height);
    padding: $layout-main-padding;
  }
  .el-footer {
    height: 40px;
  }
  .compact {
    width: 65px;
  }
}
</style>
