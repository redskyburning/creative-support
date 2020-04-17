<template>
	<section class="profiles page">
		<div class="page__header ">
			<h1 class="title">
				<span>Help Metro Atlanta’s</span> <span>creative workers.</span>
			</h1>
		</div>
		<div class="page__body profiles__body">
			<div class="profiles__main">
				<mega-shuffle
					class="profiles__mega-shuffle"
					@shuffle="handleShuffle"
				/>
				<mobile-card-controls
					class="profiles__mobile-ui"
					:filter-active="filtersActive"
					@filter="handleFilterToggle"
					@shuffle="handleShuffle"
				/>
				<client-only>
					<worker-card
						v-if="$store.getters.activeWorker"
						class="profiles__worker-card"
						:worker="$store.getters.activeWorker"
					/>
				</client-only>
			</div>
			<div class="profiles__extras">
				<worker-filter
					class="profiles__filters"
					@change="handleFilterChange"
				/>
			</div>
		</div>
	</section>
</template>

<style lang="scss" src="./index.scss"/>
<script lang="ts" src="./index.ts" />
