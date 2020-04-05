<template>
	<section class="profiles page">
		<div class="page__header ">
			<h1 class="title">
				<span>Help Metro Atlanta’s</span> <span>creative workers.</span>
			</h1>
		</div>
		<div class="page__body content">
			<worker-card />
			<p>While social distancing at home, is art helping you cope? Are you watching a TV show episode, putting on a movie, listening to songs, admiring that unique piece of artwork or photograph that you bought? And, how much is art a part of what you are missing right now? Do you miss being out and around town, enjoying the expressive murals and public art, making plans to enjoy a show, live music, film, art event, or performances?</p>

			<p>Consider that these experiences were made by someone that works in a creative field. Artists, videographers, photographers, musicians, dancers, designers, and others — right now, these family, friends, and neighbors in metro-Atlanta’s creative industries are severely impacted by social distancing and quarantine. Events have been canceled, productions are suspended, clients are backing out. Many are contract and freelance workers who rely on the flexibility of gig and service industry work to enable their creative careers.</p>

			<p>With these industries on hold, many have seen their incomes crater. As we enjoy the fruits of their labor, consider sending a little support through Patreon, Venmo or Cash App.  It’s tough on everyone, and every little bit helps. (Plus, it will feel great to help someone out.) Start now!</p>
		</div>
	</section>
</template>

<style lang="scss">
</style>

<script lang="ts">
import Vue from 'vue';
import WorkerCard from '@/components/WorkerCard.vue';

export default Vue.extend({
	name: 'HomePage',
	components: {
		WorkerCard,
	},
});
</script>
