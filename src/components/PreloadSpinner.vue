<template>
	<div class="preloader">
		<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
	</div>
</template>

<style lang="scss" scoped>
.preloader {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: var(--content-background);
}

.lds-ring {
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
}

.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 64px;
	height: 64px;
	margin: 6px;
	border: 6px solid var(--color-main);
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: var(--color-main) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}

@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>