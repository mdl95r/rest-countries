<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import CSelect from '@/components/ui/CSelect.vue';
import PreloadSpinner from '@/components/PreloadSpinner.vue';
import CardCountry from '@/components/CardCountry.vue';
import ErrorPage from './ErrorPage.vue';
import IconSearch from '@/assets/icons/icon-search.svg?component';

const items = ref(['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']);
const searchCountry = ref('');
const selected = ref('Filter by region');

const router = useRouter();
const store = useStore();
const route = useRoute();

onMounted(() => {
	store.dispatch('fetchAllCountries');
	store.commit('setSearchCountry', route.query.country || '');
	searchCountry.value = route.query.country || '';
	document.title = 'Rest countries';
});

const countries = computed(() => {
	return store.getters.countriesByRegion;
});

const selectValue = (value) => {
	selected.value = value;
};

const isLoading = computed(() => store.state.isLoading);

const isError = computed(() => store.state.isError.status);

watch(searchCountry, (val) => {
	store.commit('setSearchCountry', val);
	router.push({ path: '/', query: { country: val } });
});

watch(selected, (val) => {
	store.commit('setRegion', val);
});

function selectCountry() {
	store.commit('setSearchCountry', '');
	store.commit('setRegion', 'all');
}
</script>

<template>

	<template v-if="isError">
		<error-page />
	</template>

	<template v-else-if="!isLoading">
		<div class="container actions-container">
			<div class="input-container">
				<IconSearch width="1.4rem" height="1.4rem" viewBox="0 0 50 50" class="search-icon"/>

				<input 
					v-model="searchCountry"
					class="input"
					type="text"
					placeholder="Search for a country"
				>
			</div>

			<CSelect :selected="selected" :items="items" @click-list-item="selectValue"/>
		</div>

		<div class="countries">
			<div class="container">
				<ul class="countries-list">
					<transition-group name="countries-list">
						<li v-for="country in countries" :key="country.name.common" class="country-item">
							<router-link :to="country.name.common" @click="selectCountry">
								<div class="country-img">
									<img :src="country.flags[0]" :alt="country.name.common" loading="lazy">
								</div>
		
								<div class="country-item__body">
									<h2 class="country-title">{{ country?.name.common }}</h2>
		
									<card-country :country="country" />
								</div>
							</router-link>
						</li>
					</transition-group>
				</ul>
			</div>
		</div>
	</template>

	<template v-else>
		<preload-spinner />
	</template>
</template>

<style lang="scss" scoped>
@import '@/assets/_vars.scss';

.actions-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	row-gap: 42px;

	@media (min-width: $media-lg) {
		flex-direction: row;
		justify-content: space-between;
	}
}

.countries {
	margin-top: 33px;

	@media (min-width: $media-lg) {
		margin-top: 48px;
	}
}

.countries-list {
	--col-count: 2;

	display: grid;
	gap: 40px;

	@media (max-width: $media-sm-1) {
		max-width: 265px;
		margin: 0 auto;
	}

	@media (min-width: $media-sm) {
		grid-template-columns: repeat(var(--col-count), 1fr);
	}

	@media (min-width: $media-md) {
		gap: 30px;

		--col-count: 3;
	}

	@media (min-width: $media-lg) {
		--col-count: 4;
	}

	@media (min-width: $media-xl) {
		gap: 76px;
	}
}

.countries-list-enter-active,
.countries-list-leave-active {
	transition: all 1.5s ease;
}

.countries-list-enter-from,
.countries-list-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

.country-item {
	box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	background: var(--header-background);
	cursor: pointer;
	transition: transform .3s;

	@media (min-width: $media-lg) {
		&:hover {
			transform: scale(1.05);
		}
	}

	&:hover {
		text-decoration: none;
	}

	&__body {
		display: flex;
		flex-direction: column;
		padding: 22px 22px 42px;

		@media (min-width: $media-lg) {
			padding: 30px 20px;
		}
	}
}

.country-img {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 160px;

	img {
		width: 100%;
		height: 100%;
	}
}
</style>