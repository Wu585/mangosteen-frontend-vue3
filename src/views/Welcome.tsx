import {defineComponent, Transition, VNode} from 'vue';
import {RouterView} from 'vue-router';
import s from './Welcome.module.scss';
import logo from '../assets/icons/mangosteen.svg';

export const Welcome = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={logo} alt=""/>
          <h1>山竹记账</h1>
        </header>
        <main>
          <RouterView name="main">
            {({Component: Content}: { Component: VNode }) =>
              <Transition enterFromClass={s.slide_fade_enter_from} enterActiveClass={s.slide_fade_enter_active}
                          leaveToClass={s.slide_fade_leave_to} leaveActiveClass={s.slide_fade_leave_active}>
                {Content}
              </Transition>}
          </RouterView>
        </main>
        <footer><RouterView name="footer"/></footer>
      </div>
    );
  }
});

