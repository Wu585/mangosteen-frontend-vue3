import {defineComponent, ref} from 'vue';
import s from './ItemCreate.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tabs} from '../tabs/Tabs';
import {Tab} from '../tabs/Tab';
import {InputPad} from './InputPad';
import {Tags} from './Tags';

export const ItemCreate = defineComponent({
  setup() {
    const selectedTabRef = ref('支出');
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon}/>,
          default: () => <div class={s.wrapper}>
            <Tabs class={s.tabs} v-model:selected={selectedTabRef.value}>
              {/*<Tabs v-model:selected={selectedTabRef.value}>*/}
              <Tab name="支出">
                <Tags kind={'expenses'}/>
              </Tab>
              <Tab name="收入">
                <Tags kind={'income'}/>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad/>
            </div>
          </div>
        }}
      </MainLayout>
    );
  }
});

