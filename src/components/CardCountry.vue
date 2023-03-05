<script setup>
defineProps({
	mode: {
		type: String,
		default: 'card'
	},
	country: {
		type: [Object, null],
		required: true
	}
});
</script>

<template>
	<ul class="country-description" :class="mode">
		<template v-if="mode === 'card'">
			<li><strong>Population:</strong> {{ country.population.toLocaleString() }}</li>
			<li><strong>Region:</strong> {{ country.region }}</li>
			<li><strong>Capital:</strong> {{ country.capital[0] }}</li>
		</template>

		<template v-else>
			<li><strong>Native Name: </strong> {{ country?.altSpellings[1] }}</li>

			<li><strong>Top level Domain: </strong>
				<span v-for="domain in country?.tld" :key="domain">{{ domain }}</span>
			</li>

			<li><strong>Population: </strong> {{ country?.population.toLocaleString() }}</li>

			<li><strong>Currencies: </strong>
				<span v-for="currency in country?.currencies" :key="currency.name">{{ currency.name }}</span>
			</li>

			<li><strong>Region: </strong> {{ country?.region }}</li>

			<li><strong>Languages: </strong>
				<span v-for="language in country?.languages" :key="language">{{ language }}</span>
			</li>

			<li><strong>Sub Region: </strong> {{ country?.subregion }}</li>
			<li><strong>Capital: </strong> {{ country?.capital[0] }}</li>
		</template>
	</ul>
</template>

<style lang="scss" scoped>
@import '@/assets/_vars.scss';

.country-description {

	li {

		span {
			&:not(:last-child) {
				&:after {
					content: ', ';
				}
			}
		}

		&:not(:last-child) {
			margin-bottom: 5px;

			@media (min-width: $media-md) {
				margin-bottom: 8px;
			}
		}
	}
}

.detail {
	@media (min-width: $media-lg) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
}
</style>