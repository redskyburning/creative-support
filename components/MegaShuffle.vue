<template>
	<div class="mega-shuffle">
		<div class="mega-shuffle__button-wrap">
			<b-button
				type="is-mage"
				class="mega-shuffle__button is-chunky-serif"
				size="is-medium"
				outlined
			>
				Shuffle
			</b-button>
		</div>
	</div>
</template>

<style lang="scss">
	.mega-shuffle {
		display:flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding:$gap;
		background-size: auto auto;
		background-color: rgba(0, 0, 0, 0);
		background-image: repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0, 0, 0, 1) 10px, rgba(0, 0, 0, 1) 15px );

		&__button-wrap {
			background:$white;
		}
	}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'MegaShuffle',
});
</script>
