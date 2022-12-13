import {defineComponent} from 'vue';
import {Button} from '../components/button/Button';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup() {
    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button class={s.button}>button</Button>
        </div>
      </div>
    );
  }
});

