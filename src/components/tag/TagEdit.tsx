import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import s from './Tag.module.scss';
import {TagForm} from './TagForm';
import {Button} from '../button/Button';
import {BackIcon} from '../back/BackIcon';
import {useRoute} from 'vue-router';

export const TagEdit = defineComponent({
  setup() {
    const route = useRoute();
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon/>,
          default: () => <>
            <TagForm id={+route.params.id}/>
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

