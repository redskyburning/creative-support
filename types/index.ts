export interface RootState {
	workers: Worker[];
	selectedWorker: Worker | null;
	isLoading: boolean;
	categories: Category[];
	seed: number;
	user: AppUser | null;
	token: any;
}

export interface Worker {
	id: number;
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

export interface WorkersResult {
	data: {
		worker: Worker[];
	}
}

export interface AppUser {
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
	emailVerified: boolean;
}
