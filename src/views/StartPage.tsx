import {defineComponent, ref} from 'vue';
import {Button} from '../components/button/Button';
import s from './StartPage.module.scss';
import {FloatButton} from '../components/floatbutton/FloatButton';
import {Center} from '../components/center/Center';
import {Icon} from '../components/icon/Icon';
import {NavBar} from '../components/navbar/NavBar';
import {OverLay} from '../components/overlay/OverLay';

export const StartPage = defineComponent({
  setup() {
    const overlayVisibleRef = ref(false);
    const onClickMenu = () => {
      overlayVisibleRef.value = !overlayVisibleRef.value;
    };
    return () => (
      <div class={s.start_page}>
        <NavBar>
          {{
            default: () => '山竹记账',
            icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu}/>
          }}
        </NavBar>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig}/>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button}>开始记账</Button>
        </div>
        <FloatButton iconName="add"/>
        {overlayVisibleRef.value && <OverLay onClose={() => overlayVisibleRef.value = false}/>}
      </div>
    );
  }
});

