<template>
  <div ref="echartsRef" class="echart" :style="{ width, height }"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  option: {
    type: Object,
    default: () => {}
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  }
});

watch(
  () => props.option,
  (newOption) => {
    if (myChart.value) {
      myChart.value.setOption(newOption);
    }
  },
  { deep: true }
);

const echartsRef = ref();
const myChart = ref();

onMounted(() => {
  myChart.value = echarts.init(echartsRef.value);
  myChart.value.setOption(props.option);
  window.addEventListener('resize', function () {
    myChart.value.resize();
  });
});
</script>

<style lang="scss" scoped></style>
