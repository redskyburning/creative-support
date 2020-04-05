<template>
	<section class="profiles-bottom page">
		<div class="page__header ">
			<h1 class="title">
				<span>Help Metro Atlanta’s</span> <span>creative workers.</span>
			</h1>
		</div>
		<div class="page__body content">
			<worker-card />
			<div class="profiles-bottom__mobile-footer">
				<mobile-card-controls class="" />
			</div>
		</div>
	</section>
</template>

<style lang="scss">
	.profiles-bottom {
		.page__body {
			padding-bottom:60px;
		}

		&__mobile-footer {
			position:fixed;
			bottom:0;
			left:0;
			right:0;
			z-index: $navbar-fixed-z;
			border-top:2px solid $border;

			.mobile-card-controls {
				padding:$section-padding-horizontal * .75 $section-padding-horizontal;
			}
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
