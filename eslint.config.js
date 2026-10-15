// Single flat config for the whole monorepo. ESLint resolves it from each linted file,
// so every package can simply run `eslint .`.
import js from '@eslint/js';
import angular from 'angular-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import svelte from 'eslint-plugin-svelte';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['**/dist', '**/build', '**/coverage', '**/.angular', '**/.svelte-kit', '**/.turbo']),

  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Angular
  {
    files: ['apps/angular/**/*.ts'],
    extends: [angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'ft', style: 'kebab-case' }],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'ft', style: 'camelCase' },
      ],
    },
  },
  {
    files: ['apps/angular/**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    // Every app autofocuses the Key field of the feature form on purpose
    rules: { '@angular-eslint/template/no-autofocus': 'off' },
  },

  // React
  {
    files: ['apps/react/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },

  // Vue
  {
    files: ['apps/vue/**/*.{ts,vue}'],
    extends: [vue.configs['flat/recommended']],
    languageOptions: { parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.vue'] } },
    // Component names (Feature, Features, …) are kept identical across all the framework apps
    rules: { 'vue/multi-word-component-names': 'off' },
  },

  // Svelte
  {
    files: ['apps/svelte/**/*.{ts,svelte}'],
    extends: [svelte.configs.recommended],
    languageOptions: { parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.svelte'] } },
  },

  // Formatting is Prettier's job: turn off the stylistic rules that would conflict with it
  prettier,
);
