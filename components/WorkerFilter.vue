<template>
	<div class="worker-filter">
		<div class="worker-filter__filters section">
			<div class="field">
				<b-checkbox
					type="is-yella"
					size="is-medium"
				>
					View All
				</b-checkbox>
			</div>

			<hr>

			<div
				v-for="category in $store.state.categories"
				:key="category.id"
				class="field"
			>
				<b-checkbox
					type="is-yella"
					size="is-medium"
				>
					{{ category.name }}
				</b-checkbox>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.worker-filter {
		&__filters {
			background-color:$black;
			height:100%;
		}

		.checkbox {
			color:$white;
			font-weight: $weight-bold;
			font-style: italic;

			.control-label {
				padding-left:1rem;
				color:$grey-lighter;
			}

			.check {
				position:relative;

				&:before {
					$offset:3px;
					top:$offset;
					left:$offset;
					content:'';
					position:absolute;
					width:100%;
					height:100%;
					box-sizing:content-box;
					border:2px solid #7a7a7a;
					border-left:0;
					border-top:0;
				}
			}
		}

		hr {
			background-color:$grey-lighter;
		}

		.field {
			display:block;
		}

		.field + .field {

		}
	}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'WorkerFilter',
	data() {
		return {
			selectedIds: [],
		};
	},
});
</script>
