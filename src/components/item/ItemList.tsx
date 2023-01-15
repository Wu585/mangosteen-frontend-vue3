import {defineComponent, ref} from 'vue';
import s from './ItemList.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tab} from '../tabs/Tab';
import {Tabs} from '../tabs/Tabs';

export const ItemList = defineComponent({
  setup() {
    const selectedTabRef = ref('本月');
    const onUpdateSelected = (name: string) => {
      selectedTabRef.value = name;
    };
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <Icon name="menu" class={s.navIcon}/>,
          default: () => <Tabs selected={selectedTabRef.value} onUpdateSelected={onUpdateSelected}>
            <Tab name={'本月'}>
              list1
            </Tab>
            <Tab name={'上个月'}>
              list2
            </Tab>
            <Tab name={'今年'}>
              list3
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

