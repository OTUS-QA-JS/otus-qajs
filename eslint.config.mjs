import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jest from 'eslint-plugin-jest'

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ['reports']
  },
  {
    files: ['scripts/**/*.zx.js'],
    globals: {
      $: true,
      fs: true
    }
  },
  // DOC: https://www.npmjs.com/package/eslint-plugin-jest
  {
    files: ['test/**', 'setup-jest.js'],
    ...jest.configs['flat/recommended']
  }
]
