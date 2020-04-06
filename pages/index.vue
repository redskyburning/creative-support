<template>
	<section class="profiles page">
		<div class="page__header ">
			<h1 class="title">
				<span>Help Metro Atlanta’s</span> <span>creative workers.</span>
			</h1>
		</div>
		<div class="page__body profiles__body">
			<div class="profiles__main">
				<mobile-card-controls class="profiles__mobile-ui" />
				<worker-card />
			</div>
			<div class="profiles__extras">
				<div class="profiles__filters">
					foo
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
	.profiles {
		&__body {
			margin-top:$section-padding-horizontal;
			display:flex;
			flex-direction: row;
			align-items: stretch;
		}

		&__main {
			> * + * {
				margin-top:$section-padding-horizontal;
			}
		}

		&__extras {
			flex:1 1 auto;
			margin-left:$gap;
		}

		&__mobile-ui {
			position:sticky;
			top:0;
			z-index: $navbar-fixed-z;
		}

		&__filters {
			height:100%;
		}

		@include until($desktop) {
			&__extras {
				display:none;
			}
		}

		@include from($desktop) {
			&__main {
				max-width:400px;
			}
		}

		&__filters {
			background:$black;
		}
	}
</style>

<script lang="ts">
import Vue from 'vue';
import WorkerCard from '@/components/WorkerCard.vue';
import MobileCardControls from '~/components/MobileCardControls.vue';

export default Vue.extend({
	name: 'HomePage',
	components: {
		WorkerCard,
		MobileCardControls,
	},
});
</script>
