// @see: https://stylelint.io

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order'
  ],
  overrides: [
    {
      files: ['**/*.{scss,css}'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html'
    }
  ],
  // 自定义规则
  rules: {
    'selector-class-pattern': null,
    'no-empty-source': null,
    'rule-empty-line-before': 'never'
  }
};
