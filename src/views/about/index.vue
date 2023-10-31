<template>
  <div class="container">{{ str }}</div>
</template>
<script lang="ts" setup>
const str = ref('关于项目');

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
