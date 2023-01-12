import {defineComponent, ref} from 'vue';
import {Button} from '../components/button/Button';
import s from './StartPage.module.scss';
import {FloatButton} from '../components/floatbutton/FloatButton';
import {Center} from '../components/center/Center';
import {Icon} from '../components/icon/Icon';
import {NavBar} from '../components/navbar/NavBar';
import {OverLay} from '../components/overlay/OverLay';
import {RouterLink} from 'vue-router';
import {MainLayout} from '../layouts/MainLayout';

export const StartPage = defineComponent({
  setup() {
    const overlayVisibleRef = ref(false);
    const onClickMenu = () => {
      overlayVisibleRef.value = !overlayVisibleRef.value;
    };
    return () => (
      <div class={s.start_page}>
        <MainLayout>
          {{
            title: () => '山竹记账',
            icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu}/>,
            default: () => <>
              <Center class={s.pig_wrapper}>
                <Icon name="pig" class={s.pig}/>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add"/>
              </RouterLink>
              {overlayVisibleRef.value && <OverLay onClose={() => overlayVisibleRef.value = false}/>}
            </>
          }}
        </MainLayout>
      </div>
    );
  }
});

