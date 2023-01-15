import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import s from './Tag.module.scss';
import {TagForm} from './TagForm';
import {Button} from '../button/Button';

export const TagEdit = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          title: () => '创建标签',
          icon: () => <Icon name={'left'} class={s.navIcon}/>,
          default: () => <>
            <TagForm/>
            <div class={s.actions}>
              <Button level={'danger'} class={s.removeTags}>删除标签</Button>
              <Button level={'danger'} class={s.removeTagsAndItems}>删除标签和记账</Button>
            </div>
          </>
        }}
      </MainLayout>
    );
  }
});

