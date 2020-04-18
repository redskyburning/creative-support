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
// @ts-ignore
import UpdateWorker from '~/gql/updateWorker.mutation.gql';

export default Vue.extend({
	name: 'Profile',
	components: {
		WorkerForm,
	},
	data() {
		return {
			worker: {
				...this.$store.state.profile,
			},
		};
	},
	middleware: 'profile',
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
