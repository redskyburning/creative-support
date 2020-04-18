import {
	MutationTree,
	ActionTree,
	ActionContext,
	GetterTree,
} from 'vuex';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { AppUser, Category, CategoryResult, RootState, Worker, WorkersResult } from '~/types';
// @ts-ignore
import getCategories from '~/gql/getCategories.query.gql';
// @ts-ignore
import getWorkers from '~/gql/getWorkers.query.gql';
// @ts-ignore
import getFilteredWorkers from '~/gql/getFilteredWorkers.query.gql';
// @ts-ignore
import getWorkerByUserId from '~/gql/getWorkerByUserId.query.gql';

export const state = (): RootState => ({
	workers: [],
	selectedWorker: null,
	isLoading: true,
	categories: [],
	seed: 0,
	user: null,
	token: null,
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
	setUser(state: RootState, user: any): void {
		state.user = user;
	},
	setToken(state: RootState, token: any): void {
		state.token = token;
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
	initAuth(store: ActionContext<RootState, RootState>): Promise<void> {
		return new Promise((resolve) => {
			// Find these options in your Firebase console
			firebase.initializeApp({
				apiKey: 'AIzaSyAq0Qum9t0kVQNT47ZMJretsY0l7L_j0ZI',
				authDomain: 'creative-support-f274f.firebaseapp.com',
				projectId: 'creative-support-f274f',
			});

			firebase.auth().onAuthStateChanged(async(user) => {
				if (user) {
					const appUser: AppUser = {
						uid: user.uid,
						displayName: user.displayName || '',
						email: user.email || '',
						emailVerified: user.emailVerified,
						photoURL: user.photoURL || '',
					};
					store.commit('setUser', appUser);

					const token = await user.getIdToken();
					store.commit('setToken', token);
					console.warn('???in');

					resolve();
				} else {
					store.commit('setUser', null);
					store.commit('setToken', null);
					console.warn('???out');

					resolve();
				}
			});
		});
	},
	auth(): Promise<void> {
		return new Promise((resolve, reject) => {
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider)
				.then(() => {
					resolve();
				})
				.catch(reject);
		});
	},
	logout(): Promise<void> {
		return firebase.auth().signOut();
	},
	shuffle(store: ActionContext<RootState, RootState>): Promise<void> {
		return new Promise((resolve) => {
			store.commit('setSeed', Math.random());
			resolve();
		});
	},
	loadWorkers(store: ActionContext<RootState, RootState>, categoryIds: number[] = []): Promise<void> {
		return new Promise((resolve, reject) => {
			const hasCats = categoryIds.length > 0;
			const query:any = {
				query: hasCats ? getFilteredWorkers : getWorkers,
			};

			if (hasCats) {
				query.variables = { categoryIds };
			}

			this.app.apolloProvider.defaultClient.query(query)
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
			Promise.all([
				store.dispatch('initAuth'),
				store.dispatch('loadCategories'),
			])
				.then(() => {
					resolve();
				})
				.catch(reject);
		});
	},
	getWorkerByUserId(store: ActionContext<RootState, RootState>, userId: string): Promise<Worker> {
		return new Promise((resolve, reject) => {
			if (store.state.user === null) {
				return reject(Error('Invalid user id'));
			}

			this.app.apolloProvider.defaultClient.query({
				query: getWorkerByUserId,
				variables: {
					userId: store.state.user.uid,
				},
			})
				.then((result: WorkersResult) => {
					if (result.data.worker[0]) {
						resolve(result.data.worker[0]);
					} else {
						reject(Error('No worker found'));
					}
				})
				.catch(reject);
		});
	},
};
