import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    '@nuxt/schema',
    '@nuxtjs/i18n',
    '@vue/runtime-dom',
    '@vue/runtime-core',
    '@vue/shared',
    '@vue/reactivity',
    '#imports',
    'vue',
    'vuetify',
    'vue-i18n',
  ],
  declaration: 'node16',
  clean: true,
})
