<script setup>
import TheHeader from '@/components/TheHeader.vue';
import ThemeProvider from '@/components/ThemeProvider.vue';
</script>

<template>
	<theme-provider>
		<the-header />
		<main class="main">
			<router-view></router-view>
		</main>
	</theme-provider>
</template>


<style lang="scss">
@import '@/assets/main.scss';
</style>
