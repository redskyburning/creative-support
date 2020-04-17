<template>
	<div class="mobile-card-controls">
		<b-button
			type="is-mage"
			class="is-chunky-serif"
			size="is-medium"
			outlined
			@click="handleShuffle"
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
			@click="handleFilter"
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
	props: {
		filterActive: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		handleShuffle() {
			this.$emit('shuffle');
		},
		handleFilter() {
			this.$emit('filter', !this.filterActive);
		},
	},
});
</script>
