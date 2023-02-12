import {defineComponent, onMounted, PropType, ref, watch} from 'vue';
import s from './LineChart.module.scss';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import {getMoney} from '../money/Money';

const echartsOption = {
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: ([item]: any) => {
      const [x, y] = item.data;
      return `${dayjs(x).format('YYYY年MM月DD日')} ￥${getMoney(y)}`;
    },
  },
  grid: [{left: 16, top: 20, right: 16, bottom: 20}],
  xAxis: {
    type: 'time',
    boundaryGap: ['3%', '0%'],
    axisLabel: {
      formatter: (value: string) => dayjs(value).format('MM-DD'),
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    show: true,
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
    axisLabel: {
      show: false,
    },
  },
};

export const LineChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<[string, number][]>,
      required: true
    }
  },
  setup(props) {
    const refDiv = ref<HTMLElement>();
    let chart: echarts.ECharts | undefined = undefined;

    onMounted(() => {
      if (refDiv.value === undefined) return;
      // 基于准备好的dom，初始化echarts实例
      chart = echarts.init(refDiv.value);
      // 绘制图表
      const option = {
        ...echartsOption,
        series: [{
          data: props.data,
          type: 'line'
        }]
      };
      chart.setOption(option);
    });

    watch(() => props.data, () => {
      chart?.setOption({
        series: [{
          data: props.data,
          type: 'line'
        }]
      });
    });

    return () => (
      <div ref={refDiv} class={s.wrapper}></div>
    );
  }
});

