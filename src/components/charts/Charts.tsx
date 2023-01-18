import {defineComponent, onMounted, ref} from 'vue';
import {Form} from '../form/Form';
import {FormItem} from '../form/FormItem';
import s from './Charts.module.scss';
import {LineChart} from './LineChart';
import {PieCharts} from './PieCharts';
import {Bars} from './Bars';

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

    return () => (
      <div class={s.wrapper}>
        <Form>
          <FormItem label={'类型'} type={'select'} options={[
            {value: 'expense', text: '支出'},
            {value: 'income', text: '收入'}
          ]} v-model={category.value}/>
        </Form>
        <LineChart/>
        <PieCharts/>
        <Bars/>
      </div>
    );
  }
});

