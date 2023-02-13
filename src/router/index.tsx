import {createRouter, createWebHashHistory} from 'vue-router';
import {routes} from './routes';
import {fetchMe, mePromise} from '../utils/me';

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});

fetchMe();

router.beforeEach(async (to, from) => {
  if (to.path === '/' || to.path === '/items' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')) {
    return true;
  } else {
    return await mePromise!.then(() => true,
      () => {
        localStorage.setItem('returnTo', to.path);
        return '/sign_in';
      });
  }
});
