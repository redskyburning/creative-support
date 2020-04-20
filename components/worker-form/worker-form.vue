<template>
	<div class="worker-form">
		<form
			v-if="worker"
			@submit.prevent="handleSubmit"
		>
			<div class="worker-form__fields">
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
			</div>

			<b-field label="Description">
				<b-input
					v-model="worker.description"
					type="textarea"
				/>
			</b-field>

			<div class="worker-form__fields">
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
			</div>
			<div class="section buttons is-right">
				<b-button
					tag="input"
					native-type="submit"
					value="Save"
				/>
			</div>
		</form>
	</div>
</template>

<style lang="scss">
.worker-form {
	&__fields {
		display:flex;
		flex-direction:row;
		flex-wrap:wrap;

		> * {
			@include from(350px) {
				width:calc(50% - #{$gap / 2});

				&:nth-child(odd) {
					margin-right:$gap;
				}
			}
		}
	}
}
</style>

<script src="./worker-form.ts" lang="ts"/>
