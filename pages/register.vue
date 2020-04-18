<template>
	<section class="register page">
		<div class="page__header ">
			<h1 class="title">
				<span>Register for</span> <span>Support</span>
			</h1>
		</div>
		<div class="page__body content">
			<worker-form
				:worker="worker"
				@submit="handleSubmit"
			/>
		</div>
	</section>
</template>

<style lang="scss">
	.register {
	}
</style>

<script lang="ts">
import Vue from 'vue';

import { Worker } from '~/types';
import { blankWorker } from '~/mocks';
import WorkerForm from '~/components/worker-form/worker-form.vue';

export default Vue.extend({
	name: 'Register',
	middleware: 'register',
	components: {
		WorkerForm,
	},
	data() {
		return {
			worker: {
				...blankWorker,
			},
		};
	},
	methods: {
		handleSubmit(worker:Worker) {
			this.$store.dispatch('addProfile', {
				worker,
				user: this.$store.state.user,
			})
				.then(() => {
					this.$buefy.toast.open({
						type: 'is-success',
						message: 'Registered!',
					});
					this.$router.push({
						path: '/profile',
					});
				})
				.catch((error: Error) => {
					console.error(error);
					this.$buefy.toast.open({
						type: 'is-danger',
						message: error.message,
					});
				});
		},
	},
});
</script>
