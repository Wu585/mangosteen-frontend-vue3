import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import s from './Tag.module.scss';
import {TagForm} from './TagForm';

export const TagCreate = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          title: () => '创建标签',
          icon: () => <Icon name={'left'} class={s.navIcon}/>,
          default: () => <TagForm/>
        }}
      </MainLayout>
    );
  }
});

