import {defineComponent, PropType} from 'vue';
import s from './Tags.module.scss';
import {Icon} from '../icon/Icon';
import {Center} from '../center/Center';
import {Button} from '../button/Button';
import {useTags} from '../../hooks/useTags';
import {http} from '../../utils/http';

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<'expenses' | 'income'>,
      required: true
    }
  },
  setup(props) {
    const {tags, hasMore, fetchTags} = useTags((page) => http.get<Resource<Tag>>('/tags', {
      kind: props.kind,
      page: page + 1,
      _mock: 'tagIndex'
    }));
    return () => (
      <>
        <div class={s.tags_wrapper}>
          <div class={s.tag}>
            <div class={s.sign}>
              <Icon name={'add'} class={s.createTag}/>
            </div>
            <div class={s.name}>新增</div>
          </div>
          {tags.value.map(tag => <div class={[s.tag, s.selected]}>
            <div class={s.sign}>{tag.sign}</div>
            <div class={s.name}>{tag.name}</div>
          </div>)}
        </div>
        <Center style={{padding: '16px'}}>
          {hasMore.value ? <Button onClick={fetchTags}>加载更多</Button> : <span>没有更多</span>}
        </Center>
      </>
    );
  }
});

