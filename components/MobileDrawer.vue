<template>
	<div class="mobile-drawer section">
		<b-menu class="is-large">
			<b-menu-list>
				<b-menu-item
					tag="nuxt-link"
					label="Register for Support"
					to="/register"
				/>
				<b-menu-item
					tag="nuxt-link"
					label="About Creative Support"
					to="/about"
				/>
				<b-menu-item
					tag="nuxt-link"
					label="FAQs"
					to="/faq"
				/>
			</b-menu-list>
		</b-menu>
	</div>
</template>

<style lang="scss">
	.mobile-drawer {
		.menu-list {
			> li a {
				padding:1.25rem 0;
			}

			> li ~ li {
				border-top:2px solid $grey;
			}
		}
	}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'MobileDrawer',
});
</script>
