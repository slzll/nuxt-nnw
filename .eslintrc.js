module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/attributes-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'prefer-const': 'off',
    'object-shorthand': 'off',
    'eqeqeq': 'off',
    'arrow-parens': 'off',
    'no-console': 'off',
    'no-var': 'off',
    'curly': 'off',
    'indent': 'off',
    'unicorn/no-array-instanceof': 'off',
    'import/no-named-as-default-member': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/name-property-casing': 'off',
    'nuxt/no-globals-in-created': 'off',
    'vue/require-default-prop': 'off',
    'import/no-named-default': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-use-v-if-with-v-for': 'off'
  }
}
