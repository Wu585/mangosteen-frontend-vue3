import {defineComponent, onMounted, ref} from 'vue';
import s from './ItemCreate.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tabs} from '../tabs/Tabs';
import {Tab} from '../tabs/Tab';
import {InputPad} from './InputPad';
import {http} from '../../utils/http';
import {Button} from '../button/Button';
import {Center} from '../center/Center';

export const ItemCreate = defineComponent({
  setup() {
    const selectedTabRef = ref('支出');
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);

    const refPage = ref(0);
    const refHasMore = ref(false);

    onMounted(async () => {
      const response = await http.get<Resource<Tag>>('/tags', {kind: 'expenses', _mock: 'tagIndex'});
      const {resource, pager} = response.data;
      refExpensesTags.value = resource;
      refHasMore.value = (pager.page - 1) * pager.per_page + resource.length < pager.count;
    });
    onMounted(async () => {
      const response = await http.get<{ resource: Tag[] }>('/tags', {kind: 'income', _mock: 'tagIndex'});
      refIncomeTags.value = response.data.resource;
    });
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon}/>,
          default: () => <div class={s.wrapper}>
            <Tabs class={s.tabs} v-model:selected={selectedTabRef.value}>
              {/*<Tabs v-model:selected={selectedTabRef.value}>*/}
              <Tab name="支出">
                <div class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name={'add'} class={s.createTag}/>
                    </div>
                    <div class={s.name}>新增</div>
                  </div>
                  {refExpensesTags.value.map(tag => <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>{tag.sign}</div>
                    <div class={s.name}>{tag.name}</div>
                  </div>)}
                </div>
                <Center style={{padding: '16px'}}>
                  {refHasMore.value ? <Button>加载更多</Button> : <span>没有更多</span>}
                </Center>
              </Tab>
              <Tab name="收入" class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag}/>
                  </div>
                  <div class={s.name}>新增</div>
                </div>
                {refIncomeTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>{tag.sign}</div>
                    <div class={s.name}>{tag.name}</div>
                  </div>
                )}
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

