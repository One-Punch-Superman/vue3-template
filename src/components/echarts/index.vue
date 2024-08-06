<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
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

const chartRef = ref(null);
let myChart = null;

const resizeObserverCallback = () => {
  if (myChart) {
    myChart.resize();
  }
};
const resizeObserver = new ResizeObserver(resizeObserverCallback);

watch(
  () => props.option,
  (newOption) => {
    if (myChart) {
      myChart.setOption(newOption);
    }
  },
  { deep: true }
);

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  myChart.setOption(props.option);
  if (chartRef.value) {
    resizeObserver.observe(chartRef.value);
  }
});

onUnmounted(() => {
  if (chartRef.value) {
    resizeObserver.unobserve(chartRef.value);
  }
  if (myChart) {
    myChart.dispose();
  }
});
</script>
