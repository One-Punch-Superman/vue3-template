<template>
  <div class="layout-main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-main {
  min-width: 1200px;
  min-height: calc(100vh - $layout-header-height - 2 * $layout-main-padding);
  padding: 20px;
  color: #333;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 12px rgb(0 0 0 / 12%);
}
</style>
