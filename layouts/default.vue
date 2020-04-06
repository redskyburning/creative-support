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
			<div class="app-nav__app-name">
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

		<nav class="navbar app-nav app__footer">
			<b-navbar-item
				tag="nuxt-link"
				to="/privacy"
			>
				Privacy Policy
			</b-navbar-item>
			<b-navbar-item
				tag="nuxt-link"
				to="/about"
			>
				About Us
			</b-navbar-item>
			<b-navbar-item
				class="app-nav__made"
			>
				<made-with />
			</b-navbar-item>
			<b-navbar-item>
				Tweet Us
			</b-navbar-item>
			<b-navbar-item>
				Live Analytics
			</b-navbar-item>
		</nav>

		<transition name="app__drawer">
			<mobile-drawer
				v-if="toggleActive"
				class="app__drawer"
			/>
		</transition>
	</div>
</template>

<style lang="scss">
  .app {
    &-nav {
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &__menu {
				$dimensions:28px;
				$bar-height:3px;
				cursor: pointer;
				display: block;
				height: $dimensions;
				position: relative;
				width: $dimensions;

				span {
					background-color: currentColor;
					display: block;
					height: 3px;
					left: 0;
					position: absolute;
					transform-origin:left center;
					transition-duration: $speed;
					transition-property: background-color, opacity, transform;
					transition-timing-function: $easing;
					width: $dimensions;

					&:nth-child(1) {
						top: 0;
					}

					&:nth-child(2) {
						top: calc(50% - #{$bar-height});
					}

					&:nth-child(3) {
						bottom:calc(0% + #{$bar-height});
					}
				}
				&:hover {
					background-color: rgba(black, 0.05)
				}
					// Modifers
				&.is-active {
					$offset:2px;

					span {
						&:nth-child(1) {
							transform: translateY($offset * .5) rotate(45deg)
						}

						&:nth-child(2) {
							opacity: 0;
						}

						&:nth-child(3) {
							transform: translateY($offset * -.5) rotate(-45deg)
						}
					}
				}
      }

      &__app-name {
				font-family: $family-serif;
        color:$red;
        font-size:$size-4;
        font-weight:$weight-bold;
				line-height:1em;

				a {
					@include link-inherit-color;
				}
      }

			&__made {
			}
    }

		&__drawer {
			$duration:.25s;
			background:$white;
			position:fixed;
			top:$navbar-height;
			bottom:0;
			left:0;
			width:100%;
			z-index: $navbar-fixed-z;
			transition:left ease-in-out $duration;

			&-leave-to,
			&-enter {
				left:-120%;
			}
		}

		&__footer {
			margin-bottom: $section-padding-vertical;
		}

		@include until($desktop) {
			&-nav {
				&__support,
				&__faq, {
					display:none;
				}
			}

			&__footer {
				display: none;
			}
		}

		@include from($desktop) {
			&-nav {
				&__item-menu,
				&__home {
					display:none;
				}
			}
		}
  }
</style>

<script lang="ts">
import Vue from 'vue';

import MobileDrawer from '@/components/MobileDrawer.vue';
import MadeWith from '~/components/MadeWith.vue';

export default Vue.extend({
	components: {
		MobileDrawer,
		MadeWith,
	},
	data() {
		return {
			toggleActive: false,
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
	watch: {
		$route() {
			this.toggleActive = false;
		},
	},
	methods: {
		handleToggle() {
			this.toggleActive = !this.toggleActive;
		},
	},
});
</script>
