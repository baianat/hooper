module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint --edit -E HUSKY_GIT_PARAMS'
  }
};
