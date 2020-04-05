<template>
	<div class="app container">
		<nav class="app-nav">
			<div class="app-nav__start">
				<button class="app-nav__burger">
					<span />
					<span />
					<span />
				</button>
			</div>
			<div class="app-nav__middle">
				testy
			</div>
			<div class="app-nav__end">
				test
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
      padding:0 $navbar-padding-horizontal;

      &__burger {
        $burger-size:50px;
        border:0;
        @include hamburger($burger-size);
        padding:$button-padding-vertical;
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
