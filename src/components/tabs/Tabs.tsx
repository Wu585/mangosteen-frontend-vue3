import {defineComponent, PropType} from 'vue';
import s from './Tabs.module.scss';
import {Tab} from './Tab';

export const Tabs = defineComponent({
  props: {
    selected: {
      type: String,
      required: true
    },
    onUpdateSelected: {
      type: Function as PropType<(name: string) => void>
    }
  },
  setup(props, {slots}) {
    return () => {
      const array = slots.default?.();
      if (!array) return null;
      for (let i = 0; i < array.length; i++) {
        if (array[i].type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children');
        }
      }
      return <div class={s.tabs}>
        <ol class={s.tabs_nav}>
          {array.map(item => <li
            onClick={() => props.onUpdateSelected?.(item.props?.name)}
            class={props.selected === item.props?.name ? s.selected : ''}>
            {item.props?.name}
          </li>)}
        </ol>
      </div>;
    };
  }
});

