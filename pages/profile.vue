<template>
	<section class="profile page">
		<div class="page__header ">
			<h1 class="title">
				<span>Your Profile</span>
			</h1>
		</div>
		<div class="profile__categories">
			<div class="subtitle">
				Categories <a @click="handleAdd">Add</a>
			</div>
			<div class="tags">
				<b-tag
					v-for="category in $store.state.profileCategories"
					:key="category.id"
					size="is-medium"
					closable
					@close="handleDelete(category)"
				>
					{{ category.name }}
				</b-tag>
			</div>
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

import { Category, Worker } from '~/types';
import WorkerForm from '~/components/worker-form/worker-form.vue';

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
			this.$store.dispatch('updateProfile', worker)
				.then(() => {
					this.$buefy.toast.open({
						type: 'is-success',
						message: 'Profile Updated!',
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
		handleAdd() {
			this.$store.dispatch('addProfileCategories', [3])
				.then(() => {
					this.$buefy.toast.open({
						type: 'is-success',
						message: 'Profile updated',
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
		handleDelete(category: Category) {
			this.$store.dispatch('removeProfileCategories', [category.id])
				.then(() => {
					this.$buefy.toast.open({
						type: 'is-success',
						message: `${ category.name } removed`,
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
