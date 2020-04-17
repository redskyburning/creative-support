<template>
	<section class="register page">
		<div class="page__header ">
			<h1 class="title">
				<span>Register for</span> <span>Support</span>
			</h1>
		</div>
		<div class="page__body content">
			<form>
				<b-field label="First Name">
					<b-input
						v-model="worker.firstName"
					/>
				</b-field>
				<b-field label="Last Name">
					<b-input
						v-model="worker.lastName"
					/>
				</b-field>
				<b-field label="Title">
					<b-input
						v-model="worker.title"
					/>
				</b-field>
				<b-field label="Location">
					<b-input
						v-model="worker.location"
					/>
				</b-field>
				<b-field label="Description">
					<b-input
						v-model="worker.description"
						type="textarea"
					/>
				</b-field>
				<b-field label="Instagram Url">
					<b-input
						v-model="worker.instagramUrl"
					/>
				</b-field>
				<b-field label="Facebook Url">
					<b-input
						v-model="worker.facebookUrl"
					/>
				</b-field>
				<b-field label="Website Url">
					<b-input
						v-model="worker.websiteUrl"
					/>
				</b-field>
				<b-field label="Other Url">
					<b-input
						v-model="worker.otherUrl"
					/>
				</b-field>
				<b-field label="Patreon Url">
					<b-input
						v-model="worker.patreonUrl"
					/>
				</b-field>
				<b-field label="Paypal Url">
					<b-input
						v-model="worker.paypalUrl"
					/>
				</b-field>
				<b-field label="Venmo Url">
					<b-input
						v-model="worker.venmoUrl"
					/>
				</b-field>
				<div class="buttons">
					<b-button
						tag="input"
						native-type="submit"
						value="Submit"
					/>
				</div>
			</form>
		</div>
	</section>
</template>

<style lang="scss">
	.register {
	}
</style>

<script lang="ts">
import Vue from 'vue';
import { blankWorker } from '~/mocks';

export default Vue.extend({
	name: 'Register',
	data() {
		return {
			worker: {
				...blankWorker,
			},
		};
	},
});
</script>
