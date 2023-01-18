import {defineComponent, onMounted, ref} from 'vue';
import {Form} from '../form/Form';
import {FormItem} from '../form/FormItem';
import s from './Charts.module.scss';
import * as echarts from 'echarts';

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    }
  },
  setup() {
    const category = ref('expense');
    const refDiv = ref<HTMLElement>();
    onMounted(() => {
      if (refDiv.value === undefined) return;
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(refDiv.value);
      // 绘制图表
      const option = {
        grid: [{left: 0, top: 0, right: 0, bottom: 20}],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };
      myChart.setOption(option);
    });
    return () => (
      <div class={s.wrapper}>
        <Form>
          <FormItem label={'类型'} type={'select'} options={[
            {value: 'expense', text: '支出'},
            {value: 'income', text: '收入'}
          ]} v-model={category.value}/>
        </Form>
        <div ref={refDiv} class={s.demo}></div>
      </div>
    );
  }
});

