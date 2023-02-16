import {defineComponent, onMounted, PropType, ref} from 'vue';
import {Icon} from '../icon/Icon';
import s from './OverLay.module.scss';
import {RouterLink, useRouter} from 'vue-router';
import {mePromise} from '../../utils/me';
import {showConfirmDialog} from 'vant';

export const OverLay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup(props) {
    const onClose = () => {
      props.onClose?.();
    };
    const me = ref<User>();
    const router = useRouter();
    onMounted(async () => {
      const response = await mePromise;
      me.value = response?.data.resource;
    });
    const onClickSignIn = async () => {
      localStorage.setItem('returnTo', router.currentRoute.value.fullPath);
      await router.push('/sign_in');
    };
    const onSignOut = async () => {
      await showConfirmDialog({
        title: '提示',
        message: '你真的要退出登录吗？'
      });
      localStorage.removeItem('jwt');
      await router.push('/sign_in');
    };
    return () => (
      <>
        <div class={s.mask} onClick={onClose}/>
        <div class={s.overlay}>
          {me.value ? <section class={s.currentUser}>
              <h2 class={s.email}>{me.value.email}</h2>
              <p onClick={onSignOut}>点击这里注销</p>
            </section> :
            <section class={s.currentUser} onClick={onClickSignIn}>
              <h2>未登录用户</h2>
              <p>点击这里登录</p>
            </section>
          }

          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to={'/items'} class={s.action}>
                  <Icon name="pig" class={s.icon}/>
                  <span>记账</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to={'/statistics'} class={s.action}>
                  <Icon name="charts" class={s.icon}/>
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to={'/export'} class={s.action}>
                  <Icon name="export" class={s.icon}/>
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to={'/notify'} class={s.action}>
                  <Icon name="notify" class={s.icon}/>
                  <span>提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
});

