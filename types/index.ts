export interface RootState {
	workers: Worker[];
	selectedWorker: Worker | null;
	isLoading: boolean;
	categories: Category[];
	seed: number;
	user: AppUser | null;
	token: any;
	initialAuthComplete: boolean;
	profile: Worker | null;
	profileInitialized: boolean;
	foo: Category[];
}

export interface Worker {
	id?: number;
	firstName: string;
	lastName: string;
	title: string;
	location: string;
	description: string;
	instagramUrl?: string;
	facebookUrl?: string;
	websiteUrl?: string;
	otherUrl?: string;
	patreonUrl?: string;
	paypalUrl?: string;
	venmoUrl?: string;
	categories?: Category[];
}

export interface Category {
	id: number;
	name: string;
}

export interface CategorySelection {
	category: Category,
	isSelected: boolean,
}

export interface CategoryResult {
	data: {
		category: Category[];
	}
}

export interface CategoryResponseItem {

}

export interface WorkerResponse extends Worker{
	__typename: string;
	workerCategories: {
		category: Category;
	}[]
}

export interface WorkersResult {
	data: {
		worker: WorkerResponse[];
	}
}

export interface AddWorkerResponse {
	data: {
		// eslint-disable-next-line camelcase
		insert_worker: {
			returning: WorkerResponse[];
		}
	}
}

export interface UpdateWorkerResponse {
	data: {
		// eslint-disable-next-line camelcase
		update_worker: {
			returning: WorkerResponse[];
		}
	}
}

export interface AppUser {
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
	emailVerified: boolean;
}

export interface AddWorkerParams {
	worker: Worker;
	user: AppUser;
}

export interface WorkerCategory {
	workerId: string;
	categoryId: number;
}
