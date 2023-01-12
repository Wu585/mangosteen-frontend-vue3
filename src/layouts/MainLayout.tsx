import {defineComponent} from 'vue';
import s from './MainLayout.module.scss';
import {NavBar} from '../components/navbar/NavBar';

export const MainLayout = defineComponent({
  setup(props, {slots}) {
    return () => (
      <div>
        <NavBar>
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

