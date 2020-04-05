<template>
	<div class="worker-card card">
		<div class="card-content">
			<div class="worker-card__title">
				<span class="worker-card__name">{{ worker.name }},</span>
				<span class="worker-card__position">{{ worker.position }}</span>
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
			<div class="worker-card__description content">{{ worker.description }}</div>
			<div class="worker-card__donations-buttons buttons">
				<b-button
					v-if="worker.patreonUrl"
					class="worker-card__donation-link"
					type="is-patreon"
					:href="worker.patreonUrl"
					target="_blank"
					rel="noopener"
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
					expanded
				>
					Support on Venmo
				</b-button>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.worker-card {
		.card-content > * + * {
			margin-top:1rem;
		}

		&__title {
			margin-bottom:.75rem;
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
	}
</style>

<script>
import { mockWorker } from '../mocks';

export default {
	name: 'WorkerCard',
	props: {
		title: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			worker: mockWorker,
		};
	},
};
</script>
