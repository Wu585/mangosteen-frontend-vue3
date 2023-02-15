import {createApp} from 'vue';
import {App} from './App';
import {router} from './router';
import '@svgstore';
import 'vant/lib/index.css';
import {createPinia} from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
