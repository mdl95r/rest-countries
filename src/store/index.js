import { defineStore } from 'pinia';
import axios from 'axios';

export const useCountriesStore = defineStore('countries', {
	state: () => {
		return {
			countries: [],
			currentCountry: null,
			isLoading: false,
			isError: {
				status: false,
				message: ''
			},
			searchCountry: '',
			theme: 'light',
			region: 'all'
		};
	},
	getters: {
		baseUrl() {
			return import.meta.env.VITE_BASE_URL;
		},

		searchCountries() {
			return this.countries.filter(country => country.name.common.toLowerCase().includes(this.searchCountry.toLowerCase()));
		},

		countriesByRegion() {
			return this.searchCountries.filter(country => {

				if (this.region.toLowerCase() === 'all') {
					return this.searchCountries;
				}

				return country.region === this.region;
			});
		}
	},

	actions: {
		async fetchAllCountries() {
			this.isLoading = true;
			try {
				const { data } = await axios.get(`${this.baseUrl}/all`, {
					params: {
						fields: 'name,capital,population,flags,region,cca3',
					}
				});

				this.countries = data;
			} catch (error) {
				this.isError = { status: true, message: error.message };
			} finally {
				this.isLoading = false;
			}
		},

		async fetchCountrybyName(payload) {
			this.isLoading = false;

			try {
				const res = await axios.get(`${this.baseUrl}/name/${payload}`);

				if (res.data.length > 1 || !res.data[0]) {
					this.isError = { status: true, message: 'Invalid data' };
					return;
				}
				this.currentCountry = res.data[0];
			} catch (error) {
				this.isError = { status: true, message: error.message };
			} finally {
				this.isLoading = false;
			}
		}
	}
});