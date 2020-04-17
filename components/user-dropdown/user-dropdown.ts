import Vue, { PropOptions } from 'vue';
import { AppUser } from '~/types';

export default Vue.extend({
	name: 'UserDropdown',
	props: {
		user: {
			type: Object,
			required: true,
		} as PropOptions<AppUser>,
	},
});
