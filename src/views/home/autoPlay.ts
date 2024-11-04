export function autoPlay(myChart, num, time) {
  const defaultData = {
    // 设置默认值
    time: 3000,
    num: 100
  };
  if (!time) {
    time = defaultData.time;
  }
  if (!num) {
    num = defaultData.num;
  }
  let count = 0;
  let timeTicket = null;
  timeTicket && clearInterval(timeTicket);
  timeTicket = setInterval(() => {
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0 // serieIndex的索引值   可以触发多个
    });
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: count
    });
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: count
    });
    count++;
    if (count >= num) {
      count = 0;
    }
  }, time);
  myChart.on('mouseover', (params) => {
    clearInterval(timeTicket);
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0
    });
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    });
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    });
  });

  myChart.on('mouseout', () => {
    timeTicket && clearInterval(timeTicket);
    timeTicket = setInterval(() => {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0 // serieIndex的索引值   可以触发多个
      });
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: count
      });
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: count
      });
      count++;
      if (count >= num) {
        count = 0;
      }
    }, time);
  });
  return timeTicket;
}
export default { autoPlay };
