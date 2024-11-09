<template>
  <div id="china_map_box">
    <div id="china_map"></div>
  </div>
  <!-- <SvgIcon name="resource"></SvgIcon> -->
  <!-- <div>Vue3视频插件 vue-video-player</div>
  <div>Vue3md编辑器 v-md-editor</div>
  <div>Vue3富文本编辑器 wangeditor</div> -->
</template>

<script setup>
import * as echarts from 'echarts';
import { autoPlay } from './autoPlay.ts';
import chinaJson from './china.json';
echarts.registerMap('china', chinaJson);

const options = reactive({
  tooltip: {
    alwaysShowContent: true,
    triggerOn: 'click', // mousemove
    padding: 8,
    borderWidth: 1,
    borderColor: '#409eff',
    backgroundColor: 'rgba(255,255,255,0.7)',
    textStyle: {
      color: '#000',
      fontSize: 13
    },
    position: function (point, params, dom, rect, size) {
      // 固定在顶部
      return [point[0], point[1]];
    }
  },
  geo: {
    map: 'china',
    scaleLimit: {
      min: 1,
      max: 2
    },
    zoom: 1,
    top: 0,
    bottom: 0,
    // left: 0,
    // right: 0,
    label: {
      show: true,
      fontSize: 12,
      color: 'rgba(0,0,0,0.7)' // 地域文字颜色
    },
    itemStyle: {
      normal: {
        areaColor: '#fff', // 地域颜色
        borderColor: 'rgba(0, 0, 0, 0.2)'
      },
      emphasis: {
        areaColor: '#f2d5ad',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0
      }
    }
  },
  series: [
    {
      name: '突发事件',
      type: 'map',
      geoIndex: 0,
      data: []
    }
  ]
});
const dataList = [
  {
    name: '北京',
    value: 540
  },
  {
    name: '天津',
    value: 130
  },
  {
    name: '上海',
    value: 400
  },
  {
    name: '重庆',
    value: 750
  },
  {
    name: '海南',
    value: 750
  }
];

onMounted(() => {
  setEchartOption();
  nextTick(() => {
    initEchartMap();
  });
});

function initEchartMap() {
  const myChart = echarts.init(document.getElementById('china_map'));
  myChart.setOption(options);

  autoPlay(myChart, options.series[0].data.length, 3000);
  // for (let i = 0; i < dataList.length; i++) {
  //   myChart.dispatchAction({
  //     type: 'showTip',
  //     seriesIndex: 0, // 系列索引，根据实际情况调整
  //     dataIndex: i // 当前数据索引
  //   });
  //   // 可以添加延时，以便观察每个提示框的显示效果
  //   setTimeout(function () {
  //     myChart.dispatchAction({
  //       type: 'hideTip'
  //     });
  //   }, 1000);
  // }

  window.addEventListener('resize', function () {
    myChart.resize();
  });
}
// 修改echart配制
function setEchartOption() {
  options.series[0].data = dataList;
}
</script>

<style>
#china_map_box {
  position: relative;
  height: 100%;
}
#china_map_box #china_map {
  height: 100%;
}
#china_map_box .china_map_logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
}
#china_map .tooltip_style {
  overflow: hidden;
  line-height: 1.7;
}
#china_map .tooltip_left {
  float: left;
}
#china_map .tooltip_right {
  float: right;
}
</style>
