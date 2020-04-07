import {
	MutationTree,
	ActionTree,
	ActionContext,
} from 'vuex';

import { Category, CategoryResult, RootState } from '~/types';
// @ts-ignore
import getCategories from '~/gql/getCategories.query.gql';

export const state = (): RootState => ({
	workers: [],
	selectedWorker: null,
	isLoading: true,
	categories: [],
});

export const mutations: MutationTree<RootState> = {
	setIsLoading(state: RootState, isLoading: boolean): void {
		state.isLoading = isLoading;
	},
	setCategories(state: RootState, categories: Category[]): void {
		state.categories = categories;
	},
};

export const actions: ActionTree<RootState, RootState> = {
	loadCategories(store: ActionContext<RootState, RootState>): Promise<void> {
		return new Promise((resolve, reject) => {
			this.app.apolloProvider.defaultClient.query({
				query: getCategories,
			})
				.then((result: CategoryResult) => {
					store.commit('setCategories', result.data.category);
					resolve();
				})
				.catch(reject);
		});
	},
	init(store: ActionContext<RootState, RootState>): Promise<void> {
		return new Promise((resolve, reject) => {
			store.dispatch('loadCategories')
				.then(() => {
					resolve();
				})
				.catch(reject);
		});
	},
};
