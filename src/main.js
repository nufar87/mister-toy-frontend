import { createApp } from 'vue';
import { editable } from './directives';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './styles/styles.css';
import './scss/styles.scss';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);

app.directive('editable', editable);

app.mount('#app');
