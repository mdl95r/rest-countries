/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { svg4VuePlugin } from 'vite-plugin-svg4vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: true,
		port: 3000,
	},
	plugins: [
		vue(),
		svg4VuePlugin()
	],

	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
});
