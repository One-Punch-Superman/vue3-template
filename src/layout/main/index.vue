<template>
  <div class="layout-main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-main {
  min-height: calc(100vh - 100px);
}
</style>
