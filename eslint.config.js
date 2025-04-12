import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    regexp: {
      overrides: {
        'regexp/no-empty-capturing-group': 'off',
        'regexp/no-empty-group': 'off',
      },
    },
  },
  {
    ignores: [
      '**/fixtures/**',
    ],
  },
  {
    files: [
      '*.d.ts',
    ],
    rules: {
      'unused-imports/no-unused-vars': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
)
