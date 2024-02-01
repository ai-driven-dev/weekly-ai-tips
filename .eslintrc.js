module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react-hooks/recommended",
    'plugin:react/recommended',
    'next',
    'next/core-web-vitals',
  ],
  "rules": {
    "@typescript-eslint/quotes": ["error", "single", { "avoidEscape": true }],
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "@typescript-eslint/semi": ["error", "never"],
    "@typescript-eslint/space-before-function-paren": ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "none",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "semi",
        "requireLast": false
      }
    }]
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
}
