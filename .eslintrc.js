module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['prettier', 'vue'],
  extends: ['plugin:prettier/recommended', 'plugin:vue/essential'],
  rules: {
    'prettier/prettier': 'error'
  }
};
