import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import { createPinia } from 'pinia';
import vClickOutside from '@/directives/v-click-outside';

const app = createApp(App);

app.directive('click-outside', vClickOutside);

app.use(router).use(createPinia()).mount('#root');
