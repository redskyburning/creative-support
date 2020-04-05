<template>
	<div class="app container">
		<nav class="navbar app-nav">
			<div class="app-nav__start">
        <b-navbar-item
          class="app-nav__menu"
          href="#"
        >
          <span />
          <span />
          <span />
        </b-navbar-item>
        <b-navbar-item
          class="app-nav__support"
          href="#"
        >
          Register for Support
        </b-navbar-item>
			</div>
			<div class="app-nav__middle">
				Creative Support
			</div>
			<div class="app-nav__end">
				<b-navbar-item
          class="app-nav__faq"
					href="#"
				>
					How it works / Faq
				</b-navbar-item>
				<b-navbar-item
          class="app-nav__home"
					href="#"
				>
          <b-icon icon="home" />
				</b-navbar-item>
			</div>
		</nav>

		<div class="app__body">
			<nuxt />
		</div>
	</div>
</template>

<style lang="scss">
  .app {
    &-nav {
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &__burger {
        $burger-size:50px;
        border:0;
        @include hamburger($burger-size);
        padding:$button-padding-vertical;
      }

      &__support,
      &__faq, {
        @include until($desktop) {
          display:none;
        }
      }

      &__menu {
        @include hamburger(50px);
      }

      &__home,
      &__menu {
        @include from($desktop) {
          display:none;
        }
      }

      &__middle {
        color:$red;
        font-size:$size-3;
        font-weight:$weight-bold;
      }
    }
  }
</style>

<script>
export default {
	data() {
		return {
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
};
</script>
