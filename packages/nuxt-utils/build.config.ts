import { defineBuildConfig } from 'unbuild'
import { alias } from '../../alias'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    '@nuxt/schema',
    '@unvuetify/shared',
    '@unvuetify/unimport-presets',
    '@unvuetify/vite-styles-plugin',
    'defu',
    'pathe',
    'unimport',
    'upath',
    'vite',
    'vuetify',
    'vuetify/directives',
    'vuetify/components',
    'vuetify/labs/components',
  ],
  declaration: 'node16',
  clean: true,
  alias: {
    ...alias.shared,
    ...alias.styles,
    ...alias.presets,
  },
})
