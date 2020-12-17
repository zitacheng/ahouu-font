module.exports = {
  extends: [
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
};
