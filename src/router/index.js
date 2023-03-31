import { createRouter, createWebHistory } from "vue-router";
import MainPage from '@/pages/MainPage.vue';
import DetailPage from '@/pages/DetailPage.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
	{
		path: "/",
		component: MainPage,
	},
	{
		path: "/:country",
		component: DetailPage,
	},
	{
		path: '/404', name: 'NotFound', component: NotFound
	},
	{
		path: '/:catchAll(.*)', redirect: '404'
	}
];

const router = createRouter({
	routes,
	history: createWebHistory()
});

export default router;