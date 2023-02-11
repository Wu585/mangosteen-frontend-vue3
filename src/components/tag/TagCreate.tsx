import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {TagForm} from './TagForm';
import {BackIcon} from '../back/BackIcon';

export const TagCreate = defineComponent({
  setup() {
    return () => (
      <MainLayout>
        {{
          title: () => '创建标签',
          icon: () => <BackIcon/>,
          default: () => <TagForm/>
        }}
      </MainLayout>
    );
  }
});

