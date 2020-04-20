import { Middleware } from '@nuxt/types';

const registerMiddleware: Middleware = ({ store, redirect }) => {
	return new Promise((resolve) => {
		store.dispatch('initProfile')
			.then(() => {
				if (store.state.user && store.state.profile) {
					redirect('/profile');
					resolve();
				} else {
					resolve();
				}
			})
			.catch((error) => {
				console.error('Register middleware error!', error);
				redirect('/');
				resolve();
			});
	});
};

export default registerMiddleware;
