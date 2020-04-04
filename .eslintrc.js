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
  }
}
