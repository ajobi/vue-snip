module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
  ],
}
