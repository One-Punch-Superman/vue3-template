<template>
  <el-config-provider :locale="zhCn" size="large">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
</script>
