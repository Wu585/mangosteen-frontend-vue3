import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import s from './Tag.module.scss';
import {TagForm} from './TagForm';
import {Button} from '../button/Button';
import {BackIcon} from '../back/BackIcon';
import {useRoute, useRouter} from 'vue-router';
import {http} from '../../utils/http';
import {showConfirmDialog} from 'vant';
import {showDialog} from 'vant/es';
import {AxiosError} from 'axios';

export const TagEdit = defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const numberId = parseInt(route.params.id.toString());
    const onError = async (error: AxiosError) => {
      await showDialog({
        title: '提示',
        message: '删除失败'
      });
      throw error;
    };
    const onDelete = async (options?: { with_items?: boolean }) => {
      await showConfirmDialog({
        title: '删除',
        message: '你真的要删除吗？'
      });
      await http.delete(`/tags/${numberId}`, {
        with_items: options?.with_items ? 'true' : 'false'
      }, {_autoLoading: true}).catch(onError);
      router.back();
    };
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon/>,
          default: () => <>
            <TagForm id={+route.params.id}/>
            <div class={s.actions}>
              {/*<Button level={'danger'}
                      class={s.removeTags}
                      onClick={() => onDelete()}
              >删除标签</Button>*/}
              <Button level={'danger'}
                      class={s.removeTagsAndItems}
                      onClick={() => onDelete({with_items: true})}
              >删除标签(对应记账也会被删除)</Button>
            </div>
          </>
        }}
      </MainLayout>
    );
  }
});

