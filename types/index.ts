export interface RootState {
	workers: Worker[];
	selectedWorker: Worker | null;
	isLoading: boolean;
	categories: Category[];
}

export interface Worker {
	id: number;
	name: string;
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
