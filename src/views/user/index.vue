<template>
  <div class="user">{{ str }}</div>
</template>
<script lang="ts" setup>
const str = ref('个人中心');

onMounted(() => {
  console.log();
});
</script>
<style lang="scss" scoped>
.user {
  height: calc(100vh - 100px);
  background: #fff;
}
</style>
