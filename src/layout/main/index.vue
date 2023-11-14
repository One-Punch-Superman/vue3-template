<template>
  <div class="layout-main">
    <router-view v-slot="{ Component, route }">
      <transition name="animation" mode="out-in">
        <div>
          <component :is="Component" :key="route.path" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-main {
  min-width: 1200px;
  min-height: calc(100vh - $layout-header-height - 2 * $layout-main-padding);
}
</style>
