<template>
	<b-navbar-dropdown
		class="user-dropdown"
		arrowless
		right
	>
		<template slot="label">
			<figure class="user-dropdown__profile-image image is-square">
				<img
					class="is-rounded"
					:src="user.photoURL"
				>
			</figure>
		</template>
		<div
			class="navbar-item user-dropdown__greeting"
		>
			<div>
				<small>Hello,</small><br>
				<span class="user-dropdown__name">{{ user.displayName }}</span>
			</div>
		</div>
		<hr class="dropdown-divider">
		<b-navbar-item>
			Profile
		</b-navbar-item>
		<b-navbar-item>
			Logout
		</b-navbar-item>
	</b-navbar-dropdown>
</template>

<style lang="scss">
.user-dropdown {
	&__profile-image {
		width:40px;

		img {
			&.is-rounded {
				max-height:initial;
			}
		}
	}

	&__greeting {
		&.navbar-item {
			white-space: normal;
		}
	}

	&__name {
		color:$magenta;
	}

	.navbar-dropdown {
		min-width:180px;
	}
}
</style>

<script src="./user-dropdown.ts" lang="ts"/>
