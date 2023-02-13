import {defineComponent, onMounted, PropType, ref, watch} from 'vue';
import * as echarts from 'echarts';
import s from './PieChart.module.scss';
import {getMoney} from '../money/Money';

const defaultOption = {
  tooltip: {
    trigger: 'item',
    formatter: (x: any) => {
      const {name, value, percent} = x;
      return `${name}: ￥ ${getMoney(value)}, 占比 ${percent}%`;
    }
  },
  grid: [
    {left: 0, top: 0, right: 0, bottom: 0}
  ],
  series: [
    {
      type: 'pie',
      radius: '70%',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

export const PieCharts = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ name: string, value: number }[]>
    }
  },
  setup(props) {
    const refDiv = ref<HTMLDivElement>();
    let chart: echarts.ECharts | undefined = undefined;

    onMounted(() => {
      if (refDiv.value === undefined) {
        return;
      }
      // 基于准备好的dom，初始化echarts实例
      chart = echarts.init(refDiv.value);
      // 绘制图表
      chart.setOption(defaultOption);
    });

    watch(() => props.data, () => {
      chart?.setOption({
        series: [{data: props.data}]
      });
    });

    return () => (
      <div ref={refDiv} class={s.wrapper}></div>
    );
  }
});

