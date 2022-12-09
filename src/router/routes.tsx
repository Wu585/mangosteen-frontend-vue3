import {RouteRecordRaw} from 'vue-router';
import {Foo} from '../views/Foo';
import {Bar} from '../views/Bar';
import {Welcome} from '../views/Welcome';
import {First} from '../components/welcome/First';
import {Second} from '../components/welcome/Second';
import {Third} from '../components/welcome/Third';
import {Forth} from '../components/welcome/Forth';

export const routes: RouteRecordRaw[] = [
  {path: '/foo', component: Foo},
  {path: '/bar', component: Bar},
  {
    path: '/welcome',
    component: Welcome,
    children: [
      {path: '1', component: First},
      {path: '2', component: Second},
      {path: '3', component: Third},
      {path: '4', component: Forth},
    ]
  }
];
