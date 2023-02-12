import {computed, defineComponent, onMounted, ref} from 'vue';
import {Form} from '../form/Form';
import {FormItem} from '../form/FormItem';
import s from './Charts.module.scss';
import {LineChart} from './LineChart';
import {PieCharts} from './PieCharts';
import {Bars} from './Bars';
import {http} from '../../utils/http';

type Data1Item = {
  happened_at: string
  amount: number
}

type Data1 = Data1Item[]

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    }
  },
  setup() {
    const category = ref('expense');
    const data1 = ref<Data1>([]);
    const betterData1 = computed(() => data1.value.map(item => [item.happened_at, item.amount] as [string, number]));
    onMounted(async () => {
      const response = await http.get<{ resource: Data1, total: number }>('/items/summary', {_mock: 'itemSummary'});
      data1.value = response.data.resource;
    });

    return () => (
      <div class={s.wrapper}>
        <Form>
          <FormItem label={'类型'} type={'select'} options={[
            {value: 'expense', text: '支出'},
            {value: 'income', text: '收入'}
          ]} v-model={category.value}/>
        </Form>
        <LineChart data={betterData1.value}/>
        <PieCharts/>
        <Bars/>
      </div>
    );
  }
});

