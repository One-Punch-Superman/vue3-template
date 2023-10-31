import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import 'virtual:svg-icons-register';

import globalComponent from '@/components';

import '@/style/index.scss';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(globalComponent);

app.mount('#app');
