import {defineComponent, ref} from 'vue';
import s from './ItemCreate.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tabs} from '../tabs/Tabs';
import {Tab} from '../tabs/Tab';
import {InputPad} from './InputPad';
import {http} from '../../utils/http';
import {Button} from '../button/Button';
import {Center} from '../center/Center';
import {useTags} from '../../hooks/useTags';

export const ItemCreate = defineComponent({
  setup() {
    const selectedTabRef = ref('支出');

    const {tags: expenseTags, hasMore, fetchTags} = useTags((page) => http.get<Resource<Tag>>('/tags', {
      kind: 'expenses',
      page: page + 1,
      _mock: 'tagIndex'
    }));

    const {
      tags: incomeTags,
      hasMore: hasMore2,
      fetchTags: fetchTags2
    } = useTags((page) => http.get<Resource<Tag>>('/tags', {
      kind: 'income',
      page: page + 1,
      _mock: 'tagIndex'
    }));

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
                  {expenseTags.value.map(tag => <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>{tag.sign}</div>
                    <div class={s.name}>{tag.name}</div>
                  </div>)}
                </div>
                <Center style={{padding: '16px'}}>
                  {hasMore.value ? <Button onClick={fetchTags}>加载更多</Button> : <span>没有更多</span>}
                </Center>
              </Tab>
              <Tab name="收入">
                <div class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag}/>
                    </div>
                    <div class={s.name}>新增</div>
                  </div>
                  {incomeTags.value.map(tag =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>{tag.sign}</div>
                      <div class={s.name}>{tag.name}</div>
                    </div>
                  )}
                </div>
                <Center style={{padding: '16px'}}>
                  {hasMore2.value ? <Button onClick={fetchTags2}>加载更多</Button> : <span>没有更多</span>}
                </Center>
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

