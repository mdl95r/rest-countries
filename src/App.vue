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

strong {
	font-weight: 600;
}

h1 {
	font-weight: 600;
	letter-spacing: 0.03em;
	color: var(--color-main);

	@media (min-width: $media-lg) {
		font-size: 33px;
	}
}

h2 {
	font-weight: 600;
	letter-spacing: 0.03em;
	color: var(--color-main);

	@media (min-width: $media-lg) {
		font-size: 26px;
	}
}

a {
	color: var(--color-main);
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
}

.input-container {
	position: relative;
	width: 100%;
	max-width: 483px;
	height: 45px;

	@media (min-width: $media-lg) {
		height: 57px;
	}

	svg {
		position: absolute;
		top: calc(50% - 12px);
		left: 30px;
	}
}

.input {
	width: 100%;
	height: 100%;
	padding: 0 76px;
	border: none;
	background: var(--header-background);
	box-shadow: 0px 0px 10px 1px rgba(11, 11, 11, 0.1);
	color: var(--color-main);
}

.search-icon {
	fill: var(--color-main);
}

.main {
	padding: var(--main-padding) 16px;
	background: var(--content-background);
	min-height: calc(100vh - var(--header-height));

	@media (min-width: $media-lg) {
		--main-padding: 46px;
	}
}

.country-img {
	width: 100%;
	max-width: 500px;

	@media (min-width: $media-lg) {
		max-width: 640px;
	}

	img {
		object-fit: cover;
	}
}

.country-title {
	font-size: 20px;
	margin-bottom: 15px;
	font-weight: 800;
}

.link {
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-main);
	background: var(--header-background);
	font-size: 16px;
	padding: 0 30px;
	height: 30px;
	box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		text-decoration: none;
	}
}

.link-back {
	height: 40px;
}

.icon-back {
	margin-right: 10px;
	fill: var(--color-main);
}

.text-accent {
	color: #ff3333;
}
</style>
