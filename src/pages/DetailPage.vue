<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import PreloadSpinner from '@/components/PreloadSpinner.vue';
import ErrorPage from './ErrorPage.vue';
import IconBack from '@/assets/icons/icon-back.svg?component';
import CardCountry from '@/components/CardCountry.vue';

const route = useRoute();
const store = useStore();

onMounted(() => {
	if (countries.value.length === 0) {
		store.dispatch('fetchAllCountries');
	}
	store.dispatch('fetchCountrybyName', route.params.country);

	document.title = route.params.country;
});

const routeCountry = computed(() => route.params.country);

watch(routeCountry, (val) => {
	document.title = val;
	store.dispatch('fetchCountrybyName', val);
});

const isLoading = computed(() => store.state.isLoading);

const isError = computed(() => store.state.isError.status);

const currrentCountry = computed(() => store.state.currentCountry);

const countries = computed(() => store.getters.countriesByRegion);

const borders = computed(() => {
	return store.getters.countriesByRegion.filter((el) => {
		if (store.state.currentCountry?.borders) {
			return store.state.currentCountry.borders.includes(el.cca3);
		}
	}).map(el => el.name.common);
});

</script>

<template>
	<template v-if="isError">
			<error-page />
		</template>

		<template v-else-if="!isLoading">

			<div class="country-detail">
				<div class="container country-detail__container">
					
					<router-link class="link link-back" to="/">
						<IconBack width="30px" height="20px" viewBox="0 0 35 35"  class="icon-back"/>Back
					</router-link>
					<img :src="currrentCountry?.flags[0]" class="country-img" :alt="currrentCountry?.name.common">

					<div class="country-detail__description">
						<h2 class="country-title">{{ currrentCountry?.name.common }}</h2>

						<card-country mode="detail" :country="currrentCountry" />

						<template v-if="borders.length > 0">
							<div class="border-countries">
								<strong>Border Countries:</strong>
								<ul class="border-countries__list">
									<li
										v-for="border in borders" 
										:key="border"
										class="border-countries__item"
									>
										<router-link :to="encodeURI(border)" class="link">
											{{ border }}
										</router-link>
									</li>
									</ul>
								</div>
						</template>
					</div>
				</div>
			</div>
		</template>

		<template v-else>
			<preload-spinner />
		</template>
</template>


<style lang="scss" scoped>
@import '@/assets/_vars.scss';

.country-detail {

	&__container {
		--col-count: 1;

		display: grid;
		grid-template-columns: repeat(var(--col-count), 1fr);
		gap: 60px;

		@media (min-width: $media-lg) {
			--col-count: 12;
		}
	}

	&__description {
		@media (min-width: $media-lg) {
			grid-column: 7 / 13;
			align-self: center;
		}
	}
}

.country-img {
	@media (min-width: $media-lg) {
		grid-column: 1 / 6;
	}
}

.country-title {
	margin-bottom: 30px;
}

.border-countries {
	margin-top: 60px;

	strong {
		flex-shrink: 0;
	}

	@media (min-width: $media-lg) {
		display: flex;
		align-items: center;
	}

	&__list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 20px;

		@media (min-width: $media-lg) {
			margin-top: 0;
			margin-left: 20px;
		}
	}
}
</style>