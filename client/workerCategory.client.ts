import ApolloClient from 'apollo-client';

import {
	Category,
	CreateWorkerCategoriesResponse,
	GetWorkerCategoriesResponse,
	GetWorkerCategoryResponse
} from '~/types';
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
			update: (cache, response) => {
				try {
					const options = {
						query: getWorkerCategoriesByWorkerIdQuery,
						variables: {
							workerId,
						},
					};
					const data: any = cache.readQuery(options);
					data.worker_category = response.data.insert_worker_category.returning.concat(data.worker_category);

					cache.writeQuery({
						...options,
						data,
					});
				} catch (e) {
					console.error(e);
				}
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
			update: (cache) => {
				try {
					const options = {
						query: getWorkerCategoriesByWorkerIdQuery,
						variables: {
							workerId,
						},
					};
					const data: any = cache.readQuery(options);
					data.worker_category = data.worker_category.filter((cat: GetWorkerCategoryResponse) => !categoryIds.includes(cat.category.id));
					console.warn('???', data.worker_category)

					cache.writeQuery({
						...options,
						data,
					});
				} catch (e) {
					console.error(e);
				}
			},
		})
			.then(() => {
				resolve();
			})
			.catch(reject);
	});
}
