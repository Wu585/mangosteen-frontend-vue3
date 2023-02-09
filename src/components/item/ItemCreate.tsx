import {defineComponent, onMounted, ref} from 'vue';
import s from './ItemCreate.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tabs} from '../tabs/Tabs';
import {Tab} from '../tabs/Tab';
import {InputPad} from './InputPad';
import {http} from '../../utils/http';

// type Item = '支出' | '收入'

export const ItemCreate = defineComponent({
  setup() {
    const selectedTabRef = ref('支出');
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);
    onMounted(async () => {
      const response = await http.get<{ resource: Tag[] }>('/tags', {kind: 'expenses', _mock: 'tagIndex'});
      refExpensesTags.value = response.data.resource;
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
              <Tab name="支出" class={s.tags_wrapper}>
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

