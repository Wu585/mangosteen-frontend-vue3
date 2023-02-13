import {computed, defineComponent, onMounted, ref} from 'vue';
import {Form} from '../form/Form';
import {FormItem} from '../form/FormItem';
import s from './Charts.module.scss';
import {LineChart} from './LineChart';
import {PieCharts} from './PieCharts';
import {Bars} from './Bars';
import {http} from '../../utils/http';
import dayjs from 'dayjs';

type Data1Item = {
  happened_at: string
  amount: number
}

type Data1 = Data1Item[]

type Data2Item = {
  tag_id: number
  tag: Tag
  amount: number
}

type Data2 = Data2Item[]

const DAY = 24 * 3600 * 1000;

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    }
  },
  setup(props) {
    const kind = ref('expense');
    const data1 = ref<Data1>([]);
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.startDate || !props.endDate) {
        return [];
      }
      const array: [string, number][] = [];
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime();
      const n = diff / DAY + 1;
      let data1Index = 0;
      for (let i = 0; i < n; i++) {
        const time = dayjs(props.startDate).add(i, 'day').unix() * 1000; // js时间戳 毫秒
        if (data1.value[data1Index] && (new Date(data1.value[data1Index].happened_at).getTime()) === time) {
          array.push([dayjs(time).toISOString(), data1.value[data1Index].amount]);
          data1Index += 1;
        } else {
          array.push([dayjs(time).toISOString(), 0]);
        }
      }
      return array;
    });
    onMounted(async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get<{ resource: Data1, total: number }>('/items/summary', {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: kind.value,
        group_by: 'happened_at',
        _mock: 'itemSummary'
      });
      data1.value = response.data.resource;
    });

    const data2 = ref<Data2>([]);
    const betterData2 = computed<{ name: string, value: number }[]>(() =>
      data2.value.map(item => ({name: item.tag.name, value: item.amount})));
    onMounted(async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get<{ resource: Data2, total: number }>('/items/summary', {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: kind.value,
        group_by: 'tag_id',
        _mock: 'itemSummary'
      });
      data2.value = response.data.resource;
    });

    return () => (
      <div class={s.wrapper}>
        <Form>
          <FormItem label={'类型'} type={'select'} options={[
            {value: 'expense', text: '支出'},
            {value: 'income', text: '收入'}
          ]} v-model={kind.value}/>
        </Form>
        <LineChart data={betterData1.value}/>
        <PieCharts data={betterData2.value}/>
        <Bars/>
      </div>
    );
  }
});

