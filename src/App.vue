<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>
