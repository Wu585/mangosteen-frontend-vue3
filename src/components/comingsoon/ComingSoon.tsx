import {defineComponent, PropType} from 'vue';
import s from './ComingSoon.module.scss';
import {Center} from '../center/Center';
import {Icon} from '../icon/Icon';

export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: () => {
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig}/>
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    );
  }
});

export default ComingSoon;
