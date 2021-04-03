module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module"
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-unused-vars": ["error"],
    "no-undef": "error"
  }
}