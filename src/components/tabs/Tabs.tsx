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
    },
    rerenderOnSelect: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:selected'],
  setup(props, {slots, emit}) {
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
            onClick={() => emit('update:selected', item.props?.value)}
            class={[props.selected === item.props?.name ? [s.selected, cp && cp + '_selected'] : '',
              cp && cp + '_nav_item']}>
            {item.props?.name}
          </li>)}
        </ol>
        {props.rerenderOnSelect ? <div key={props.selected}>
            {tabs.find(item => item.props?.value === props.selected)}
          </div> :
          <div>
            {tabs.map(item => <div v-show={item.props?.value === props.selected}>
              {item}
            </div>)}
          </div>}
      </div>;
    };
  }
});

