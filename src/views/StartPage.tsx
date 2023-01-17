import {defineComponent, ref} from 'vue';
import {Button} from '../components/button/Button';
import s from './StartPage.module.scss';
import {FloatButton} from '../components/floatbutton/FloatButton';
import {Center} from '../components/center/Center';
import {Icon} from '../components/icon/Icon';
import {OverLay} from '../components/overlay/OverLay';
import {RouterLink} from 'vue-router';
import {MainLayout} from '../layouts/MainLayout';
import {OverLayIcon} from '../components/overlay/OverLayIcon';

export const StartPage = defineComponent({
  setup() {
    return () => (
      <div class={s.start_page}>
        <MainLayout>
          {{
            title: () => '山竹记账',
            icon: () => <OverLayIcon/>,
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
            </>
          }}
        </MainLayout>
      </div>
    );
  }
});

