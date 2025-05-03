import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/runtime/index',
  ],
  externals: [
    '@nuxt/schema',
    '@nuxtjs/i18n',
    '@vue/runtime-dom',
    '@vue/runtime-core',
    '@vue/shared',
    '@vue/reactivity',
    '#imports',
    'defu',
    'vue',
    'vuetify',
    'vue-i18n',
  ],
  declaration: 'node16',
  clean: true,
})
