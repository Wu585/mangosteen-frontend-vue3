import {defineComponent, ref} from 'vue';
import s from './ItemCreate.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tabs} from '../tabs/Tabs';
import {Tab} from '../tabs/Tab';
import {InputPad} from './InputPad';
import {Tags} from './Tags';
import {time} from '../../utils/time';

export const ItemCreate = defineComponent({
  setup() {
    const selectedTabRef = ref('支出');
    const refTagId = ref<number>();
    const refHappenAt = ref(time(new Date()).format().split('-'));
    const refAmount = ref<number>();
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon}/>,
          default: () => <div class={s.wrapper}>
            <Tabs class={s.tabs} v-model:selected={selectedTabRef.value}>
              {/*<Tabs v-model:selected={selectedTabRef.value}>*/}
              <Tab name="支出">
                <Tags kind={'expenses'} v-model:selected={refTagId.value}/>
              </Tab>
              <Tab name="收入">
                <Tags kind={'income'} v-model:selected={refTagId.value}/>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              {refAmount.value}
              <InputPad v-model:happenAt={refHappenAt.value} v-model:amount={refAmount.value}/>
            </div>
          </div>
        }}
      </MainLayout>
    );
  }
});

