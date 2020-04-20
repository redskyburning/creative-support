<template>
	<section class="profile page">
		<div class="page__header ">
			<h1 class="title">
				<span>Your Profile</span>
			</h1>
		</div>
		<div class="page__body profile__body">
			<div class="profile__form">
				<div class="title">
					Details
				</div>
				<worker-form
					v-if="worker"
					:worker="worker"
					@submit="handleSubmit"
				/>
			</div>
			<div class="profile__categories">
				<div class="title">
					Categories
				</div>
				<b-field label="Add Category">
					<b-autocomplete
						v-model="query"
						placeholder="Search for your category here"
						keep-first
						clear-on-select
						:data="selectableCategories"
						field="name"
						@select="handleSelect"
					/>
				</b-field>
				<b-field label="Current Categories">
					<div class="tags">
						<b-tag
							v-for="category in $store.state.profileCategories"
							:key="category.id"
							size="is-medium"
							type="is-light"
							closable
							@close="handleDelete(category)"
						>
							{{ category.name }}
						</b-tag>
					</div>
				</b-field>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
	.profile {
		.tags {
			padding:1rem 1rem .5rem;
			background:$grey-light;
		}

		@include from($desktop) {
			&__body {
				display:flex;
				flex-direction:row;
				align-items:stretch;
			}

			&__form {
				flex:1 1 auto;
			}

			&__categories {
				flex:0 0 auto;
				width:400px;
				margin-left:$gap;
			}
		}
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
			query: '',
			worker: {
				...this.$store.state.profile,
			},
		};
	},
	computed: {
		selectableCategories(): Category[] {
			return this.$store.state.categories.filter((cat: Category) => {
				return !this.$store.getters.profileCategoryIds.includes(cat.id)
					&& cat.name.toLowerCase().includes(this.query.toLowerCase());
			});
		},
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
		handleSelect(category: Category) {
			if (category && category.id) {
				this.$store.dispatch('addProfileCategories', [category.id])
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
			}
		},
	},
});
</script>
