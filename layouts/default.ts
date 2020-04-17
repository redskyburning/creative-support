import Vue from 'vue';

import MobileDrawer from '@/components/MobileDrawer.vue';
import MadeWith from '~/components/MadeWith.vue';
import UserDropdown from '~/components/user-dropdown/user-dropdown.vue';

export default Vue.extend({
	components: {
		MobileDrawer,
		MadeWith,
		UserDropdown,
	},
	data() {
		return {
			toggleActive: false,
		};
	},
	watch: {
		$route() {
			this.toggleActive = false;
		},
	},
	mounted(): void {
		this.$store.dispatch('init')
			.catch((error) => {
				console.error(error);
			});
	},
	methods: {
		handleToggle() {
			this.toggleActive = !this.toggleActive;
		},
		handleLogin() {
			this.$store.dispatch('auth')
				.catch((error) => {
					console.error(error);
				});
		},
	},
});
