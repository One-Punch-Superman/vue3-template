<template>
  <div class="base">{{ str }}</div>
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
