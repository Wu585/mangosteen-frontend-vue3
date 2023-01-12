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
      const tabs = slots.default?.();
      if (!tabs) return null;
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children');
        }
      }
      return <div class={s.tabs}>
        <ol class={s.tabs_nav}>
          {tabs.map(item => <li
            onClick={() => props.onUpdateSelected?.(item.props?.name)}
            class={props.selected === item.props?.name ? s.selected : ''}>
            {item.props?.name}
          </li>)}
        </ol>
        <div>
          {tabs.find(item => item.props?.name === props.selected)}
        </div>
      </div>;
    };
  }
});

