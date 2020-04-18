import { Middleware } from '@nuxt/types';
import { AppUser } from '~/types';

const authMiddleware: Middleware = ({ store, redirect }) => {
	return new Promise((resolve) => {
		store.dispatch('getCurrentUser')
			.then((user: AppUser | null) => {
				console.error('???contact');
				if (user === null) {
					redirect('/');
					resolve();
				} else {
					resolve();
				}
			})
			.catch((error) => {
				console.error('Auth middleware error!', error);
				redirect('/');
				resolve();
			});
	});
};

export default authMiddleware;
