import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
	state: {
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
	},

	getters: {
		baseUrl() {
			return import.meta.env.VITE_BASE_URL;
		},

		searchCountries(state) {
			return state.countries.filter(country => country.name.common.toLowerCase().includes(state.searchCountry.toLowerCase()));
		},

		countriesByRegion(state, getters) {
			return getters.searchCountries.filter(country => {

				if (state.region.toLowerCase() === 'all') {
					return getters.searchCountries;
				}

				return country.region === state.region;
			});
		}
	},

	mutations: {
		setCountries(state, val) {
			state.countries = val;
		},

		setError(state, bool) {
			state.isError = bool;
		},

		setLoading(state, bool) {
			state.isLoading = bool;
		},

		setTheme(state, theme) {
			state.theme = theme;
		},

		setSearchCountry(state, country) {
			state.searchCountry = country;
		},

		setRegion(state, region) {
			state.region = region;
		},

		setCurrentCountry(state, country) {
			state.currentCountry = country;
		}
	},

	actions: {
		async fetchAllCountries({ _, commit, getters }) {
			commit('setLoading', true);
			try {
				const { data } = await axios.get(`${getters.baseUrl}/all`, {
					params: {
						fields: 'name,capital,population,flags,region,cca3',
					}
				});

				commit('setCountries', data);
			} catch (error) {
				commit('setError', { status: true, message: error.message });
			} finally {
				commit('setLoading', false);
			}
		},

		async fetchCountrybyName({ _, commit, getters }, payload) {
			commit('setLoading', true);
			try {
				const res = await axios.get(`${getters.baseUrl}/name/${payload}`);

				if (res.data.length > 1 || !res.data[0]) {
					commit('setError', { status: true, message: 'Invalid data' });
					return;
				}

				commit('setCurrentCountry', res.data[0]);
			} catch (error) {
				commit('setError', { status: true, message: error.message });
			} finally {
				commit('setLoading', false);
			}
		}
	}
});