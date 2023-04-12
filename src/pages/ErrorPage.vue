<script setup>
import { computed } from 'vue';
import { useCountriesStore } from '@/store/';

const store = useCountriesStore();
const errorMesage = computed(() => store.isError.message);
</script>

<template>
	<div class="error-page">
		<div class="container error-page__container">
			<h1>Something wrong</h1>
			<h2 class="text-accent">{{ errorMesage }}</h2>
			<button @click="window.location.reload()">Reload page</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.error-page {
	&__container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: calc(100vh - var(--header-height) - var(--main-padding) * 2);
	}
}
</style>