import {defineComponent} from 'vue';
import s from './WelcomeContent.module.scss';
import {RouterLink} from 'vue-router';
import {SkipFeature} from '../skip/SkipFeature';

export const FirstActions = defineComponent({
  setup() {
    return () => (
      <div class={s.actions}>
        <SkipFeature class={s.fake}/>
        <RouterLink to="/welcome/2">下一页</RouterLink>
        <SkipFeature/>
      </div>
    );
  }
});

