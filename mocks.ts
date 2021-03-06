import { Worker } from '~/types';

export const mockWorker: Worker = {
	id: 'abc',
	firstName: 'Testy',
	lastName: 'McGee',
	title: 'Director',
	instagramUrl: '#foo',
	facebookUrl: '#bar',
	websiteUrl: '#fiz',
	otherUrl: '#baz',
	description: '<p>Abominably worst flexible disjointed, promise furious yield! Crumpled drills coarsened starfish bases resolved things. Gravely noncommittal unmistakable there roughly hinted o\'clock. Whose analyze recollection process worse batteries supposed. About despite carefully excellent men\'s massive organs.</p>',
	patreonUrl: '#foo',
	paypalUrl: '#bar',
	venmoUrl: '#fiz',
	location: 'Chamblee',
};

export const blankWorker: Worker = {
	firstName: '',
	lastName: '',
	title: '',
	instagramUrl: '',
	facebookUrl: '',
	websiteUrl: '',
	otherUrl: '',
	description: '',
	patreonUrl: '',
	paypalUrl: '',
	venmoUrl: '',
	location: '',
};
