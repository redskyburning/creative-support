import { Middleware } from '@nuxt/types';

const authMiddleware: Middleware = ({ store, redirect }) => {
	if (!(store.state.user && store.state.user.uid)) {
		return redirect('/');
	}
};

export default authMiddleware;
