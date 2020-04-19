import ApolloClient from 'apollo-client';

import { Category, GetWorkerCategoriesResponse } from '~/types';
// @ts-ignore
import createWorkerCategoriesMutation from '~/gql/createWorkerCategories.gql';
// @ts-ignore
import getWorkerCategoriesByWorkerIdQuery from '~/gql/getWorkerCategoriesByWorkerId.query.gql';
// @ts-ignore
import deleteWorkerCategoriesMutation from '~/gql/deleteWorkerCategories.mutation.gql';

export function getWorkerCategoriesByWorkerId(apollo: ApolloClient<any>, workerId: string): Promise<Category[]> {
	return new Promise((resolve, reject) => {
		apollo.query({
			query: getWorkerCategoriesByWorkerIdQuery,
			variables: {
				workerId,
			},
		})
			.then((response: GetWorkerCategoriesResponse) => {
				resolve(response.data.worker_category.map(wc => wc.category));
			})
			.catch(reject);
	});
}

export function createWorkerCategories(apollo: ApolloClient<any>, workerId: string, categoryIds: number[]): Promise<void> {
	return new Promise((resolve, reject) => {
		apollo.mutate({
			mutation: createWorkerCategoriesMutation,
			variables: {
				objects: categoryIds.map((category_id) => {
					return {
						worker_id: workerId,
						category_id,
					};
				}),
			},
		})
			.then(() => {
				resolve();
			})
			.catch(reject);
	});
}

export function deleteWorkerCategories(apollo: ApolloClient<any>, workerId: string, categoryIds: number[]): Promise<void> {
	return new Promise((resolve, reject) => {
		apollo.mutate({
			mutation: deleteWorkerCategoriesMutation,
			variables: {
				workerId,
				categoryIds,
			},
		})
			.then(() => {
				resolve();
			})
			.catch(reject);
	});
}
