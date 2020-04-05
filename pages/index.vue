<template>
	<section class="section">
		<div class="page__header">
			<h1 class="title">
        <span>Help Metro Atlanta’s</span> <span>creative workers.</span>
			</h1>
		</div>
	</section>
</template>

<style lang="scss">
  .title {
    span {
      $bleed:1.5rem;
      display:inline-block;
      white-space: nowrap;
      //background-color:$yellow;
      background-image: linear-gradient(left, $yellow);
      background-size:95% 25%;
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: 65%;
      margin:$bleed * -1;
      padding:$bleed;
    }
  }
</style>

<script>

export default {
	name: 'HomePage',
};
</script>
