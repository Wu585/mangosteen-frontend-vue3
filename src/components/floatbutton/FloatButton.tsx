import {defineComponent} from 'vue';
import {Icon} from '../icon/Icon';
import s from './FloatButton.module.scss';

export const FloatButton = defineComponent({
  setup() {
    return () => (
      <div class={s.floatButton}>
        <Icon name="add" class={s.icon}/>
      </div>
    );
  }
});
