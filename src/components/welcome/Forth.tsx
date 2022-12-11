import {defineComponent} from 'vue';
import s from './WelcomeContent.module.scss';
import cloud from '../../assets/icons/cloud.svg';

export const Forth = defineComponent({
  setup() {
    return () => (
      <div class={s.card}>
        <img class={s.logo} src={cloud} alt=""/>
        <h2>每日提醒<br/>不遗漏每一笔账单 </h2>
      </div>
    );
  }
});

