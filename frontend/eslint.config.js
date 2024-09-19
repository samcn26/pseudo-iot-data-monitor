import js from '@eslint/js'
import globals from 'globals'

// 导入 React 相关的 ESLint 插件
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

// 导入 TypeScript 相关的 ESLint 插件和解析器
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'

// 导入 Prettier 相关的 ESLint 插件和配置
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    ignores: ['node_modules'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // JavaScript 推荐规则
      ...js.configs.recommended.rules,

      // TypeScript 推荐规则
      ...tsPlugin.configs.recommended.rules, // 启用 TypeScript 推荐规则

      // React 推荐规则
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // 禁用 'react/react-in-jsx-scope' 规则，因为在新版 React 中不再需要显式导入 React
      'react/react-in-jsx-scope': 'off',

      // 添加一些常用的 TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 any 类型
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ], // 禁止未使用的变量，但允许以下划线开头的参数
    },
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
  },
  ...tseslint.configs.recommended,
  // 禁用与 Prettier 冲突的规则
  prettierConfig,
]
