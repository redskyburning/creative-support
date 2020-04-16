<template>
	<div class="worker-card card">
		<div class="card-content">
			<div class="worker-card__title">
				<span class="worker-card__name">{{ worker.firstName }} {{ worker.lastName }},</span>
				<span class="worker-card__worker-title">{{ worker.title }}</span>
			</div>

			<div class="worker-card__links">
				<a
					v-if="worker.instagramUrl"
					class="worker-card__link"
					:href="worker.instagramUrl"
					target="_blank"
					rel="noopener"
				>
					Instagram
				</a>
				<a
					v-if="worker.websiteUrl"
					class="worker-card__link"
					:href="worker.websiteUrl"
					target="_blank"
					rel="noopener"
				>
					Website Link
				</a>
				<a
					v-if="worker.facebookUrl"
					class="worker-card__link"
					:href="worker.facebookUrl"
					target="_blank"
					rel="noopener"
				>
					Facebook
				</a>
				<a
					v-if="worker.otherUrl"
					class="worker-card__link"
					:href="worker.otherUrl"
					target="_blank"
					rel="noopener"
				>
					Other Link
				</a>
			</div>

			<div class="worker-card__description content" v-html="worker.description" />

			<div class="worker-card__donations-buttons buttons">
				<b-button
					v-if="worker.patreonUrl"
					class="worker-card__donation-link"
					type="is-patreon"
					:href="worker.patreonUrl"
					target="_blank"
					rel="noopener"
					size="is-medium"
					expanded
				>
					Support on Patreon
				</b-button>
				<b-button
					v-if="worker.paypalUrl"
					class="worker-card__donation-link"
					type="is-paypal"
					:href="worker.paypalUrl"
					target="_blank"
					rel="noopener"
					size="is-medium"
					expanded
				>
					Support on Paypal.me
				</b-button>
				<b-button
					v-if="worker.venmoUrl"
					class="worker-card__donation-link"
					type="is-venmo"
					:href="worker.venmoUrl"
					target="_blank"
					rel="noopener"
					size="is-medium"
					expanded
				>
					Support on Venmo
				</b-button>
			</div>

			<div class="worker-card__footer">
				<a class="worker-card__report" href="#">Report User</a>

				<div
					v-if="worker.location"
					class="worker-card__location"
				>
					<b-icon
						icon="map-marker"
						size="is-small"
					/>
					<span>{{ worker.location }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.worker-card {
		position: relative;
		margin-bottom:10px;

		&::before,
		&::after {
			content:'';
			display:block;
			position: absolute;
			height:10%;
			border:2px solid $grey;
			background-color:$white;
			z-index: -1;
		}

		&::after {
			$width:95%;
			width:$width;
			bottom:-7px;
			left:(100% - $width) / 2;
		}

		&::before {
			$width:90%;
			width:$width;
			bottom:-12px;
			left:(100% - $width) / 2;
		}

		.card-content > * + * {
			margin-top:1.2rem;
		}

		&__title {
			text-align:center;
			font-size:$size-5;
		}

		&__name {
			font-weight: $weight-bold;
		}

		&__links {
			display:flex;
			flex-direction: row;
			flex-wrap:wrap;
		}

		&__link {
			width:50%;
			text-decoration: underline;
			font-weight:bold;
			text-transform: uppercase;
			@include single-color-link($link);
			line-height:1.8em;

			&:nth-child(odd) {
				padding-right:$gap / 2;
			}

			&:nth-child(even) {
				text-align:right;
				padding-left:$gap / 2;
			}
		}

		&__footer {
			display:flex;
			flex-direction: row;
			justify-content: space-between;
			font-weight:bold;
		}

		&__location {
			display:flex;
			flex-direction: row;
			align-items: center;

			> * + * {
				margin-left:.2rem;
			}
		}
	}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'WorkerCard',
	props: {
		worker: {
			required: true,
			type: Object,
		},
	},
});
</script>
