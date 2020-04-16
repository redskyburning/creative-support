<template>
	<section class="profiles page">
		<div class="page__header ">
			<h1 class="title">
				<span>Help Metro Atlanta’s</span> <span>creative workers.</span>
			</h1>
		</div>
		<div class="page__body profiles__body">
			<div class="profiles__main">
				<mega-shuffle class="profiles__mega-shuffle" />
				<mobile-card-controls class="profiles__mobile-ui" />
				<client-only>
					<worker-card
						v-if="$store.state.selectedWorker"
						:worker="$store.state.selectedWorker"
					/>
				</client-only>
			</div>
			<div class="profiles__extras">
				<worker-filter class="profiles__filters" />
			</div>
		</div>
	</section>
</template>

<style lang="scss">
	.profiles {
		&__body {
			margin-top:$gap;
			display:flex;
			flex-direction: row;
			align-items: stretch;
		}

		&__extras {
			flex:1 1 auto;
			margin-left:$gap;
		}

		&__main {
			> *:not(:last-child) {
				margin-bottom:$gap;
			}
		}

		&__mobile-ui {
			position:sticky;
			top:0;
			z-index: $navbar-fixed-z;
			//margin-bottom:$gap;
		}

		&__filters {
			height:100%;
		}

		@include until($desktop) {
			.mega-shuffle,
			&__extras {
				display:none;
			}
		}

		@include from($desktop) {
			&__body {
				margin-top:$section-padding-vertical;
			}

			&__main {
				max-width:400px;
			}

			.mobile-card-controls {
				display:none;
			}
		}
	}
</style>

<script>
import Vue from 'vue';

import WorkerCard from '@/components/WorkerCard.vue';
import MobileCardControls from '~/components/MobileCardControls.vue';
import WorkerFilter from '~/components/WorkerFilter.vue';
import MegaShuffle from '~/components/MegaShuffle.vue';

export default Vue.extend({
	name: 'HomePage',
	components: {
		WorkerCard,
		MobileCardControls,
		WorkerFilter,
		MegaShuffle,
	},
	mounted() {
		this.$store.dispatch('loadWorkers')
			.catch((error) => {
				console.error(error);
			});
	},
});
</script>
