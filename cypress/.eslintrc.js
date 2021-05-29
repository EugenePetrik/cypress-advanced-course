module.exports = {
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress', 'chai-friendly'],
  extends: ['plugin:cypress/recommended'],
  rules: {
    'no-unused-vars': 1,
    'no-unused-expressions': 0,
    'babel/no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    'cypress/no-unnecessary-waiting': 1,
  },
};
