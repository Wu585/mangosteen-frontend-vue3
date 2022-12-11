import {defineComponent} from 'vue';
import s from './WelcomeContent.module.scss';
import {RouterLink} from 'vue-router';

export const FirstActions = defineComponent({
  setup() {
    return () => (
      <div class={s.actions}>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        <RouterLink to="/welcome/2">下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </div>
    );
  }
});

