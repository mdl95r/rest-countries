<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const theme = computed(() => store.state.theme);

onMounted(() => {
	const localTheme = localStorage.getItem('theme');

	if (localTheme) {
		store.commit('setTheme', localTheme);
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
