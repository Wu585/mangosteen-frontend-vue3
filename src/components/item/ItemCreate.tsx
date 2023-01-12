import {defineComponent, ref} from 'vue';
import s from './ItemCreate.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tabs} from '../tabs/Tabs';
import {Tab} from '../tabs/Tab';

// type Item = '支出' | '收入'

export const ItemCreate = defineComponent({
  setup() {
    const selectedTabRef = ref('支出');
    const onUpdateSelected = (name: string) => {
      selectedTabRef.value = name;
    };
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon}/>,
          default: () => <div>
            <Tabs selected={selectedTabRef.value} onUpdateSelected={onUpdateSelected}>
              {/*<Tabs v-model:selected={selectedTabRef.value}>*/}
              <Tab name="支出">1</Tab>
              <Tab name="收入">2</Tab>
            </Tabs>
          </div>
        }}
      </MainLayout>
    );
  }
});

