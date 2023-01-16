import {defineComponent, ref} from 'vue';
import s from './ItemList.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tab} from '../tabs/Tab';
import {Tabs} from '../tabs/Tabs';
import {ItemSummary} from './ItemSummary';
import dayjs from 'dayjs';
import {getFirstDay, getLastDay} from '../../utils/timeUtils';

export const ItemList = defineComponent({
  setup() {
    const selectedTabRef = ref('本月');
    const onUpdateSelected = (name: string) => {
      selectedTabRef.value = name;
    };
    const timeList = [
      {startDate: getFirstDay(), endDate: getLastDay()},
      {startDate: getFirstDay(-1), endDate: getLastDay(-1)},
      {startDate: getFirstDay(0, 'year'), endDate: getLastDay(0, 'year')},
    ];
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <Icon name="menu" class={s.navIcon}/>,
          default: () => <Tabs selected={selectedTabRef.value} onUpdateSelected={onUpdateSelected}>
            <Tab name={'本月'}>
              <ItemSummary startDate={timeList[0].startDate} endDate={timeList[0].endDate}/>
            </Tab>
            <Tab name={'上个月'}>
              <ItemSummary startDate={timeList[1].startDate} endDate={timeList[1].endDate}/>
            </Tab>
            <Tab name={'今年'}>
              <ItemSummary startDate={timeList[2].startDate} endDate={timeList[2].endDate}/>
            </Tab>
            <Tab name={'自定义时间'}>
              list4
            </Tab>
          </Tabs>
        }}
      </MainLayout>
    );
  }
});

