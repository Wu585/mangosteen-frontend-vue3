import {defineComponent} from 'vue';
import {Button} from '../components/button/Button';
import s from './StartPage.module.scss';
import {FloatButton} from '../components/floatbutton/FloatButton';
import {Center} from '../components/center/Center';
import {Icon} from '../components/icon/Icon';

export const StartPage = defineComponent({
  setup() {
    return () => (
      <div class={s.start_page}>
        <nav>nav</nav>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig}/>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button}>button</Button>
        </div>
        <FloatButton iconName="add"/>
      </div>
    );
  }
});

