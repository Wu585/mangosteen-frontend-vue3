import {defineComponent, ref, watchEffect} from 'vue';
import s from './WelcomeContent.module.scss';
import pig from '../../assets/icons/pig.svg';
import {useSwipe} from '../../hooks/useSwipe';
import {useRouter} from 'vue-router';

export const First = defineComponent({
  setup() {
    const div = ref<HTMLDivElement>();
    const {swiping, direction} = useSwipe(div, {
      beforeStart: (e) => e.preventDefault()  //阻止背紫色景跟着滑动
    });
    const router = useRouter();
    watchEffect(async () => {
      if (swiping.value && direction.value === 'left') {
        await router.push('/welcome/2');
      }
    });
    return () => (
      <div class={s.card} ref={div}>
        <img class={s.logo} src={pig} alt=""/>
        <h2>会挣钱 <br/>还要会省钱 </h2>
      </div>
    );
  }
});

