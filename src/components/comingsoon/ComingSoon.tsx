import {defineComponent, PropType} from 'vue';
import s from './ComingSoon.module.scss';
import {Center} from '../center/Center';
import {Icon} from '../icon/Icon';
import {Button} from '../button/Button';
import {useRouter} from 'vue-router';

export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: () => {
    const router = useRouter()
    const onClick = () => {
        router.back()
    }
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig}/>
        </Center>
        <p class={s.text}>敬请期待</p>
        <Center>
          <Button onClick={onClick}>返回</Button>
        </Center>
      </div>
    );
  }
});

export default ComingSoon;
