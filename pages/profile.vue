<template>
	<section class="profile page">
		<div class="page__header ">
			<h1 class="title">
				<span>Your Profile</span>
			</h1>
		</div>
		<div class="page__body content">
			<worker-form
				v-if="worker"
				:worker="worker"
				@submit="handleSubmit"
			/>
		</div>
	</section>
</template>

<style lang="scss">
	.profile {
	}
</style>

<script lang="ts">
import Vue from 'vue';

import { Worker } from '~/types';
import { blankWorker } from '~/mocks';
import WorkerForm from '~/components/worker-form/worker-form.vue';
import UpdateWorker from '~/gql/updateWorker.mutation.gql';

export default Vue.extend({
	name: 'Profile',
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
	middleware: 'auth',
	mounted(): void {
		this.$store.dispatch('getWorkerByUserId', this.$store.state.user.uid)
			.catch((error: Error) => {
				console.error(error);
				this.$buefy.toast.open({
					type: 'is-danger',
					message: error.message,
				});
			});
	},
	methods: {
		handleSubmit(worker:Worker) {
			// @ts-ignore
			this.$apollo.mutate({
				mutation: UpdateWorker,
				variables: {
					...worker,
					userId: this.$store.state.user.uid,
				},
			})
				.then(() => {
					this.$buefy.toast.open({
						type: 'is-success',
						message: 'Registered!',
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
