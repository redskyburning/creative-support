import { Worker, WorkerResponse } from '~/types';

export function getWorkerFromResult(result: WorkerResponse): Worker {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { __typename, ...worker } = result;

	return worker;
}
