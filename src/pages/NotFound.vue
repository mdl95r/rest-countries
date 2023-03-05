<template>
	<div class="container">
		<div class="notfound">
			<h1>Page not found</h1>
			<a href="/">Go to home</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.notfound {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: calc(100vh - var(--header-height) - var(--main-padding) * 2);
	background: var(--content-background);
}
</style>