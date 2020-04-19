import { Worker, WorkerResponse } from '~/types';

export function getWorkerFromResponse(result: WorkerResponse): Worker {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { __typename, workerCategories, ...worker } = result;

	return {
		...worker,
		categories: workerCategories.map(({ category }) => {
			const { id, name } = category;

			return {
				id,
				name,
			};
		}),
	};
}
