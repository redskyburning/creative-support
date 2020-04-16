import {
	MutationTree,
	ActionTree,
	ActionContext,
} from 'vuex';

import { Category, CategoryResult, RootState, Worker, WorkersResult } from '~/types';
// @ts-ignore
import getCategories from '~/gql/getCategories.query.gql';
// @ts-ignore
import getWorkers from '~/gql/getWorkers.query.gql';

export const state = (): RootState => ({
	workers: [],
	selectedWorker: null,
	isLoading: true,
	categories: [],
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
};

export const actions: ActionTree<RootState, RootState> = {
	loadWorkers(store: ActionContext<RootState, RootState>): Promise<void> {
		return new Promise((resolve, reject) => {
			this.app.apolloProvider.defaultClient.query({
				query: getWorkers,
				variables: {
					categoryIds: [1],
				},
			})
				.then((result: WorkersResult) => {
					store.commit('setWorkers', result.data.worker);
					store.commit('setSelectedWorker', result.data.worker[0] || null);
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
