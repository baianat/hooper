module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'vue/max-attributes-per-line': 'off'
  }
};
