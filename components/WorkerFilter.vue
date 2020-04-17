<template>
	<div class="worker-filter">
		<div class="worker-filter__filters section">
			<div class="field">
				<b-checkbox
					v-model="isAll"
					type="is-yella"
					size="is-medium"
					@input="handleAll"
				>
					View All
				</b-checkbox>
			</div>

			<hr>

			<div
				v-for="selection in selections"
				:key="selection.category.id"
				class="field"
			>
				<b-checkbox
					v-model="selection.isSelected"
					type="is-yella"
					size="is-medium"
					@input="handleChange(selection.category.id)"
				>
					{{ selection.category.name }}
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
import { Category, CategorySelection } from '~/types';

export default Vue.extend({
	name: 'WorkerFilter',
	data() {
		return {
			isAll: true,
			ids: [] as number[],
		};
	},
	computed: {
		selections(): CategorySelection[] {
			return this.$store.state.categories.map((category: Category) => {
				return {
					category,
					isSelected: this.ids.includes(category.id),
				};
			});
		},
	},
	methods: {
		handleAll() {
			if (this.isAll) {
				this.ids = [];
			}

			this.$emit('change', [...this.ids]);
		},
		handleChange(id: number) {
			if (this.ids.includes(id)) {
				this.ids = this.ids.filter(testId => id !== testId);
			} else {
				this.ids.push(id);
			}

			this.isAll = this.ids.length === 0;

			this.$emit('change', [...this.ids]);
		},
	},
});
</script>
