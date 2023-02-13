import {defineComponent, PropType} from 'vue';
import s from './Tags.module.scss';
import {Icon} from '../icon/Icon';
import {Center} from '../center/Center';
import {Button} from '../button/Button';
import {useTags} from '../../hooks/useTags';
import {http} from '../../utils/http';
import {RouterLink, useRouter} from 'vue-router';

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<'expenses' | 'income'>,
      required: true
    },
    selected: {
      type: Number
    }
  },
  emits: ['update:selected'],
  setup(props, context) {
    const router = useRouter();
    const {tags, hasMore, fetchTags} = useTags((page) => http.get<Resources<Tag>>('/tags', {
      kind: props.kind,
      page: page + 1,
      per_page: 25,
      _mock: 'tagIndex'
    }));
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id);
    };
    let timer: NodeJS.Timer | undefined = undefined;
    let currentTag: HTMLDivElement | undefined = undefined;
    const onLongPress = async (tagId: Tag['id']) => {
      localStorage.setItem('returnTo', router.currentRoute.value.fullPath);
      await router.push(`/tags/${tagId}/edit?kind=${props.kind}`);
    };
    const onTouchstart = (e: TouchEvent, tag: Tag) => {
      currentTag = e.currentTarget as HTMLDivElement;
      timer = setTimeout(() => {
        onLongPress(tag.id);
      }, 500);
    };
    const onTouchend = (e: TouchEvent) => {
      clearTimeout(timer);
    };
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (currentTag !== pointedElement && currentTag?.contains(pointedElement) === false) {
        clearTimeout(timer);
      }
    };
    return () => (
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
          <div class={s.tag}>
            <RouterLink to={`/tags/create?kind=${props.kind}`}>
              <div class={s.sign}>
                <Icon name={'add'} class={s.createTag}/>
              </div>
              <div class={s.name}>新增</div>
            </RouterLink>
          </div>
          {tags.value.map(tag =>
            <div onClick={() => onSelect(tag)}
                 onTouchstart={(e) => onTouchstart(e, tag)}
                 onTouchend={onTouchend}
                 class={[s.tag, props.selected === tag.id ? s.selected : '']}>
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

