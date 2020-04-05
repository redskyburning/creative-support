<template>
	<div class="app container">
		<nav class="navbar app-nav">
			<div class="app-nav__start">
				<b-navbar-item
					class="app-nav__item-menu"
					@click="handleToggle"
				>
					<div
						class="app-nav__menu"
						:class="{ 'is-active' : toggleActive }"
					>
						<span />
						<span />
						<span />
					</div>
				</b-navbar-item>
				<b-navbar-item
					class="app-nav__support"
					tag="nuxt-link"
					to="/register"
				>
					Register for Support
				</b-navbar-item>
			</div>
			<div class="app-nav__middle">
				<nuxt-link to="/">
					Creative Support
				</nuxt-link>
			</div>
			<div class="app-nav__end">
				<b-navbar-item
					class="app-nav__faq"
					tag="nuxt-link"
					to="/faq"
				>
					How it works / Faq
				</b-navbar-item>
				<b-navbar-item
					class="app-nav__home"
					href="/"
				>
					<b-icon icon="home" />
				</b-navbar-item>
			</div>
		</nav>

		<div class="app__body">
			<nuxt />
		</div>

		<mobile-drawer
			class="app__drawer"
			:class="{ 'is-active' : toggleActive }"
		/>
	</div>
</template>

<style lang="scss">
  .app {
    &-nav {
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &__support,
      &__faq, {
        @include until($desktop) {
          display:none;
        }
      }

      &__menu {
        @include hamburger(28px);

				/*span {
					height:3px;
					width:25px;

					&:nth-child(1) {
						top: calc(50% - 9px)
					}

					&:nth-child(2) {
						top: calc(50% - 1px)
					}

					&:nth-child(3) {
						top: calc(50% + 7px)
					}
				}*/
      }

      &__home,
      &__menu {
        @include from($desktop) {
          display:none;
        }
      }

      &__middle {
        color:$red;
        font-size:$size-4;
        font-weight:$weight-bold;
				line-height:1em;

				a {
					@include link-inherit-color;
				}
      }
    }

		&__drawer {
			background:$white-bis;
			position:fixed;
			top:$navbar-height;
			bottom:0;
			left:-120%;
			width:100%;
			z-index: $navbar-fixed-z;
			transition:left ease-in-out .25s;

			&.is-active {
				left:0;
			}
		}
  }
</style>

<script lang="ts">
import Vue from 'vue';

import MobileDrawer from '@/components/MobileDrawer.vue';

export default Vue.extend({
	components: {
		MobileDrawer,
	},
	data() {
		return {
			toggleActive: true,
			items: [
				{
					title: 'Home',
					icon: 'home',
					to: { name: 'index' },
				},
				{
					title: 'Inspire',
					icon: 'lightbulb',
					to: { name: 'inspire' },
				},
			],
		};
	},
	methods: {
		handleToggle() {
			this.toggleActive = !this.toggleActive;
		},
	},
});
</script>
