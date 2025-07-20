import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  // ESLintの推奨設定
  js.configs.recommended,

  // Expo/React設定
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        __DEV__: "readonly",
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // TypeScript設定
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // TypeScript ESLintの推奨ルール
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs["recommended-type-checked"].rules,
      ...tsPlugin.configs["stylistic-type-checked"].rules,
      // カスタムルール
      // @see https://typescript-eslint.io/rules/array-type
      "@typescript-eslint/array-type": "off",

      // @see https://typescript-eslint.io/rules/consistent-type-definitions/
      "@typescript-eslint/consistent-type-definitions": "off",

      // @see https://typescript-eslint.io/rules/consistent-type-imports/
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      // @see https://typescript-eslint.io/rules/no-unused-vars/
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // @see https://typescript-eslint.io/rules/require-await/
      "@typescript-eslint/require-await": "off",

      // @see https://typescript-eslint.io/rules/no-misused-promises/
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      // https://typescript-eslint.io/rules/no-var-requires/
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  // 無視するファイル
  {
    ignores: [
      "babel.config.js",
      // 必要に応じて他のファイルも追加
      // 'metro.config.js',
    ],
  },
];
