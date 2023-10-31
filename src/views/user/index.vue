<template>
  <div class="container">{{ str }}</div>
</template>
<script lang="ts" setup>
const str = ref('个人中心');

onMounted(() => {
  console.log();
});
</script>
<style lang="scss" scoped></style>
