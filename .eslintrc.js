module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    '@redskyburning/eslint-config-vue-ts',
  ],
  // add your custom rules here
  rules: {
		'no-trailing-spaces'               : 'warn',
		'camelcase'               : 'off',
		'no-unused-vars'                   : 'warn',
		'@typescript-eslint/no-unused-vars'                   : 'warn',
  }
}
