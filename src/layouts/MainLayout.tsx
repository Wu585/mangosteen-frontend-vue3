import {defineComponent} from 'vue';
import s from './MainLayout.module.scss';
import {NavBar} from '../components/navbar/NavBar';

export const MainLayout = defineComponent({
  setup(props, {slots}) {
    return () => (
      <div class={s.wrapper}>
        <NavBar class={s.navbar}>
          {{
            default: () => slots.title?.(),
            icon: () => slots.icon?.()
          }}
        </NavBar>
        {slots.default?.()}
      </div>
    );
  }
});

