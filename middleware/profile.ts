import { Middleware } from '@nuxt/types';

const profileMiddleware: Middleware = ({ store, redirect }) => {
	return new Promise((resolve) => {
		store.dispatch('initProfile')
			.then(() => {
				if (store.state.user === null || store.state.profile === null) {
					redirect('/register');
					resolve();
				} else {
					resolve();
				}
			})
			.catch((error) => {
				console.error('Profile middleware error!', error);
				redirect('/');
				resolve();
			});
	});
};

export default profileMiddleware;
