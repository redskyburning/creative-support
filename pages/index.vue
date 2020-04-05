<template>
	<section class="profiles page">
		<div class="page__header ">
			<h1 class="title">
				<span>Help Metro Atlanta’s</span> <span>creative workers.</span>
			</h1>
		</div>
		<div class="page__body content">
			<mobile-card-controls class="profiles__mobile-ui" />
			<worker-card />
		</div>
	</section>
</template>

<style lang="scss">
	.profiles {
		.page__body {
			margin-top: .5rem;
		}

		&__mobile-ui {
			position:sticky;
			top:0;
			z-index: $navbar-fixed-z;
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
