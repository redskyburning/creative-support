<template>
	<div class="mobile-card-controls">
		<b-button
			type="is-mage"
			class="is-chunky-serif"
			size="is-medium"
			outlined
		>
			Shuffle
		</b-button>
		<b-button
			type="is-yella"
			class="is-chunky-serif"
			size="is-medium"
			icon-left="help"
			tag="nuxt-link"
			to="/about"
		/>
		<b-button
			type="is-turq"
			class="is-chunky-serif"
			size="is-medium"
			outlined
		>
			Filter
		</b-button>
	</div>
</template>

<style lang="scss">
	.mobile-card-controls {
		display:flex;
		flex-direction: row;
		justify-content: space-between;
		background-color:$white;
		padding:$section-padding-horizontal 0;

		.button {
			color:$text !important;

			&:first-child,
			&:last-child {
				min-width: 115px;
			}
		}
	}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'MobileCardControls',
});
</script>
