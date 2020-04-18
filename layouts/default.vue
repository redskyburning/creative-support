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
					v-if="$store.state.profileInitialized && !$store.state.profile"
					class="app-nav__support"
					tag="nuxt-link"
					to="/register"
				>
					Register for Support
				</b-navbar-item>
				<b-navbar-item
					v-if="$store.state.profileInitialized && $store.state.profile"
					class="app-nav__profile"
					tag="nuxt-link"
					to="/profile"
				>
					Your Profile
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
					v-if="!$store.state.user"
					class="app-nav__login"
					tag="div"
					@click="handleLogin"
				>
					Login
				</b-navbar-item>
				<user-dropdown
					class="app-nav__user-dropdown"
					v-if="$store.state.user"
					:user="$store.state.user"
				/>
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

		<mobile-drawer
			class="app__drawer"
			:class="{ 'is-active' : toggleActive}"
		/>
	</div>
</template>

<style lang="scss" src="./default.scss" />
<script lang="ts" src="./default.ts" />
