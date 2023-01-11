import {defineComponent} from 'vue';
import s from './NavBar.module.scss'

export const NavBar = defineComponent({
  setup(props,{slots}) {
    return () => (
      <div class={s.navbar}>
        <span class={s.icon_wrapper}>{slots.icon?.()}</span>
        <span class={s.title_wrapper}>{slots.default?.()}</span>
      </div>
    );
  }
});

