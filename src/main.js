import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store';
import router from "@/router";
import vClickOutside from '@/directives/v-click-outside';

const app = createApp(App);

app.directive('click-outside', vClickOutside);

app.use(router).use(store).mount('#root');
