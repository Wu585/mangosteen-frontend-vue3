import {defineComponent, PropType} from 'vue';
import s from './Form.module.scss'

export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup(props, {slots}) {
    return () => (
      <form onSubmit={props.onSubmit} class={s.form}>
        {slots.default?.()}
      </form>
    );
  }
});

