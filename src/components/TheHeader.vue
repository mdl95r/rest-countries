<script setup>
import IconSun from '@/assets/icons/icon-sun.svg?component';
import IconMoon from '@/assets/icons/icon-moon.svg?component';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const theme = computed(() => store.state.theme);

const switchTheme = () => {
	const newTheme = theme.value === 'light' ? 'dark' : 'light';
	store.commit('setTheme', newTheme);
	localStorage.setItem('theme', newTheme);
};
</script>

<template>
	<header class="header">
		<div class="container header__container">
			<h1 class="header__title">Where in the world?</h1>
			<button
				class="theme-switcher"
				@click="switchTheme"
			>
				<template v-if="theme === 'light'">
					<IconMoon width="20px" height="20px" fill="yellow" stroke="#000000"/>
					
					<span>Dark mode</span>
				</template>

				<template v-else>
					<IconSun width="20px" height="20px" stroke="yellow"/>

					<span>Light mode</span>
				</template>
			</button>
		</div>
	</header>
</template>

<style lang="scss" scoped>
@import '@/assets/_vars.scss';

.header {
	box-shadow: 0px -4px 4px -5px rgb(67 70 73 / 60%) inset;
	background: var(--header-background);

	&__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: var(--header-height);
	}

	&__title {
		font-weight: 800;

		@media (min-width: $media-lg) {
			font-size: 24px;
		}
	}
}

.theme-switcher {
	display: flex;
	align-items: center;
	position: relative;
	font-weight: 600;
	color: inherit;

	@media (min-width: $media-lg) {
		font-size: 16px;
	}

	svg {
		margin-right: 10px;
	}
}
</style>