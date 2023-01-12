import {defineComponent} from 'vue';
import s from './ItemList.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';

export const ItemList = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon}/>,
          default: () => 'main'
        }}
      </MainLayout>
    );
  }
});

