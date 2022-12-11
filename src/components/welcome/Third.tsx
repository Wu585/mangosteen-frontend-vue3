import {defineComponent} from 'vue';
import s from './WelcomeContent.module.scss';
import chart from '../../assets/icons/chart.svg';

export const Third = defineComponent({
  setup() {
    return () => (
      <div class={s.card}>
        <img class={s.logo} src={chart} alt=""/>
        <h2>每日提醒<br/>不遗漏每一笔账单 </h2>
      </div>
    );
  }
});

