
export default {
	mode: 'spa',
	/*
  ** Headers of the page
  */
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
	},
	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#23d7b4' },
	/*
  ** Global CSS
  */
	css: [
		'./global-styles/global-bundle.scss',
	],
	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
	],
	/*
  ** Nuxt.js dev-modules
  */
	buildModules: [
		'@nuxt/typescript-build',
		'@nuxtjs/eslint-module',
		'@nuxtjs/style-resources',
		'@nuxtjs/apollo',
	],
	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://buefy.github.io/#/documentation
		'nuxt-buefy',
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		// Doc: https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
	],
	/*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
	axios: {
	},
	/*
  ** Build configuration
  */
	build: {
		postcss: {
			plugins: {
				'postcss-cssnext': {
					features: {
						customProperties: false,
					},
				},
			},
		},
	},
	styleResources: {
		scss: [
			'./global-styles/global-includes.scss',
		],
	},
	apollo: {
		clientConfigs: {
			default: {
				// required
				httpEndpoint: 'https://creative-support-hasura.herokuapp.com/v1/graphql',
			},
		},
	},
	buefy: {
		defaultToastDuration: 4000,
		defaultToastPosition: 'is-bottom-right',
	},
};
