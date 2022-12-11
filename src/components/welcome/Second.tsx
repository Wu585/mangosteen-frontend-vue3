import {defineComponent} from 'vue';
import s from './WelcomeLayout.module.scss';
import clock from '../../assets/icons/clock.svg';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';

export const Second = defineComponent({
  setup() {
    const slots = {
      icon: () => <img class={s.logo} src={clock} alt=""/>,
      title: () => <h2>每日提醒 <br/>不遗留每一笔账单 </h2>,
      buttons: () => <>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        <RouterLink to="/welcome/3">下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </>
    };
    return () => (
      <WelcomeLayout v-slots={slots}/>
    );
  }
});

