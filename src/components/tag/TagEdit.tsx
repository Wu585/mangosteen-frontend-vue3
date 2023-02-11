import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import s from './Tag.module.scss';
import {TagForm} from './TagForm';
import {Button} from '../button/Button';
import {BackIcon} from '../back/BackIcon';

export const TagEdit = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          title: () => '创建标签',
          icon: () => <BackIcon/>,
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

