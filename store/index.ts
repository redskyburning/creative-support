import {
	MutationTree,
	ActionTree,
	ActionContext,
	GetterTree,
} from 'vuex';

import { Category, CategoryResult, RootState, Worker, WorkersResult } from '~/types';
// @ts-ignore
import getCategories from '~/gql/getCategories.query.gql';
// @ts-ignore
import getWorkers from '~/gql/getWorkers.query.gql';
// @ts-ignore
import getFilteredWorkers from '~/gql/getFilteredWorkers.query.gql';
import { RuleSetQuery } from 'webpack';

export const state = (): RootState => ({
	workers: [],
	selectedWorker: null,
	isLoading: true,
	categories: [],
	seed: 0,
});

export const mutations: MutationTree<RootState> = {
	setWorkers(state: RootState, workers: Worker[]): void {
		state.workers = workers;
	},
	setSelectedWorker(state: RootState, worker: Worker): void {
		state.selectedWorker = worker;
	},
	setIsLoading(state: RootState, isLoading: boolean): void {
		state.isLoading = isLoading;
	},
	setCategories(state: RootState, categories: Category[]): void {
		state.categories = categories;
	},
	setSeed(state: RootState, seed: number): void {
		state.seed = seed;
	},
};

export const getters: GetterTree<RootState, RootState> = {
	activeWorker: (state: RootState) => {
		if (state.workers.length > 0) {
			return state.workers[Math.floor(state.workers.length * state.seed)];
		} else {
			return null;
		}
	},
};

export const actions: ActionTree<RootState, RootState> = {
	shuffle(store: ActionContext<RootState, RootState>): Promise<void> {
		return new Promise((resolve) => {
			store.commit('setSeed', Math.random());
			resolve();
		});
	},
	loadWorkers(store: ActionContext<RootState, RootState>, categoryIds: number[] = []): Promise<void> {
		return new Promise((resolve, reject) => {
			const hasCats = categoryIds.length > 0;
			const query: RuleSetQuery = {
				query: hasCats ? getFilteredWorkers : getWorkers,
			};

			if (hasCats) {
				query.variables = { categoryIds };
			}

			this.app.apolloProvider.defaultClient.query(query)
				.then((result: WorkersResult) => {
					store.commit('setWorkers', result.data.worker);
					store.commit('setSelectedWorker', result.data.worker[0] || null);
					store.dispatch('shuffle');

					resolve();
				})
				.catch(reject);
		});
	},
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
