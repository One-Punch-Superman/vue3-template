<template>
  <div class="layout-main">
    <router-view> </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-main {
  min-width: 1200px;
  min-height: calc(100vh - 100px);
}
</style>
