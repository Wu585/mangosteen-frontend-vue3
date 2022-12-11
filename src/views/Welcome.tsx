import {defineComponent, ref, Transition, VNode, watchEffect} from 'vue';
import {RouterView} from 'vue-router';
import s from './Welcome.module.scss';
import {useSwipe} from '../hooks/useSwipe';

export const Welcome = defineComponent({
  setup() {
    const main = ref<HTMLElement | null>(null);
    const {direction} = useSwipe(main);
    watchEffect(() => {
      console.log(direction.value);
    });
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref="#mangosteen"></use>
          </svg>
          <h1>山竹记账</h1>
        </header>
        <main ref={main}>
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

