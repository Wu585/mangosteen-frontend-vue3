import {defineComponent} from 'vue';
import {Icon} from '../icon/Icon';
import s from './FloatButton.module.scss';

export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class={s.floatButton}>
        <Icon name={props.iconName} class={s.icon}/>
      </div>
    );
  }
});

