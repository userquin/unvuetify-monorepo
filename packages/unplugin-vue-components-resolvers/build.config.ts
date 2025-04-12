import { defineBuildConfig } from 'unbuild'
import { alias } from '../../alias'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    'vuetify',
    'vuetify/directives',
    'vuetify/components',
    'vuetify/labs/components',
    'unplugin-vue-components/types',
  ],
  declaration: 'node16',
  clean: true,
  alias: alias.shared,
})
