<template>
  <div class="base">{{ str }}</div>
  <!-- <div>Vue3视频插件 vue-video-player</div>
  <div>Vue3md编辑器 v-md-editor</div>
  <div>Vue3富文本编辑器 wangeditor</div> -->
</template>
<script lang="ts" setup>
const str = ref('概览仪表盘');

onMounted(() => {
  console.log();
});
</script>

<style lang="scss" scoped>
.base {
  height: 2000px;
  background: #fff;
}
</style>
