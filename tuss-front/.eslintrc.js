export default {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  rules: {
    "function-paren-newline": "off",
    "prettier/prettier": 'off',
    'no-console': 'warn',
    'vue/no-v-html': 'off',
    'space-before-function-paren': 'warn',
    'import/no-named-as-default': 'off',
    'no-constant-condition': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3
      },
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    'vue/component-tags-order': [
      'warn', {
        order: ['style', 'template', 'script'],
      },
    ],
  },
}
