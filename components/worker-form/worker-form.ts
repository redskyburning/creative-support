import Vue, { PropOptions } from 'vue';
import WorkerFilter from '~/components/WorkerFilter.vue';

export default Vue.extend({
	name: 'WorkerForm',
	components: {
		WorkerFilter,
	},
	props: {
		worker: {
			type: Object,
			required: true,
		} as PropOptions<Worker>,
	},
	methods: {
		handleSubmit() {
			this.$emit('submit', this.worker);
		},
	},
});
