import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    'upath',
    'vuetify',
    'vuetify/directives',
    'vuetify/components',
    'vuetify/labs/components',
  ],
  declaration: 'node16',
  clean: true,
})
