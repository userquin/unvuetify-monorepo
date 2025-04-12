import { defineBuildConfig } from 'unbuild'
import { alias } from '../../alias'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    'pathe',
    'upath',
    'vite',
    'vuetify',
    'vuetify/directives',
    'vuetify/components',
    'vuetify/labs/components',
  ],
  declaration: 'node16',
  clean: true,
  alias: alias.shared,
})
