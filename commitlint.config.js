module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        // Define scopes here
      ],
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-full-stop': [2, 'never', '.'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 72],
  },
};
