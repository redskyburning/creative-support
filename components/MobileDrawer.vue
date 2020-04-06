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
				<b-menu-item
					tag="nuxt-link"
					label="Privacy Policy"
					to="/privacy"
				/>
			</b-menu-list>
		</b-menu>
		<div class="content mobile-drawer__disclaimer">
			<p>Workers have not been individually vetted by Creative Stimulus. We do not handle transactions and only provide links to the respective services that can process your support payments to creative workers.</p>
			<p>All data is managed by our local volunteers team. To report a problem, please email us admin@websiteurl.com. You can also tweet us with any questions at @creativestimulus.</p>
		</div>
		<div class="mobile-drawer__made">
			<made-with />
		</div>
	</div>
</template>

<style lang="scss">
	.mobile-drawer {
		display:flex;
		flex-direction: column;
		align-items: stretch;

		&__disclaimer {
			flex:1 0 auto;
		}

		> * + * {
			margin-top:2rem;
		}

		.menu-list {
			> li {
				border-bottom:2px solid $grey;

				a {
					padding:1.25rem 0;
				}
			}
		}

		&__made {
			display: flex;
			justify-content: center;

			.made-with {
				font-size:$size-4;
			}
		}
	}
</style>

<script lang="ts">
import Vue from 'vue';
import MadeWith from '~/components/MadeWith.vue';

export default Vue.extend({
	name: 'MobileDrawer',
	components: {
		MadeWith,
	},
});
</script>
