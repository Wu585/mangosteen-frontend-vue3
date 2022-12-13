import {defineComponent} from 'vue';
import {Button} from '../components/button/Button';
import s from './StartPage.module.scss';
import {FloatButton} from '../components/floatbutton/FloatButton';

export const StartPage = defineComponent({
  setup() {
    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button class={s.button}>button</Button>
        </div>
        <FloatButton/>
      </div>
    );
  }
});

