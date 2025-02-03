<template>
  <div class="container">
    {{ str }}
    <el-button @click="click1">跳转</el-button>
  </div>
</template>
<script lang="ts" setup>
const str = ref('关于项目');

let time = null;
onMounted(() => {
  time = setInterval(() => {
    console.log('1111111111');
  }, 2000);

  window.addEventListener('blur', function () {
    debugger;
    console.log('页面变为不可见');
    // 页面变为不可见时的处理逻辑
  });
});

onUnmounted(() => {
  debugger;
  console.log('222');
  clearInterval(time);
});

function click1() {
  location.href = 'http://baidu.com';
  // window.open('http://baidu.com', '_blank');
}
</script>

<style lang="scss" scoped></style>
