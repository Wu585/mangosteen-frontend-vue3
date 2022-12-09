import {createApp} from 'vue';
import {App} from './App';
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import {Foo} from './views/Foo';
import {Bar} from './views/Bar';

const routes: RouteRecordRaw[] = [
  {path: '/foo', component: Foo},
  {path: '/bar', component: Bar}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');
