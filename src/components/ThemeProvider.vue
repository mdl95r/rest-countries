<script setup>
import { onMounted, computed } from 'vue';
import { useCountriesStore } from '@/store/';

const store = useCountriesStore();

const theme = computed(() => store.theme);

onMounted(() => {
	const localTheme = localStorage.getItem('theme');

	if (localTheme) {
		store.theme = localTheme;
	} else {
		localStorage.setItem('theme', 'light');
	}
});
</script>

<template>
	<div class="theme" :class="theme">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
.theme {
	color: var(--color-main);
}
</style>
