import Vue, { PropOptions } from 'vue';
// @ts-ignore
import AddWorker from '~/gql/addWorker.mutation.gql';

export default Vue.extend({
	name: 'WorkerForm',
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
