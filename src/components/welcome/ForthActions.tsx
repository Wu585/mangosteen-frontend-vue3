import {defineComponent} from 'vue';
import s from './WelcomeContent.module.scss';
import {RouterLink} from 'vue-router';
import {SkipFeature} from '../skip/SkipFeature';

export const ForthActions = defineComponent({
  setup() {
    return () => (
      <div class={s.actions}>
        <SkipFeature class={s.fake}/>
        <span onClick={() => localStorage.setItem('skip', 'yes')}>
          <RouterLink to="/items">完成</RouterLink>
        </span>
        <SkipFeature class={s.fake}/>
      </div>
    );
  }
});

