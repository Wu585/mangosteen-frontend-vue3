import {defineComponent, PropType} from 'vue';
import s from './Tabs.module.scss';
import {Tab} from './Tab';

export const Tabs = defineComponent({
  props: {
    classPrefix: {
      type: String
    },
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
      const cp = props.classPrefix;
      return <div class={[s.tabs, cp && cp + '_tabs']}>
        <ol class={[s.tabs_nav, cp && cp + '_tabs_nav']}>
          {tabs.map(item => <li
            onClick={() => props.onUpdateSelected?.(item.props?.name)}
            class={[props.selected === item.props?.name ? [s.selected, cp && cp + '_selected'] : '',
              cp && cp + '_nav_item']}>
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

