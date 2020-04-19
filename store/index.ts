import {
	MutationTree,
	ActionTree,
	ActionContext,
	GetterTree,
} from 'vuex';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import {
	AddWorkerParams, AddWorkerResponse,
	AppUser,
	Category,
	CategoryResult,
	RootState, UpdateWorkerResponse,
	Worker, WorkerCategory,
	WorkersResult,
} from '~/types';
// @ts-ignore
import getCategories from '~/gql/getCategories.query.gql';
// @ts-ignore
import getWorkers from '~/gql/getWorkers.query.gql';
// @ts-ignore
import getFilteredWorkers from '~/gql/getFilteredWorkers.query.gql';
// @ts-ignore
import getWorkerByUserId from '~/gql/getWorkerByUserId.query.gql';
// @ts-ignore
import updateWorker from '~/gql/updateWorker.mutation.gql';
// @ts-ignore
import addWorker from '~/gql/addWorker.mutation.gql';
// @ts-ignore
import addWorkerCategory from '~/gql/addWorkerCategory.gql';
// @ts-ignore
import deleteWorkerCategory from '~/gql/deleteWorkerCategory.gql';
import { getWorkerFromResponse } from '~/store/utils';

export const state = (): RootState => ({
	workers: [],
	selectedWorker: null,
	isLoading: true,
	categories: [],
	seed: 0,
	user: null,
	token: null,
	initialAuthComplete: false,
	profile: null,
	profileInitialized: false,
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
	setToken(state: RootState, token: boolean): void {
		state.token = token;
	},
	setProfile(state: RootState, profile: Worker | null): void {
		state.profile = {
			...profile,
		};
	},
	setProfileInitialized(state: RootState, profileInitialized: boolean): void {
		state.profileInitialized = profileInitialized;
	},
	setInitialAuthComplete(state: RootState, initialAuthComplete: any): void {
		state.initialAuthComplete = initialAuthComplete;
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

let authPromise: Promise<void> | null = null;
let profilePromise: Promise<void> | null = null;

export const actions: ActionTree<RootState, RootState> = {
	initAuth(store: ActionContext<RootState, RootState>): Promise<void> {
		if (authPromise === null) {
			authPromise = new Promise((resolve) => {
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

						if (!store.state.initialAuthComplete) {
							store.commit('setInitialAuthComplete', true);
							resolve();
						}
					} else {
						store.commit('setUser', null);
						store.commit('setToken', null);

						if (!store.state.initialAuthComplete) {
							store.commit('setInitialAuthComplete', true);
							resolve();
						}
					}
				});
			});
		}

		return authPromise;
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
				store.dispatch('initProfile'),
				store.dispatch('loadCategories'),
			])
				.then(() => {
					resolve();
				})
				.catch(reject);
		});
	},
	getCurrentUser(store: ActionContext<RootState, RootState>): Promise<AppUser | null> {
		return new Promise((resolve, reject) => {
			store.dispatch('initAuth')
				.then(() => {
					resolve(store.state.user);
				})
				.catch(reject);
		});
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getWorkerByUserId(store: ActionContext<RootState, RootState>, userId: string): Promise<Worker | null> {
		return new Promise((resolve, reject) => {
			console.warn('???', this.app.apolloProvider.defaultClient);
			this.app.apolloProvider.defaultClient.query({
				query: getWorkerByUserId,
				variables: {
					userId,
				},
				fetchPolicy: 'no-cache',
			})
				.then((result: WorkersResult) => {
					if (result.data.worker[0]) {
						resolve(getWorkerFromResponse(result.data.worker[0]));
					} else {
						resolve(null);
					}
				})
				.catch(reject);
		});
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	addWorker(store: ActionContext<RootState, RootState>, { worker, user } : AddWorkerParams): Promise<Worker | null> {
		return new Promise((resolve, reject) => {
			this.app.apolloProvider.defaultClient.mutate({
				mutation: addWorker,
				variables: {
					...worker,
					userId: user.uid,
				},
			})
				.then((response: AddWorkerResponse) => {
					resolve(getWorkerFromResponse(response.data.insert_worker.returning[0]));
				})
				.catch(reject);
		});
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	updateWorker(store: ActionContext<RootState, RootState>, worker: Worker): Promise<Worker | null> {
		return new Promise((resolve, reject) => {
			this.app.apolloProvider.defaultClient.mutate({
				mutation: updateWorker,
				variables: {
					...worker,
				},
			})
				.then((response: UpdateWorkerResponse) => {
					resolve(getWorkerFromResponse(response.data.update_worker.returning[0]));
				})
				.catch(reject);
		});
	},
	addProfile(store: ActionContext<RootState, RootState>, params: AddWorkerParams): Promise<Worker | null> {
		return new Promise((resolve, reject) => {
			store.dispatch('addWorker', params)
				.then((worker: Worker | null) => {
					store.commit('setProfile', worker);
					resolve();
				})
				.catch(reject);
		});
	},
	updateProfile(store: ActionContext<RootState, RootState>, worker: Worker): Promise<Worker | null> {
		return new Promise((resolve, reject) => {
			store.dispatch('updateWorker', worker)
				.then((worker: Worker | null) => {
					store.commit('setProfile', worker);
					resolve();
				})
				.catch(reject);
		});
	},
	loadProfile(store: ActionContext<RootState, RootState>): Promise<Worker | null> {
		return new Promise((resolve, reject) => {
			store.dispatch('getCurrentUser')
				.then((user) => {
					if (user !== null) {
						store.dispatch('getWorkerByUserId', user.uid)
							.then((worker: Worker | null) => {
								store.commit('setProfile', worker);
								resolve();
							})
							.catch(reject);
					} else {
						store.commit('setProfile', null);
						resolve();
					}
				})
				.catch(reject);
		});
	},
	initProfile(store: ActionContext<RootState, RootState>): Promise<void> {
		if (profilePromise === null) {
			profilePromise = new Promise((resolve, reject) => {
				store.dispatch('loadProfile')
					.then(() => {
						if (!store.state.profileInitialized) {
							store.commit('setProfileInitialized', true);
						}

						resolve();
					})
					.catch(reject);
			});
		}

		return profilePromise;
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	addWorkerCategory(store: ActionContext<RootState, RootState>, workerCategory : WorkerCategory): Promise<Worker | null> {
		return this.app.apolloProvider.defaultClient.mutate({
			mutation: addWorkerCategory,
			variables: workerCategory,
		});
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	deleteWorkerCategory(store: ActionContext<RootState, RootState>, params : WorkerCategory): Promise<Worker | null> {
		return this.app.apolloProvider.defaultClient.mutate({
			mutation: deleteWorkerCategory,
			variables: params,
		});
	},
};
