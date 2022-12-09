import {RouteRecordRaw} from 'vue-router';
import {Foo} from '../views/Foo';
import {Bar} from '../views/Bar';

export const routes: RouteRecordRaw[] = [
  {path: '/foo', component: Foo},
  {path: '/bar', component: Bar}
];
