import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintReact from "@eslint-react/eslint-plugin"

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended, 
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"]
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
      // Enable project service for better TypeScript integration
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "@eslint-react/no-missing-key": "warn",
    },
  },
)
