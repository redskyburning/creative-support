<template>
	<div class="made-with">
		<span>Made w/</span> <img src="~/assets/heart.svg" /> <span>in ATL</span>
	</div>
</template>

<style lang="scss">
	.made-with {
		display:flex;
		flex-direction: row;
		align-items: center;
		color:$black;
		font-family: $family-serif;
		font-size:$size-5;
		font-weight:$weight-bold;
		line-height:1em;
		white-space: nowrap;

		> * {
			display:inline-block;
		}

		img {
			margin:0 .65em;
			width:1.6em;
			height:auto;
		}
	}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'MadeWith',
});
</script>
