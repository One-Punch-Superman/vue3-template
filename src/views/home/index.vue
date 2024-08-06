<template>
  <div @click="click">点击</div>
  <div v-show="show" class="container">
    <Echarts :option="option"></Echarts>
  </div>
</template>

<script lang="ts" setup>
import Echarts from '@/components/echarts/index.vue';
const option = ref({
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line'
    }
  ]
});

onMounted(() => {
  setTimeout(() => {
    option.value.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    option.value.series[0].data = [224, 218, 135, 147, 260, 300, 400];
  }, 3000);
});

const show = ref(true);
function click() {
  show.value = !show.value;
}
</script>

<style lang="scss" scoped>
.container {
  height: 0;
}
</style>
