import {defineComponent, PropType} from 'vue';

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    },
    value: {
      type: String as PropType<string>
    },
  },
  setup(props, {slots}) {
    return () => (
      <div>{slots.default?.()}</div>
    );
  }
});

