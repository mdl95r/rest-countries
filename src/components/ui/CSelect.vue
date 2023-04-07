<script setup>
import { ref } from 'vue';
const emit = defineEmits(['click-list-item']);

defineProps({
	selected: {
		type: String,
		required: true
	},
	items: {
		type: Array,
		required: true
	}
});

const isOpen = ref(false);

const toogleSelect = () => {
	isOpen.value = !isOpen.value;
};

const closeSelect = () => {
	isOpen.value = false;
};

</script>

<template>
	<div v-click-outside="closeSelect" class="select" :class="{ 'select_open': isOpen }" @click="toogleSelect">
		<div class="select__selected">{{ selected }}</div>
		
		<ul class="select__list">
			<li 
				v-for="item in items" 
				:key="item" 
				class="select__item" 
				@click="$emit('click-list-item', item)"
			>
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.select {
	position: relative;
	width: 100%;
	height: 48px;
	max-width: 200px;
	font-weight: 600;

	@media (max-width: 1023px) {
		font-size: 13px;
	}

	@media (min-width: 1024px) {
		height: 56px;
	}

	&__selected {
		position: relative;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		background: var(--header-background);
		color: inherit;
		box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		border-radius: 3px;
		padding: 10px 20px;

		&:after {
			position: absolute;
			top: 50%;
			right: 20px;
			transform: rotate(45deg) translateY(-50%);
			content: "";
			width: 8px;
			height: 8px;
			border-style: solid;
			border-color: var(--color-main);
			border-width: 0 1px 1px 0;
			transition: transform .3s;
		}
	}

	&__list {
		position: absolute;
		top: calc(100% + 5px);
		z-index: 5;
		max-height: 0;
		background: var(--header-background);
		border-radius: 3px;
		box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		transition: max-height .2s;
		visibility: hidden;
		width: 100%;
	}

	&_open {

		.select__selected {
			&:after {
				top: 27px;
				transform: rotate(225deg);
			}
		}

		.select__list {
			max-height: 300px;
			visibility: visible;
		}
	}


	&__item {
		padding: 10px 25px;
		cursor: pointer;

		&:active,
		&:hover {
			background: var(--content-background);
		}
	}
}
</style>