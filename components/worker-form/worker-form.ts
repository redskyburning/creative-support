import Vue, { PropOptions } from 'vue';

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
