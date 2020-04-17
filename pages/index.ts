import Vue from 'vue';

import WorkerCard from '@/components/WorkerCard.vue';
import MobileCardControls from '~/components/MobileCardControls.vue';
import WorkerFilter from '../components/WorkerFilter.vue';
import MegaShuffle from '~/components/MegaShuffle.vue';

export default Vue.extend({
	name: 'HomePage',
	components: {
		WorkerCard,
		MobileCardControls,
		WorkerFilter,
		MegaShuffle,
	},
	mounted() {
		this.$store.dispatch('loadWorkers')
			.catch((error) => {
				console.error(error);
			});
	},
	methods: {
		handleFilterChange(categoryIds: number[]) {
			console.warn('???', categoryIds);
			this.$store.dispatch('loadWorkers', categoryIds)
				.catch((error) => {
					console.error(error);
				});
		},
	},
});
