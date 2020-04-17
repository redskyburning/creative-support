import Vue from 'vue';

import WorkerFilter from '../components/WorkerFilter.vue';
import WorkerCard from '@/components/WorkerCard.vue';
import MobileCardControls from '~/components/MobileCardControls.vue';
import MegaShuffle from '~/components/MegaShuffle.vue';

export default Vue.extend({
	name: 'HomePage',
	components: {
		WorkerCard,
		MobileCardControls,
		WorkerFilter,
		MegaShuffle,
	},
	data() {
		return {
			filtersActive: false,
		};
	},
	mounted() {
		this.$store.dispatch('loadWorkers')
			.catch((error) => {
				console.error(error);
			});
	},
	methods: {
		handleShuffle() {
			this.$store.dispatch('shuffle')
				.catch((error) => {
					console.error(error);
				});
		},
		handleFilterToggle(isActive: boolean) {
			this.filtersActive = isActive;
		},
		handleFilterChange(categoryIds: number[]) {
			this.$store.dispatch('loadWorkers', categoryIds)
				.catch((error) => {
					console.error(error);
				});
		},
	},
});
